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

export default function HomePage() {
  const bestSellers = productsData.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <>
      <HeroSection data={homeData.hero} />
      <CategoriesSection categories={categoriesData} />
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
