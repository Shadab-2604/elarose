import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import HeroSettings from "@/models/HeroSettings";
import { verifyAccessToken } from "@/lib/jwt";
import homeData from "@/json/home.json";

export const dynamic = "force-dynamic";

const DEFAULT_HERO = {
  heroImage: homeData.hero?.heroImage || "/images/products/keychain.webp",
  floatingTagBadge: "Best Seller",
  floatingTagTitle: "Elarose Keychains",
  floatingTagPrice: "₹99",
  headline: homeData.hero?.headline || "Handmade Luxury Gifts Crafted",
  headlineAccent: homeData.hero?.headlineAccent || "With Love",
  subheadline: homeData.hero?.subheadline || "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting.",
  ctaPrimary: homeData.hero?.ctaPrimary || "Order on Instagram",
  ctaSecondary: homeData.hero?.ctaSecondary || "View Products",
};

export async function GET() {
  try {
    await connectToDatabase();
    let hero = await HeroSettings.findOne();

    if (!hero) {
      hero = await HeroSettings.create(DEFAULT_HERO);
    }

    return NextResponse.json({
      hero: {
        heroImage: hero.heroImage || DEFAULT_HERO.heroImage,
        floatingTagBadge: hero.floatingTagBadge || DEFAULT_HERO.floatingTagBadge,
        floatingTagTitle: hero.floatingTagTitle || DEFAULT_HERO.floatingTagTitle,
        floatingTagPrice: hero.floatingTagPrice || DEFAULT_HERO.floatingTagPrice,
        headline: hero.headline || DEFAULT_HERO.headline,
        headlineAccent: hero.headlineAccent || DEFAULT_HERO.headlineAccent,
        subheadline: hero.subheadline || DEFAULT_HERO.subheadline,
        ctaPrimary: hero.ctaPrimary || DEFAULT_HERO.ctaPrimary,
        ctaSecondary: hero.ctaSecondary || DEFAULT_HERO.ctaSecondary,
      },
    });
  } catch (error: any) {
    console.error("Fetch hero settings error:", error);
    // Fallback gracefully to default json home data if DB fails
    return NextResponse.json({ hero: DEFAULT_HERO });
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
    const {
      heroImage,
      floatingTagBadge,
      floatingTagTitle,
      floatingTagPrice,
      headline,
      headlineAccent,
      subheadline,
      ctaPrimary,
      ctaSecondary,
    } = body;

    if (!heroImage) {
      return NextResponse.json({ message: "Hero image is required" }, { status: 400 });
    }

    const updateData = {
      heroImage: heroImage.trim(),
      floatingTagBadge: floatingTagBadge ? floatingTagBadge.trim() : "Best Seller",
      floatingTagTitle: floatingTagTitle ? floatingTagTitle.trim() : "Elarose Keychains",
      floatingTagPrice: floatingTagPrice ? floatingTagPrice.trim() : "₹99",
      headline: headline ? headline.trim() : DEFAULT_HERO.headline,
      headlineAccent: headlineAccent ? headlineAccent.trim() : DEFAULT_HERO.headlineAccent,
      subheadline: subheadline ? subheadline.trim() : DEFAULT_HERO.subheadline,
      ctaPrimary: ctaPrimary ? ctaPrimary.trim() : DEFAULT_HERO.ctaPrimary,
      ctaSecondary: ctaSecondary ? ctaSecondary.trim() : DEFAULT_HERO.ctaSecondary,
    };

    const updatedHero = await HeroSettings.findOneAndUpdate({}, updateData, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json({
      message: "Hero section updated successfully!",
      hero: {
        heroImage: updatedHero.heroImage,
        floatingTagBadge: updatedHero.floatingTagBadge,
        floatingTagTitle: updatedHero.floatingTagTitle,
        floatingTagPrice: updatedHero.floatingTagPrice,
        headline: updatedHero.headline,
        headlineAccent: updatedHero.headlineAccent,
        subheadline: updatedHero.subheadline,
        ctaPrimary: updatedHero.ctaPrimary,
        ctaSecondary: updatedHero.ctaSecondary,
      },
    });
  } catch (error: any) {
    console.error("Update hero section error:", error);
    return NextResponse.json({ message: error.message || "Failed to update Hero section" }, { status: 500 });
  }
}
