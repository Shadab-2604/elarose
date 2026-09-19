import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  category: string;
  categorySlug: string;
  price: number;
  shortDescription: string;
  description?: string;
  image: string;
  images?: string[];
  isBestSeller: boolean;
  customizable: boolean;
  occasion: string[];
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    categorySlug: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    images: [{ type: String }],
    isBestSeller: { type: Boolean, default: false },
    customizable: { type: Boolean, default: false },
    occasion: [{ type: String }],
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
