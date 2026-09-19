import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { verifyAccessToken } from "@/lib/jwt";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      product: {
        id: product._id.toString(),
        _id: product._id.toString(),
        title: product.title,
        category: product.category,
        categorySlug: product.categorySlug,
        price: product.price,
        shortDescription: product.shortDescription,
        description: product.description || product.shortDescription,
        image: product.image,
        images: product.images || [product.image],
        isBestSeller: product.isBestSeller,
        customizable: product.customizable,
        occasion: product.occasion || [],
        likesCount: product.likesCount || 0,
        createdAt: product.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Get product error:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await req.json();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (body.title !== undefined) product.title = body.title;
    if (body.category !== undefined) {
      product.category = body.category;
      product.categorySlug = (body.categorySlug || body.category).toLowerCase().replace(/\s+/g, "-");
    }
    if (body.price !== undefined) product.price = Number(body.price);
    if (body.shortDescription !== undefined) product.shortDescription = body.shortDescription;
    if (body.description !== undefined) product.description = body.description;
    if (body.image !== undefined) product.image = body.image;
    if (body.images !== undefined) product.images = body.images;
    if (body.isBestSeller !== undefined) product.isBestSeller = Boolean(body.isBestSeller);
    if (body.customizable !== undefined) product.customizable = Boolean(body.customizable);
    if (body.occasion !== undefined) product.occasion = Array.isArray(body.occasion) ? body.occasion : [];

    await product.save();

    return NextResponse.json({
      message: "Product updated successfully",
      product: {
        id: product._id.toString(),
        _id: product._id.toString(),
        title: product.title,
        category: product.category,
        categorySlug: product.categorySlug,
        price: product.price,
        shortDescription: product.shortDescription,
        description: product.description,
        image: product.image,
        images: product.images,
        isBestSeller: product.isBestSeller,
        customizable: product.customizable,
        occasion: product.occasion,
        likesCount: product.likesCount,
        createdAt: product.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json({ message: error.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (product.image && product.image.includes("res.cloudinary.com")) {
      try {
        const parts = product.image.split("/");
        const filename = parts[parts.length - 1];
        const publicId = filename.split(".")[0];
        const folder = parts[parts.length - 2];
        const fullPublicId = `${folder}/${publicId}`;
        await cloudinary.uploader.destroy(fullPublicId);
      } catch (err) {
        console.warn("Could not delete image from Cloudinary:", err);
      }
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Delete product error:", error);
    return NextResponse.json({ message: error.message || "Failed to delete product" }, { status: 500 });
  }
}
