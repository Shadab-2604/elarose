import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrustPoint {
  icon: string;
  title: string;
  description: string;
}

export interface IStep {
  number: string;
  title: string;
  description: string;
}

export interface IOccasion {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface IPackagingImage {
  src: string;
  alt: string;
}

export interface IInstagramPost {
  id: string;
  image: string;
  alt: string;
}

export interface IHomePageSettings extends Document {
  hero: {
    headline: string;
    headlineAccent: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImage: string;
    floatingTagBadge: string;
    floatingTagTitle: string;
    floatingTagPrice: string;
  };
  featuredCategoriesHeading: string;
  featuredCategoriesSubheading: string;
  bestSellersHeading: string;
  bestSellersSubheading: string;
  whyHeading: string;
  whySubheading: string;
  trustPoints: ITrustPoint[];
  howItWorksHeading: string;
  howItWorksSubheading: string;
  steps: IStep[];
  occasionsHeading: string;
  occasionsSubheading: string;
  occasions: IOccasion[];
  packagingHeading: string;
  packagingSubheading: string;
  packagingNote: string;
  packagingImages: IPackagingImage[];
  instagramHandle: string;
  instagramUrl: string;
  instagramHeading: string;
  instagramSubheading: string;
  instagramPosts: IInstagramPost[];
  finalCtaHeading: string;
  finalCtaSubheading: string;
  finalCtaButton: string;
  finalCtaImage: string;
  updatedAt: Date;
}

const TrustPointSchema = new Schema<ITrustPoint>({
  icon: { type: String, default: "handmade" },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const StepSchema = new Schema<IStep>({
  number: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const OccasionSchema = new Schema<IOccasion>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  href: { type: String, required: true },
});

const PackagingImageSchema = new Schema<IPackagingImage>({
  src: { type: String, required: true },
  alt: { type: String, required: true },
});

const InstagramPostSchema = new Schema<IInstagramPost>({
  id: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, required: true },
});

const HomePageSettingsSchema = new Schema<IHomePageSettings>(
  {
    hero: {
      headline: { type: String, default: "Handmade Luxury Gifts Crafted" },
      headlineAccent: { type: String, default: "With Love" },
      subheadline: { type: String, default: "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting." },
      ctaPrimary: { type: String, default: "Order on Instagram" },
      ctaSecondary: { type: String, default: "View Products" },
      heroImage: { type: String, default: "/images/products/keychain.webp" },
      floatingTagBadge: { type: String, default: "Best Seller" },
      floatingTagTitle: { type: String, default: "Elarose Keychains" },
      floatingTagPrice: { type: String, default: "₹99" },
    },
    featuredCategoriesHeading: { type: String, default: "Featured Categories" },
    featuredCategoriesSubheading: { type: String, default: "Curated collections ready and available to order." },
    bestSellersHeading: { type: String, default: "Best Sellers" },
    bestSellersSubheading: { type: String, default: "The pieces our customers can't stop gifting." },
    whyHeading: { type: String, default: "Why Choose ELAROSE" },
    whySubheading: { type: String, default: "Crafted with care in every petal, every stitch, every detail." },
    trustPoints: [TrustPointSchema],
    howItWorksHeading: { type: String, default: "How It Works" },
    howItWorksSubheading: { type: String, default: "Four gentle steps to a gift they will never forget." },
    steps: [StepSchema],
    occasionsHeading: { type: String, default: "Gifts For Every Occasion" },
    occasionsSubheading: { type: String, default: "Whatever the moment, we have a gift wrapped for it." },
    occasions: [OccasionSchema],
    packagingHeading: { type: String, default: "Signature Packaging" },
    packagingSubheading: { type: String, default: "Unboxing is part of the gift. Every parcel is an experience unto itself." },
    packagingNote: { type: String, default: "Ivory wrap · Blush ribbon · Gold seal · Hand-lettered card" },
    packagingImages: [PackagingImageSchema],
    instagramHandle: { type: String, default: "@elarose_atelier" },
    instagramUrl: { type: String, default: "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx" },
    instagramHeading: { type: String, default: "@elarose_atelier" },
    instagramSubheading: { type: String, default: "Follow our journey on Instagram. Follow us and tag us in your unboxing." },
    instagramPosts: [InstagramPostSchema],
    finalCtaHeading: { type: String, default: "Make Every Gift Memorable." },
    finalCtaSubheading: { type: String, default: "Your perfect gift is just one message away." },
    finalCtaButton: { type: String, default: "Order on Instagram" },
    finalCtaImage: { type: String, default: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  },
  { timestamps: true }
);

const HomePageSettings: Model<IHomePageSettings> =
  mongoose.models.HomePageSettings ||
  mongoose.model<IHomePageSettings>("HomePageSettings", HomePageSettingsSchema);

export default HomePageSettings;
