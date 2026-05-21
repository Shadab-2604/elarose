"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const INSTAGRAM_URL = "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx";

export default function FinalCtaSection({
  heading,
  subheading,
  button,
  image,
}: {
  heading: string;
  subheading: string;
  button: string;
  image: string;
}) {
  const instagramUrl = INSTAGRAM_URL;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="ELAROSE final CTA background"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-maroon/80" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-blush-200 text-sm tracking-[0.25em] uppercase mb-4"
          style={{fontFamily:"'Cormorant Garamond',serif"}}
        >
          Crafted For You
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white text-4xl sm:text-5xl font-semibold mb-4"
          style={{fontFamily:"'Playfair Display',serif"}}
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/80 text-base mb-10 max-w-lg mx-auto leading-relaxed"
        >
          {subheading}
        </motion.p>
        <motion.a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-white text-maroon font-semibold text-sm sm:text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <Image src="/images/instagram.png" alt="Instagram" width={20} height={20} className="object-contain" />
          {button}
        </motion.a>
      </div>
    </section>
  );
}
