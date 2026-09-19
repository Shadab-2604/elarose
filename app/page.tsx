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

  try {
    await connectToDatabase();

    const [heroDoc, dbCategories] = await Promise.all([
      HeroSettings.findOne().lean(),
      FeaturedCategory.find().sort({ order: 1 }).lean(),
    ]);

    if (heroDoc) {
      heroData = {
        ...homeData.hero,
        heroImage: heroDoc.heroImage || homeData.hero.heroImage,
        floatingTagBadge: heroDoc.floatingTagBadge || "Best Seller",
        floatingTagTitle: heroDoc.floatingTagTitle || "Elarose Keychains",
        floatingTagPrice: heroDoc.floatingTagPrice || "₹99",
        headline: heroDoc.headline || homeData.hero.headline,
        headlineAccent: heroDoc.headlineAccent || homeData.hero.headlineAccent,
        subheadline: heroDoc.subheadline || homeData.hero.subheadline,
        ctaPrimary: heroDoc.ctaPrimary || homeData.hero.ctaPrimary,
        ctaSecondary: heroDoc.ctaSecondary || homeData.hero.ctaSecondary,
      };
    }

    if (dbCategories && dbCategories.length > 0) {
      featuredCats = dbCategories.map((c) => ({
        id: c.id,
        title: c.title,
        shortTitle: c.shortTitle,
        description: c.description,
        image: c.image,
        href: c.href,
      }));
    }
  } catch (err) {
    console.error("[HomePage] Error fetching Hero or Featured Categories settings:", err);
  }

  return (
    <>
      <HeroSection data={heroData} />
      <CategoriesSection categories={featuredCats} />
      <BestSellersSection
        products={bestSellers}
        heading={homeData.bestSellersHeading}
        subheading={homeData.bestSellersSubheading}
      />
      <WhySection
        heading={homeData.whyHeading}
        subheading={homeData.whySubheading}
        trustPoints={homeData.trustPoints}
      />
      <HowItWorksSection
        heading={homeData.howItWorksHeading}
        subheading={homeData.howItWorksSubheading}
        steps={homeData.steps}
      />
      <OccasionsSection occasions={occasionsData} />
      <PackagingSection
        heading={homeData.packagingHeading}
        subheading={homeData.packagingSubheading}
        images={homeData.packagingImages}
      />
      <InstagramSection data={instagramData} />
      <FinalCtaSection
        heading={homeData.finalCtaHeading}
        subheading={homeData.finalCtaSubheading}
        button={homeData.finalCtaButton}
        image={homeData.finalCtaImage}
      />
    </>
  );
}
