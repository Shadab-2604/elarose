"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Occasion {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function OccasionsSection({ occasions }: { occasions: Occasion[] }) {
  return (
    <section className="py-16 md:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Shop By Moment</p>
          <h2 className="section-heading">Gifts For Every Occasion</h2>
          <p className="section-subheading mt-3 max-w-lg mx-auto">
            Whatever the moment, we have a gift wrapped for it.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {occasions.map((occasion, i) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={occasion.href} className="group block">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-blush-100 mb-3">
                  <Image
                    src={occasion.image}
                    alt={occasion.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm sm:text-base" style={{fontFamily:"'Playfair Display',serif"}}>
                      {occasion.title}
                    </h3>
                  </div>
                </div>
                <p className="text-text-muted text-xs hidden sm:block leading-relaxed line-clamp-2">
                  {occasion.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
