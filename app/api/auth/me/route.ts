import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "@/lib/jwt";
import { seedAdminAndInitialData } from "@/lib/seed-admin";

export async function GET(req: Request) {
  try {
    await seedAdminAndInitialData();
    await connectToDatabase();

    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;
    const authHeader = req.headers.get("authorization");

    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    let payload = token ? verifyAccessToken(token) : null;

    if (!payload) {
      const refreshToken = cookieStore.get("refreshToken")?.value;
      if (refreshToken) {
        payload = verifyRefreshToken(refreshToken);
      }
    }

    if (!payload) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const newAccessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        likes: (user.likes || []).map((id) => id.toString()),
      },
      token: newAccessToken,
    });

    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
