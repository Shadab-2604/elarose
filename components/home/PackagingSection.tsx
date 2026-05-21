"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PackagingImage {
  src: string;
  alt: string;
}

export default function PackagingSection({
  heading,
  subheading,
  images,
}: {
  heading: string;
  subheading: string;
  images: PackagingImage[];
}) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Presentation</p>
          <h2 className="section-heading">{heading}</h2>
          <p className="section-subheading mt-3 max-w-xl mx-auto">{subheading}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-xl overflow-hidden bg-blush-100 ${
                i === 0 ? "md:col-span-2 aspect-[4/3]" : "aspect-square"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 italic text-text-muted text-sm"
          style={{fontFamily:"'Cormorant Garamond',serif"}}
        >
          Ivory wrap · Blush ribbon · Gold seal · Hand-lettered card
        </motion.p>
      </div>
    </section>
  );
}
