import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import { verifyAccessToken } from "@/lib/jwt";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;
    const authHeader = req.headers.get("authorization");

    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    const payload = token ? verifyAccessToken(token) : null;
    if (!payload) {
      return NextResponse.json({ message: "Authentication required to like products" }, { status: 401 });
    }

    const user = await User.findById(payload.userId);
    const product = await Product.findById(id);

    if (!user || !product) {
      return NextResponse.json({ message: "User or Product not found" }, { status: 404 });
    }

    const productIdObj = new mongoose.Types.ObjectId(id);
    const isLiked = user.likes.some((likeId) => likeId.toString() === id);

    if (isLiked) {
      // Unlike
      user.likes = user.likes.filter((likeId) => likeId.toString() !== id);
      product.likesCount = Math.max(0, (product.likesCount || 0) - 1);
    } else {
      // Like
      user.likes.push(productIdObj);
      product.likesCount = (product.likesCount || 0) + 1;
    }

    await user.save();
    await product.save();

    return NextResponse.json({
      liked: !isLiked,
      likesCount: product.likesCount,
      userLikes: user.likes.map((likeId) => likeId.toString()),
    });
  } catch (error: any) {
    console.error("Toggle like error:", error);
    return NextResponse.json({ message: error.message || "Failed to toggle like" }, { status: 500 });
  }
}
