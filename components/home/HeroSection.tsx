"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroData {
  headline: string;
  headlineAccent: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badges: string[];
  rating: string;
  ratingCount: string;
  heroImage: string;
}

const WHATSAPP_NUMBER = "919876543210";
const WHATSAPP_MSG = "Hi, I want to place an order.";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function HeroSection({ data }: { data: HeroData }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ivory">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush-100/40 via-ivory to-ivory pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Text */}
        <div className="order-2 lg:order-1">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="section-eyebrow"
          >
            Handcrafted · Personalized · Premium
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-semibold text-text leading-[1.1] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {data.headline}{" "}
            <span className="italic text-maroon">{data.headlineAccent}</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
          >
            {data.subheadline}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3 mb-8"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.12 1.523 5.855L0 24l6.335-1.497A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.497-5.19-1.367l-.37-.22-3.833.905.957-3.735-.241-.384A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {data.ctaPrimary}
            </a>
            <Link
              href="/products"
              className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5"
            >
              {data.ctaSecondary}
            </Link>
          </motion.div>

          {/* Badges + Rating */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C8A96B">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              ))}
              <span className="text-sm text-text-muted ml-1">{data.rating} · {data.ratingCount}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs bg-blush-100 text-text-muted border border-blush-200 px-3 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="order-1 lg:order-2 relative"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:max-w-none shadow-2xl">
            <Image
              src={data.heroImage}
              alt="ELAROSE luxury handmade bouquet"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent" />
          </div>
          {/* Floating tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-blush-200"
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-gold-500 mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>Best Seller</p>
            <p className="text-sm font-semibold text-text" style={{fontFamily:"'Playfair Display',serif"}}>Rosé Eternity Bouquet</p>
            <p className="text-xs text-maroon font-medium">₹2,499</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
