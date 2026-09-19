import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
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

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageUrl = await uploadImageToCloudinary(buffer, "elarose-products");

    return NextResponse.json({ url: imageUrl });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ message: error.message || "Failed to upload image" }, { status: 500 });
  }
}
