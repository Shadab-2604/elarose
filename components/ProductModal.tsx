"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: string;
  _id?: string;
  title: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  isBestSeller: boolean;
  customizable: boolean;
  occasion: string[];
  likesCount?: number;
}

const INSTAGRAM_URL = "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { isLiked, toggleLike } = useAuth();
  const productId = product ? product.id || product._id || "" : "";
  const liked = isLiked(productId);

  const [likesCount, setLikesCount] = useState(product?.likesCount || 0);

  useEffect(() => {
    if (product) {
      setLikesCount(product.likesCount || 0);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const instagramUrl = INSTAGRAM_URL;

  const handleLikeClick = async () => {
    const nowLiked = await toggleLike(productId);
    if (nowLiked) {
      setLikesCount((prev) => prev + 1);
    } else if (liked) {
      setLikesCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-ivory rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square sm:aspect-auto sm:min-h-[320px] bg-blush-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 bg-maroon text-white text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">
                  Best Seller
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] tracking-[0.2em] uppercase text-gold-500" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                  {product.category}
                </p>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-blush-100 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <h2 className="text-2xl font-semibold text-text mb-3 leading-snug" style={{fontFamily:"'Playfair Display',serif"}}>
                {product.title}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed mb-5">
                {product.description || product.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {(product.occasion || []).map((occ) => (
                  <span key={occ} className="text-xs text-text-muted bg-blush-100 px-2.5 py-1 rounded-full border border-blush-200">
                    {occ}
                  </span>
                ))}
                {product.customizable && (
                  <span className="text-xs text-maroon bg-maroon/5 px-2.5 py-1 rounded-full border border-maroon/20">
                    Customizable
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-blush-200 mt-auto gap-3">
                <span className="text-2xl font-semibold text-maroon" style={{fontFamily:"'Playfair Display',serif"}}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLikeClick}
                    className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-medium ${
                      liked
                        ? "bg-red-50 text-red-500 border-red-200"
                        : "bg-white text-text-muted border-blush-200 hover:text-red-500"
                    }`}
                  >
                    <Heart size={16} fill={liked ? "currentColor" : "none"} />
                    <span>{likesCount}</span>
                  </button>

                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-maroon text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-maroon-950 transition-all duration-300 hover:shadow-md active:scale-95"
                  >
                    <Image src="/images/instagram.png" alt="Instagram" width={16} height={16} className="object-contain" />
                    Order on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
