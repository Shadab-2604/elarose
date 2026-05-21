"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  price: number;
  shortDescription: string;
  image: string;
  isBestSeller: boolean;
  customizable: boolean;
  occasion: string[];
}

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const WHATSAPP_NUMBER = "919876543210";

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const msg = `Hi, I'm interested in the "${product.title}" (₹${product.price.toLocaleString("en-IN")}). Can I place an order?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-blush-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-blush-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-maroon text-white text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">
            Best Seller
          </span>
        )}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-maroon text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-maroon hover:text-white border border-blush-200"
        >
          Quick View
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold-500 mb-1" style={{fontFamily:"'Cormorant Garamond',serif"}}>
          {product.category}
        </p>
        <h3 className="text-text font-semibold text-base mb-1.5 leading-snug" style={{fontFamily:"'Playfair Display',serif"}}>
          {product.title}
        </h3>
        <p className="text-text-muted text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-maroon font-semibold text-base" style={{fontFamily:"'Playfair Display',serif"}}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-maroon hover:text-white hover:bg-maroon border border-maroon/30 hover:border-maroon px-3 py-1.5 rounded-full transition-all duration-300"
          >
            Order
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
