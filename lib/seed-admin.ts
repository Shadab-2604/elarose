import { connectToDatabase } from "./db";
import User from "@/models/User";
import Product from "@/models/Product";
import bcrypt from "bcryptjs";
import productsData from "@/json/products.json";

export async function seedAdminAndInitialData() {
  try {
    await connectToDatabase();

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@1234.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin@1234";

    // Check or create admin
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: "ELAROSE Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`[Seed] Created admin account: ${adminEmail}`);
    } else {
      // Ensure password and role are up to date if specified in .env
      const matches = await bcrypt.compare(adminPassword, existingAdmin.password || "");
      if (!matches || existingAdmin.role !== "admin") {
        existingAdmin.password = await bcrypt.hash(adminPassword, 10);
        existingAdmin.role = "admin";
        await existingAdmin.save();
        console.log(`[Seed] Updated admin account password/role: ${adminEmail}`);
      }
    }

    // Check products count, if empty seed from json/products.json
    const productCount = await Product.countDocuments();
    if (productCount === 0 && Array.isArray(productsData) && productsData.length > 0) {
      const formattedProducts = productsData.map((p) => ({
        title: p.title,
        category: p.category,
        categorySlug: p.categorySlug || p.category.toLowerCase().replace(/\s+/g, "-"),
        price: p.price,
        shortDescription: p.shortDescription,
        description: p.description || p.shortDescription,
        image: p.image,
        isBestSeller: p.isBestSeller || false,
        customizable: p.customizable !== undefined ? p.customizable : true,
        occasion: p.occasion || [],
        likesCount: 0,
      }));

      await Product.insertMany(formattedProducts);
      console.log(`[Seed] Seeded ${formattedProducts.length} initial products from JSON.`);
    }
  } catch (error) {
    console.error("[Seed Error]", error);
  }
}
