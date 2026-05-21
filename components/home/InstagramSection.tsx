"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

interface InstagramData {
  handle: string;
  url: string;
  heading: string;
  subheading: string;
  posts: InstagramPost[];
}

export default function InstagramSection({ data }: { data: InstagramData }) {
  return (
    <section className="py-16 md:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Instagram</p>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading mt-3 max-w-lg mx-auto">{data.subheading}</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 max-w-3xl mx-auto">
          {data.posts.slice(0, 9).map((post, i) => (
            <motion.a
              key={post.id}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square rounded-lg overflow-hidden bg-blush-100"
              aria-label={`View ${post.alt} on Instagram`}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 33vw, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-maroon/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-maroon border border-maroon/30 px-6 py-2.5 rounded-full hover:bg-maroon hover:text-white transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Follow {data.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
