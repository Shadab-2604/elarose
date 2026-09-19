import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { verifyAccessToken } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Product.distinct("category");
    
    // Count products per category
    const categoriesWithCount = await Promise.all(
      categories.map(async (catName) => {
        const count = await Product.countDocuments({ category: catName });
        return {
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, "-"),
          count,
        };
      })
    );

    return NextResponse.json({ categories: categoriesWithCount });
  } catch (error: any) {
    console.error("Get categories error:", error);
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
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

    const { oldCategory, newCategory } = await req.json();

    if (!oldCategory || !newCategory) {
      return NextResponse.json({ message: "Old and new category names are required" }, { status: 400 });
    }

    const newSlug = newCategory.toLowerCase().replace(/\s+/g, "-");

    const result = await Product.updateMany(
      { category: oldCategory },
      { $set: { category: newCategory, categorySlug: newSlug } }
    );

    return NextResponse.json({
      message: `Updated category "${oldCategory}" to "${newCategory}" for ${result.modifiedCount} products`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    console.error("Update category error:", error);
    return NextResponse.json({ message: error.message || "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
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

    const { categoryName } = await req.json();

    if (!categoryName) {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 });
    }

    const result = await Product.deleteMany({ category: categoryName });

    return NextResponse.json({
      message: `Deleted category "${categoryName}" and ${result.deletedCount} associated products`,
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error("Delete category error:", error);
    return NextResponse.json({ message: error.message || "Failed to delete category" }, { status: 500 });
  }
}
