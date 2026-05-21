"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  isBestSeller: boolean;
  customizable: boolean;
  occasion: string[];
}

const WHATSAPP_NUMBER = "919876543210";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
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

  const msg = product
    ? `Hi, I'm interested in the "${product.title}" (₹${product.price.toLocaleString("en-IN")}). Can I place an order?`
    : "";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <AnimatePresence>
      {product && (
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
                <button
                  onClick={onClose}
                  className="self-end -mt-1 -mr-1 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-blush-100 transition-colors"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

                <p className="text-[11px] tracking-[0.2em] uppercase text-gold-500 mt-2 mb-2" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                  {product.category}
                </p>
                <h2 className="text-2xl font-semibold text-text mb-3 leading-snug" style={{fontFamily:"'Playfair Display',serif"}}>
                  {product.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.occasion.map((occ) => (
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

                <div className="flex items-center justify-between pt-4 border-t border-blush-200 mt-auto">
                  <span className="text-2xl font-semibold text-maroon" style={{fontFamily:"'Playfair Display',serif"}}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-maroon text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-maroon-950 transition-all duration-300 hover:shadow-md active:scale-95"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.12 1.523 5.855L0 24l6.335-1.497A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.497-5.19-1.367l-.37-.22-3.833.905.957-3.735-.241-.384A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
