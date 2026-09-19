"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";

interface Product {
  id: string;
  _id?: string;
  slug?: string;
  title: string;
  category: string;
  categorySlug: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  isBestSeller: boolean;
  customizable: boolean;
  occasion: string[];
  likesCount?: number;
}

export default function BestSellersSection({
  products: initialProducts,
  heading,
  subheading,
}: {
  products: Product[];
  heading: string;
  subheading: string;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadBestSellers() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.products && Array.isArray(data.products) && data.products.length > 0) {
            const best = data.products.filter((p: Product) => p.isBestSeller).slice(0, 4);
            if (best.length > 0) {
              setProducts(best);
            } else {
              setProducts(data.products.slice(0, 4));
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch best sellers from API, displaying static fallbacks:", err);
      }
    }
    loadBestSellers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-eyebrow">Our Favourites</p>
            <h2 className="section-heading">{heading}</h2>
            <p className="section-subheading mt-2">{subheading}</p>
          </div>
          <Link
            href="/products"
            className="flex-shrink-0 flex items-center gap-1.5 text-sm font-medium text-maroon hover:text-maroon-950 transition-colors"
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const pId = product.id || product._id || "";
            return (
              <ProductCard
                key={pId}
                product={{ ...product, id: pId }}
                onQuickView={(p) => setSelectedProduct(p as Product)}
              />
            );
          })}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
