import type { Metadata } from "next";
import productsData from "@/json/products.json";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "The Collection — ELAROSE",
  description:
    "Browse our full collection of handmade pipe cleaner bouquets, personalized keychains, luxury hampers and custom gifts.",
};

export default function ProductsPage() {
  return <ProductsClient products={productsData} />;
}
