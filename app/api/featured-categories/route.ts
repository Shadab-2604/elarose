import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import FeaturedCategory from "@/models/FeaturedCategory";
import { verifyAccessToken } from "@/lib/jwt";
import categoriesData from "@/json/categories.json";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    let categories = await FeaturedCategory.find().sort({ order: 1 });

    if (!categories || categories.length === 0) {
      // Seed default initial categories from json/categories.json
      const initialDocs = categoriesData.map((cat, index) => ({
        id: cat.id,
        title: cat.title,
        shortTitle: cat.shortTitle,
        description: cat.description,
        image: cat.image,
        href: cat.href,
        order: index,
      }));

      categories = await FeaturedCategory.insertMany(initialDocs);
    }

    const formattedCategories = categories.map((cat) => ({
      id: cat.id,
      _id: cat._id ? cat._id.toString() : cat.id,
      title: cat.title,
      shortTitle: cat.shortTitle,
      description: cat.description,
      image: cat.image,
      href: cat.href,
      order: cat.order,
    }));

    return NextResponse.json({ categories: formattedCategories });
  } catch (error: any) {
    console.error("Fetch featured categories error:", error);
    return NextResponse.json({ categories: categoriesData });
  }
}

export async function PUT(req: Request) {
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
    const { categories } = body;

    if (!Array.isArray(categories)) {
      return NextResponse.json({ message: "Categories array is required" }, { status: 400 });
    }

    const updatedCategories = [];

    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      const catId = cat.id || `cat-${Date.now()}-${i}`;

      const updateFields = {
        id: catId,
        title: (cat.title || "").trim(),
        shortTitle: (cat.shortTitle || cat.title || "").trim(),
        description: (cat.description || "").trim(),
        image: (cat.image || "").trim(),
        href: (cat.href || "/products").trim(),
        order: cat.order !== undefined ? Number(cat.order) : i,
      };

      const doc = await FeaturedCategory.findOneAndUpdate(
        { id: catId },
        updateFields,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      updatedCategories.push({
        id: doc.id,
        _id: doc._id.toString(),
        title: doc.title,
        shortTitle: doc.shortTitle,
        description: doc.description,
        image: doc.image,
        href: doc.href,
        order: doc.order,
      });
    }

    return NextResponse.json({
      message: "Featured categories updated successfully!",
      categories: updatedCategories,
    });
  } catch (error: any) {
    console.error("Update featured categories error:", error);
    return NextResponse.json({ message: error.message || "Failed to update featured categories" }, { status: 500 });
  }
}
