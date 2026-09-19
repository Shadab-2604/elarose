"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import SectionWrapper from "@/components/SectionWrapper";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  _id?: string;
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

export default function WishlistPage() {
  const { user, loading, openAuthModal } = useAuth();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setFetching(true);
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data.products || []);
        }
      } catch (err) {
        console.error("Failed to load products for wishlist:", err);
      } finally {
        setFetching(false);
      }
    }
    loadProducts();
  }, []);

  if (loading || fetching) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-ivory">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-maroon"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-ivory">
        <SectionWrapper>
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-xl border border-blush-200">
            <Heart size={48} className="mx-auto text-maroon mb-4" />
            <h1 className="text-2xl font-semibold text-maroon mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Wishlist
            </h1>
            <p className="text-xs text-text-muted mb-6">
              Sign in to view your saved favorite luxury handmade products.
            </p>
            <button
              onClick={() => openAuthModal("login")}
              className="bg-maroon text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-maroon-950 transition-colors shadow-md"
            >
              Sign In to View Wishlist
            </button>
          </div>
        </SectionWrapper>
      </div>
    );
  }

  const likedProducts = allProducts.filter((product) => {
    const pId = product.id || product._id || "";
    return user.likes && user.likes.includes(pId);
  });

  return (
    <div className="min-h-screen pt-24 pb-20 bg-ivory text-text">
      {/* Header */}
      <section className="py-8 bg-ivory border-b border-blush-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-medium text-maroon hover:underline mb-4"
          >
            <ArrowLeft size={14} />
            Back to Collection
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold-500 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Saved Items
              </p>
              <h1 className="text-3xl font-semibold text-maroon" style={{ fontFamily: "'Playfair Display', serif" }}>
                My Wishlist ({likedProducts.length})
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {likedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-blush-200 p-8">
            <Heart size={40} className="mx-auto text-blush-300 mb-3" />
            <h2 className="text-xl font-semibold text-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-text-muted mb-6">
              Explore our handmade luxury collection and click the heart icon on any product to save it here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-maroon text-white text-xs font-medium px-6 py-3 rounded-full hover:bg-maroon-950 transition-colors shadow-md"
            >
              <ShoppingBag size={14} />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedProducts.map((product) => {
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

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
