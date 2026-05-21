"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";

interface Product {
  id: string;
  slug: string;
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
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "bouquets", label: "Pipe Cleaner Bouquets" },
  { value: "keychains", label: "Personalized Keychains" },
  { value: "hampers", label: "Luxury Hampers" },
  { value: "custom", label: "Custom Gifts" },
];

const OCCASIONS = [
  { value: "all", label: "All" },
  { value: "Birthday", label: "Birthday" },
  { value: "Anniversary", label: "Anniversary" },
  { value: "Wedding", label: "Wedding" },
  { value: "Special Surprise", label: "Special Surprise" },
];

export default function ProductsClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [occasion, setOccasion] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || p.categorySlug === category;
      const matchOcc = occasion === "all" || p.occasion.includes(occasion);
      return matchSearch && matchCat && matchOcc;
    });
  }, [products, search, category, occasion]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setOccasion("all");
  };

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-ivory text-center border-b border-blush-200">
        <div className="max-w-3xl mx-auto px-4">
          <p className="section-eyebrow">The Atelier</p>
          <h1 className="section-heading mb-3">The ELAROSE Collection</h1>
          <p className="section-subheading">Handpicked. Handcrafted. Heart-wrapped.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-blush-200 p-5 sticky top-20">
              {/* Search */}
              <div className="relative mb-5">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search gifts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-ivory border border-blush-200 rounded-lg outline-none focus:border-maroon transition-colors placeholder:text-text-light"
                />
              </div>

              {/* Category */}
              <div className="mb-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-text-light mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCategory(c.value)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                        category === c.value
                          ? "bg-maroon text-white border-maroon"
                          : "bg-ivory text-text-muted border-blush-200 hover:border-maroon/50"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div className="mb-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-text-light mb-3">Occasion</p>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setOccasion(o.value)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                        occasion === o.value
                          ? "bg-maroon text-white border-maroon"
                          : "bg-ivory text-text-muted border-blush-200 hover:border-maroon/50"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {(search || category !== "all" || occasion !== "all") && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-maroon hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-muted">
                {filtered.length} curated piece{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-text-muted text-lg mb-2" style={{fontFamily:"'Playfair Display',serif"}}>No gifts found</p>
                <p className="text-text-light text-sm mb-4">Try a different search or filter.</p>
                <button onClick={resetFilters} className="text-sm text-maroon underline">
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p as Product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
