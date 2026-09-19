import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { verifyAccessToken } from "@/lib/jwt";
import { seedAdminAndInitialData } from "@/lib/seed-admin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await seedAdminAndInitialData();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = {};
    if (category && category !== "all") {
      query.categorySlug = category.toLowerCase();
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    const formattedProducts = products.map((p) => ({
      id: p._id.toString(),
      _id: p._id.toString(),
      title: p.title,
      category: p.category,
      categorySlug: p.categorySlug,
      price: p.price,
      shortDescription: p.shortDescription,
      description: p.description || p.shortDescription,
      image: p.image,
      images: p.images || [p.image],
      isBestSeller: p.isBestSeller,
      customizable: p.customizable,
      occasion: p.occasion || [],
      likesCount: p.likesCount || 0,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error: any) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

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
    const {
      title,
      category,
      categorySlug,
      price,
      shortDescription,
      description,
      image,
      images,
      isBestSeller,
      customizable,
      occasion,
    } = body;

    if (!title || !category || !price || !shortDescription || !image) {
      return NextResponse.json(
        { message: "Title, category, price, short description, and image are required" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      title: title.trim(),
      category: category.trim(),
      categorySlug: (categorySlug || category).toLowerCase().replace(/\s+/g, "-"),
      price: Number(price),
      shortDescription: shortDescription.trim(),
      description: description ? description.trim() : shortDescription.trim(),
      image,
      images: Array.isArray(images) && images.length > 0 ? images : [image],
      isBestSeller: Boolean(isBestSeller),
      customizable: customizable !== undefined ? Boolean(customizable) : true,
      occasion: Array.isArray(occasion) ? occasion : [],
      likesCount: 0,
    });

    return NextResponse.json({
      message: "Product created successfully",
      product: {
        id: newProduct._id.toString(),
        _id: newProduct._id.toString(),
        title: newProduct.title,
        category: newProduct.category,
        categorySlug: newProduct.categorySlug,
        price: newProduct.price,
        shortDescription: newProduct.shortDescription,
        description: newProduct.description,
        image: newProduct.image,
        images: newProduct.images,
        isBestSeller: newProduct.isBestSeller,
        customizable: newProduct.customizable,
        occasion: newProduct.occasion,
        likesCount: newProduct.likesCount,
        createdAt: newProduct.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json({ message: error.message || "Failed to create product" }, { status: 500 });
  }
}
