import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { seedAdminAndInitialData } from "@/lib/seed-admin";

export async function POST(req: Request) {
  try {
    await seedAdminAndInitialData();
    await connectToDatabase();

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Prevent creating admin account via register API
    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@1234.com").toLowerCase().trim();
    if (normalizedEmail === envAdminEmail) {
      return NextResponse.json(
        { message: "Admin accounts cannot be registered via Sign Up. Please Sign In using admin credentials." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Role is strictly hardcoded to "user" for all registrations
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
      likes: [],
    });

    const payload = {
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const response = NextResponse.json({
      message: "Registration successful",
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        likes: newUser.likes.map((id) => id.toString()),
      },
      token: accessToken,
    });

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 mins
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: error.message || "Registration failed" }, { status: 500 });
  }
}
