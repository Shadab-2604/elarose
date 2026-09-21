"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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

const DEFAULT_CATEGORIES = [
  { value: "pots", label: "Flower Pots" },
  { value: "keychains", label: "Personalized Keychains" },
  { value: "hampers", label: "Luxury Hampers" },
  { value: "custom", label: "Custom Gifts" },
];

const DEFAULT_OCCASIONS = [
  { value: "Birthday", label: "Birthday" },
  { value: "Anniversary", label: "Anniversary" },
  { value: "Wedding", label: "Wedding" },
  { value: "Special Surprise", label: "Special Surprise" },
];

function ProductsClientContent({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";
  const urlOccasion = searchParams.get("occasion") || "";

  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory || "all");
  const [occasion, setOccasion] = useState(urlOccasion || "all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Controls for expanding/collapsing categories & occasions when there are many
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [occasionsExpanded, setOccasionsExpanded] = useState(false);

  const INITIAL_CATEGORY_LIMIT = 4; // Show All + 4 categories initially
  const INITIAL_OCCASION_LIMIT = 4; // Show All + 4 occasions initially

  useEffect(() => {
    if (urlSearch) setSearch(urlSearch);
    if (urlCategory) setCategory(urlCategory);
    if (urlOccasion) setOccasion(urlOccasion);
  }, [urlSearch, urlCategory, urlOccasion]);

  useEffect(() => {
    let isMounted = true;
    async function loadBackendProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn("Could not fetch products from API, displaying initial items:", err);
      }
    }
    loadBackendProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute dynamic category list with guaranteed unique keys and slug mapping
  const categoriesList = useMemo(() => {
    const map = new Map<string, { value: string; label: string }>();
    map.set("all", { value: "all", label: "All" });

    // Seed defaults
    DEFAULT_CATEGORIES.forEach((c) => {
      map.set(c.value.toLowerCase(), c);
    });

    // Dynamically extract unique categories from products
    products.forEach((p) => {
      if (p.category && p.category.trim()) {
        const label = p.category.trim();
        const value = (p.categorySlug || label).toLowerCase().replace(/\s+/g, "-");
        if (!map.has(value)) {
          map.set(value, { value, label });
        }
      }
    });

    return Array.from(map.values());
  }, [products]);

  // Compute dynamic occasion list with guaranteed unique keys
  const occasionsList = useMemo(() => {
    const map = new Map<string, { value: string; label: string }>();
    map.set("all", { value: "all", label: "All" });

    DEFAULT_OCCASIONS.forEach((o) => {
      map.set(o.value.toLowerCase(), o);
    });

    products.forEach((p) => {
      if (Array.isArray(p.occasion)) {
        p.occasion.forEach((occ) => {
          if (occ && occ.trim()) {
            const label = occ.trim();
            const value = label.toLowerCase();
            if (!map.has(value)) {
              map.set(value, { value: label, label });
            }
          }
        });
      }
    });

    return Array.from(map.values());
  }, [products]);

  const visibleCategories = useMemo(() => {
    if (categoriesExpanded || categoriesList.length <= INITIAL_CATEGORY_LIMIT + 1) {
      return categoriesList;
    }
    return categoriesList.slice(0, INITIAL_CATEGORY_LIMIT + 1);
  }, [categoriesList, categoriesExpanded]);

  const visibleOccasions = useMemo(() => {
    if (occasionsExpanded || occasionsList.length <= INITIAL_OCCASION_LIMIT + 1) {
      return occasionsList;
    }
    return occasionsList.slice(0, INITIAL_OCCASION_LIMIT + 1);
  }, [occasionsList, occasionsExpanded]);

  const remainingCategories = categoriesList.length - (INITIAL_CATEGORY_LIMIT + 1);
  const remainingOccasions = occasionsList.length - (INITIAL_OCCASION_LIMIT + 1);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());

      const targetCat = category.toLowerCase();
      const pCatSlug = (p.categorySlug || "").toLowerCase();
      const pCatName = (p.category || "").toLowerCase();

      const matchCat =
        category === "all" ||
        pCatSlug === targetCat ||
        pCatName === targetCat ||
        pCatName.includes(targetCat) ||
        targetCat.includes(pCatName);

      const targetOcc = occasion.toLowerCase();
      const matchOcc =
        occasion === "all" ||
        (Array.isArray(p.occasion) &&
          p.occasion.some((o) => o.toLowerCase() === targetOcc));

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
            <div className="bg-white rounded-xl border border-blush-200 p-5 sticky top-20 shadow-sm">
              {/* Search */}
              <div className="relative mb-5">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search gifts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-ivory border border-blush-200 rounded-lg outline-none focus:border-maroon transition-colors placeholder:text-text-light"
                />
              </div>

              {/* Category Filter Section */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-text-light font-semibold">Category</p>
                  {categoriesList.length > 1 && (
                    <span className="text-[10px] text-text-muted">{categoriesList.length - 1} categories</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {visibleCategories.map((c, idx) => {
                    const isActive =
                      category === c.value ||
                      category.toLowerCase() === c.label.toLowerCase() ||
                      (category !== "all" &&
                        c.value !== "all" &&
                        category.toLowerCase().includes(c.value.toLowerCase()));
                    return (
                      <button
                        key={`cat-${c.value}-${idx}`}
                        onClick={() => setCategory(c.value)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                          isActive
                            ? "bg-maroon text-white border-maroon shadow-sm"
                            : "bg-ivory text-text-muted border-blush-200 hover:border-maroon/50 hover:text-maroon"
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>

                {/* Arrow toggle to load more categories */}
                {remainingCategories > 0 && (
                  <button
                    onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-maroon hover:text-maroon-950 transition-colors py-1.5 px-3 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200"
                  >
                    <span>
                      {categoriesExpanded ? "Show Less" : `+ ${remainingCategories} More Categories`}
                    </span>
                    {categoriesExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-maroon" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-maroon" />
                    )}
                  </button>
                )}
              </div>

              {/* Occasion Filter Section */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-text-light font-semibold">Occasion</p>
                  {occasionsList.length > 1 && (
                    <span className="text-[10px] text-text-muted">{occasionsList.length - 1} occasions</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {visibleOccasions.map((o, idx) => {
                    const isActive =
                      occasion.toLowerCase() === o.value.toLowerCase() ||
                      occasion.toLowerCase() === o.label.toLowerCase();
                    return (
                      <button
                        key={`occ-${o.value}-${idx}`}
                        onClick={() => setOccasion(o.value)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                          isActive
                            ? "bg-maroon text-white border-maroon shadow-sm"
                            : "bg-ivory text-text-muted border-blush-200 hover:border-maroon/50 hover:text-maroon"
                        }`}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>

                {/* Arrow toggle to load more occasions */}
                {remainingOccasions > 0 && (
                  <button
                    onClick={() => setOccasionsExpanded(!occasionsExpanded)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-maroon hover:text-maroon-950 transition-colors py-1.5 px-3 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200"
                  >
                    <span>
                      {occasionsExpanded ? "Show Less" : `+ ${remainingOccasions} More Occasions`}
                    </span>
                    {occasionsExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-maroon" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-maroon" />
                    )}
                  </button>
                )}
              </div>

              {(search || category !== "all" || occasion !== "all") && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-maroon font-medium hover:underline block pt-2"
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
                className="text-center py-20 bg-white rounded-2xl border border-blush-200"
              >
                <p className="text-text-muted text-lg mb-2 font-playfair">No gifts found</p>
                <p className="text-text-light text-sm mb-4">Try a different search or filter.</p>
                <button onClick={resetFilters} className="text-sm text-maroon underline font-medium">
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => {
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

export default function ProductsClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-text-muted">Loading collection...</div>}>
      <ProductsClientContent initialProducts={products} />
    </Suspense>
  );
}
