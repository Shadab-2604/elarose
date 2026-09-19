import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeaturedCategory extends Document {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  href: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FeaturedCategorySchema = new Schema<IFeaturedCategory>(
  {
    id: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    shortTitle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const FeaturedCategory: Model<IFeaturedCategory> =
  mongoose.models.FeaturedCategory ||
  mongoose.model<IFeaturedCategory>("FeaturedCategory", FeaturedCategorySchema);

export default FeaturedCategory;
