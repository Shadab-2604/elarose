import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import HomePageSettings from "@/models/HomePageSettings";
import HeroSettings from "@/models/HeroSettings";
import { verifyAccessToken } from "@/lib/jwt";
import homeData from "@/json/home.json";
import occasionsData from "@/json/occasions.json";
import instagramData from "@/json/instagram.json";

export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS = {
  hero: {
    headline: homeData.hero?.headline || "Handmade Luxury Gifts Crafted",
    headlineAccent: homeData.hero?.headlineAccent || "With Love",
    subheadline: homeData.hero?.subheadline || "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting.",
    ctaPrimary: homeData.hero?.ctaPrimary || "Order on Instagram",
    ctaSecondary: homeData.hero?.ctaSecondary || "View Products",
    heroImage: homeData.hero?.heroImage || "/images/products/keychain.webp",
    floatingTagBadge: "Best Seller",
    floatingTagTitle: "Elarose Keychains",
    floatingTagPrice: "₹99",
  },
  featuredCategoriesHeading: "Featured Categories",
  featuredCategoriesSubheading: "Curated collections ready and available to order.",
  bestSellersHeading: homeData.bestSellersHeading || "Best Sellers",
  bestSellersSubheading: homeData.bestSellersSubheading || "The pieces our customers can't stop gifting.",
  whyHeading: homeData.whyHeading || "Why Choose ELAROSE",
  whySubheading: homeData.whySubheading || "Crafted with care in every petal, every stitch, every detail.",
  trustPoints: homeData.trustPoints || [],
  howItWorksHeading: homeData.howItWorksHeading || "How It Works",
  howItWorksSubheading: homeData.howItWorksSubheading || "Four gentle steps to a gift they will never forget.",
  steps: homeData.steps || [],
  occasionsHeading: "Gifts For Every Occasion",
  occasionsSubheading: "Whatever the moment, we have a gift wrapped for it.",
  occasions: occasionsData || [],
  packagingHeading: homeData.packagingHeading || "Signature Packaging",
  packagingSubheading: homeData.packagingSubheading || "Unboxing is part of the gift. Every parcel is an experience unto itself.",
  packagingNote: "Ivory wrap · Blush ribbon · Gold seal · Hand-lettered card",
  packagingImages: homeData.packagingImages || [],
  instagramHandle: instagramData.handle || "@elarose_atelier",
  instagramUrl: instagramData.url || "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx",
  instagramHeading: instagramData.heading || "@elarose_atelier",
  instagramSubheading: instagramData.subheading || "Follow our journey on Instagram. Follow us and tag us in your unboxing.",
  instagramPosts: instagramData.posts || [],
  finalCtaHeading: homeData.finalCtaHeading || "Make Every Gift Memorable.",
  finalCtaSubheading: homeData.finalCtaSubheading || "Your perfect gift is just one message away.",
  finalCtaButton: homeData.finalCtaButton || "Order on Instagram",
  finalCtaImage: homeData.finalCtaImage || "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export async function GET() {
  try {
    await connectToDatabase();
    let settingsDoc = await HomePageSettings.findOne();

    if (!settingsDoc) {
      settingsDoc = await HomePageSettings.create(DEFAULT_SETTINGS);
    }

    return NextResponse.json({ settings: settingsDoc });
  } catch (error: any) {
    console.error("Fetch home settings error:", error);
    return NextResponse.json({ settings: DEFAULT_SETTINGS });
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

    const updatedSettings = await HomePageSettings.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    // Also sync HeroSettings model if hero data is provided
    if (body.hero) {
      await HeroSettings.findOneAndUpdate({}, body.hero, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }).catch((err) => console.warn("Syncing HeroSettings failed:", err));
    }

    return NextResponse.json({
      message: "Home page settings updated successfully!",
      settings: updatedSettings,
    });
  } catch (error: any) {
    console.error("Update home settings error:", error);
    return NextResponse.json({ message: error.message || "Failed to update Home Page settings" }, { status: 500 });
  }
}
