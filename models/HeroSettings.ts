import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHeroSettings extends Document {
  heroImage: string;
  floatingTagBadge: string;
  floatingTagTitle: string;
  floatingTagPrice: string;
  headline?: string;
  headlineAccent?: string;
  subheadline?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  updatedAt: Date;
}

const HeroSettingsSchema = new Schema<IHeroSettings>(
  {
    heroImage: { type: String, required: true, default: "/images/products/keychain.webp" },
    floatingTagBadge: { type: String, default: "Best Seller" },
    floatingTagTitle: { type: String, default: "Elarose Keychains" },
    floatingTagPrice: { type: String, default: "₹99" },
    headline: { type: String, default: "Handmade Luxury Gifts Crafted" },
    headlineAccent: { type: String, default: "With Love" },
    subheadline: { type: String, default: "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting." },
    ctaPrimary: { type: String, default: "Order on Instagram" },
    ctaSecondary: { type: String, default: "View Products" },
  },
  { timestamps: true }
);

const HeroSettings: Model<IHeroSettings> =
  mongoose.models.HeroSettings || mongoose.model<IHeroSettings>("HeroSettings", HeroSettingsSchema);

export default HeroSettings;
