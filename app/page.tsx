import homeData from "@/json/home.json";
import productsData from "@/json/products.json";
import categoriesData from "@/json/categories.json";
import occasionsData from "@/json/occasions.json";
import instagramData from "@/json/instagram.json";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import WhySection from "@/components/home/WhySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import OccasionsSection from "@/components/home/OccasionsSection";
import PackagingSection from "@/components/home/PackagingSection";
import InstagramSection from "@/components/home/InstagramSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import { connectToDatabase } from "@/lib/db";
import HeroSettings from "@/models/HeroSettings";
import FeaturedCategory from "@/models/FeaturedCategory";
import HomePageSettings from "@/models/HomePageSettings";

export const revalidate = 0;

export default async function HomePage() {
  const bestSellers = productsData.filter((p) => p.isBestSeller).slice(0, 4);

  let heroData = {
    ...homeData.hero,
    floatingTagBadge: "Best Seller",
    floatingTagTitle: "Elarose Keychains",
    floatingTagPrice: "₹99",
  };

  let featuredCats = categoriesData;
  let categoriesHeading = "Featured Categories";
  let categoriesSubheading = "Curated collections ready and available to order.";

  let bestSellersHeading = homeData.bestSellersHeading;
  let bestSellersSubheading = homeData.bestSellersSubheading;

  let whyHeading = homeData.whyHeading;
  let whySubheading = homeData.whySubheading;
  let trustPoints = homeData.trustPoints;

  let howItWorksHeading = homeData.howItWorksHeading;
  let howItWorksSubheading = homeData.howItWorksSubheading;
  let steps = homeData.steps;

  let occasionsHeading = "Gifts For Every Occasion";
  let occasionsSubheading = "Whatever the moment, we have a gift wrapped for it.";
  let occasions = occasionsData;

  let packagingHeading = homeData.packagingHeading;
  let packagingSubheading = homeData.packagingSubheading;
  let packagingNote = "Ivory wrap · Blush ribbon · Gold seal · Hand-lettered card";
  let packagingImages = homeData.packagingImages;

  let instagramObj = instagramData;

  let finalCtaHeading = homeData.finalCtaHeading;
  let finalCtaSubheading = homeData.finalCtaSubheading;
  let finalCtaButton = homeData.finalCtaButton;
  let finalCtaImage = homeData.finalCtaImage;

  try {
    await connectToDatabase();

    const [heroDocRaw, dbCategoriesRaw, pageSettingsDocRaw] = await Promise.all([
      HeroSettings.findOne().lean(),
      FeaturedCategory.find().sort({ order: 1 }).lean(),
      HomePageSettings.findOne().lean(),
    ]);

    const heroDoc = heroDocRaw ? JSON.parse(JSON.stringify(heroDocRaw)) : null;
    const dbCategories = dbCategoriesRaw ? JSON.parse(JSON.stringify(dbCategoriesRaw)) : [];
    const pageSettingsDoc = pageSettingsDocRaw ? JSON.parse(JSON.stringify(pageSettingsDocRaw)) : null;

    if (pageSettingsDoc) {
      if (pageSettingsDoc.hero) {
        heroData = {
          ...heroData,
          ...pageSettingsDoc.hero,
        };
      }
      if (pageSettingsDoc.featuredCategoriesHeading) {
        categoriesHeading = pageSettingsDoc.featuredCategoriesHeading;
      }
      if (pageSettingsDoc.featuredCategoriesSubheading) {
        categoriesSubheading = pageSettingsDoc.featuredCategoriesSubheading;
      }
      if (pageSettingsDoc.bestSellersHeading) {
        bestSellersHeading = pageSettingsDoc.bestSellersHeading;
      }
      if (pageSettingsDoc.bestSellersSubheading) {
        bestSellersSubheading = pageSettingsDoc.bestSellersSubheading;
      }
      if (pageSettingsDoc.whyHeading) {
        whyHeading = pageSettingsDoc.whyHeading;
      }
      if (pageSettingsDoc.whySubheading) {
        whySubheading = pageSettingsDoc.whySubheading;
      }
      if (pageSettingsDoc.trustPoints && pageSettingsDoc.trustPoints.length > 0) {
        trustPoints = pageSettingsDoc.trustPoints;
      }
      if (pageSettingsDoc.howItWorksHeading) {
        howItWorksHeading = pageSettingsDoc.howItWorksHeading;
      }
      if (pageSettingsDoc.howItWorksSubheading) {
        howItWorksSubheading = pageSettingsDoc.howItWorksSubheading;
      }
      if (pageSettingsDoc.steps && pageSettingsDoc.steps.length > 0) {
        steps = pageSettingsDoc.steps;
      }
      if (pageSettingsDoc.occasionsHeading) {
        occasionsHeading = pageSettingsDoc.occasionsHeading;
      }
      if (pageSettingsDoc.occasionsSubheading) {
        occasionsSubheading = pageSettingsDoc.occasionsSubheading;
      }
      if (pageSettingsDoc.occasions && pageSettingsDoc.occasions.length > 0) {
        occasions = pageSettingsDoc.occasions;
      }
      if (pageSettingsDoc.packagingHeading) {
        packagingHeading = pageSettingsDoc.packagingHeading;
      }
      if (pageSettingsDoc.packagingSubheading) {
        packagingSubheading = pageSettingsDoc.packagingSubheading;
      }
      if (pageSettingsDoc.packagingNote) {
        packagingNote = pageSettingsDoc.packagingNote;
      }
      if (pageSettingsDoc.packagingImages && pageSettingsDoc.packagingImages.length > 0) {
        packagingImages = pageSettingsDoc.packagingImages;
      }
      if (pageSettingsDoc.instagramHeading || pageSettingsDoc.instagramPosts) {
        instagramObj = {
          handle: pageSettingsDoc.instagramHandle || instagramData.handle,
          url: pageSettingsDoc.instagramUrl || instagramData.url,
          heading: pageSettingsDoc.instagramHeading || instagramData.heading,
          subheading: pageSettingsDoc.instagramSubheading || instagramData.subheading,
          posts: pageSettingsDoc.instagramPosts && pageSettingsDoc.instagramPosts.length > 0
            ? pageSettingsDoc.instagramPosts
            : instagramData.posts,
        };
      }
      if (pageSettingsDoc.finalCtaHeading) {
        finalCtaHeading = pageSettingsDoc.finalCtaHeading;
      }
      if (pageSettingsDoc.finalCtaSubheading) {
        finalCtaSubheading = pageSettingsDoc.finalCtaSubheading;
      }
      if (pageSettingsDoc.finalCtaButton) {
        finalCtaButton = pageSettingsDoc.finalCtaButton;
      }
      if (pageSettingsDoc.finalCtaImage) {
        finalCtaImage = pageSettingsDoc.finalCtaImage;
      }
    }

    if (heroDoc) {
      heroData = {
        ...heroData,
        heroImage: heroDoc.heroImage || heroData.heroImage,
        floatingTagBadge: heroDoc.floatingTagBadge || heroData.floatingTagBadge,
        floatingTagTitle: heroDoc.floatingTagTitle || heroData.floatingTagTitle,
        floatingTagPrice: heroDoc.floatingTagPrice || heroData.floatingTagPrice,
        headline: heroDoc.headline || heroData.headline,
        headlineAccent: heroDoc.headlineAccent || heroData.headlineAccent,
        subheadline: heroDoc.subheadline || heroData.subheadline,
        ctaPrimary: heroDoc.ctaPrimary || heroData.ctaPrimary,
        ctaSecondary: heroDoc.ctaSecondary || heroData.ctaSecondary,
      };
    }

    if (dbCategories && dbCategories.length > 0) {
      featuredCats = dbCategories.map((c: any) => ({
        id: c.id,
        title: c.title,
        shortTitle: c.shortTitle,
        description: c.description,
        image: c.image,
        href: c.href,
      }));
    }
  } catch (err) {
    console.error("[HomePage] Error fetching Home Page settings:", err);
  }

  return (
    <>
      <HeroSection data={heroData} />
      <CategoriesSection categories={featuredCats} heading={categoriesHeading} subheading={categoriesSubheading} />
      <BestSellersSection
        products={bestSellers}
        heading={bestSellersHeading}
        subheading={bestSellersSubheading}
      />
      <WhySection
        heading={whyHeading}
        subheading={whySubheading}
        trustPoints={trustPoints}
      />
      <HowItWorksSection
        heading={howItWorksHeading}
        subheading={howItWorksSubheading}
        steps={steps}
      />
      <OccasionsSection heading={occasionsHeading} subheading={occasionsSubheading} occasions={occasions} />
      <PackagingSection
        heading={packagingHeading}
        subheading={packagingSubheading}
        note={packagingNote}
        images={packagingImages}
      />
      <InstagramSection data={instagramObj} />
      <FinalCtaSection
        heading={finalCtaHeading}
        subheading={finalCtaSubheading}
        button={finalCtaButton}
        image={finalCtaImage}
      />
    </>
  );
}
