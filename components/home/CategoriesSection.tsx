"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  href: string;
}

export default function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-eyebrow">The Collection</p>
          <h2 className="section-heading">Featured Categories</h2>
          <p className="section-subheading mt-3 max-w-xl mx-auto">
            Curated collections ready and available to order.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={cat.href}
                className="group block rounded-xl overflow-hidden relative aspect-[3/4] bg-blush-100"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-maroon/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-base sm:text-lg leading-snug mb-1" style={{fontFamily:"'Playfair Display',serif"}}>
                    {cat.shortTitle}
                  </h3>
                  <p className="text-white/80 text-xs hidden sm:block leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
