"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import contactData from "@/json/contact.json";

const INSTAGRAM_URL = "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const instagramUrl = INSTAGRAM_URL;
    window.open(instagramUrl, "_blank", "noopener,noreferrer");
  };

  const contactItems = [
    {
      icon: (
        <Image src="/images/instagram.png" alt="Instagram" width={20} height={20} className="object-contain" />
      ),
      label: "INSTAGRAM",
      value: contactData.instagram,
      href: contactData.instagramUrl,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <polyline points="22,4 12,13 2,4"/>
        </svg>
      ),
      label: "EMAIL",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      label: "STUDIO HOURS",
      value: contactData.hours,
      href: null,
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-ivory text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="section-eyebrow">{contactData.eyebrow}</p>
          <h1 className="section-heading mb-4">{contactData.headline}</h1>
          <p className="section-subheading">{contactData.subheadline}</p>
        </div>
      </section>

      {/* Main */}
      <section className="pb-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white rounded-xl p-5 border border-blush-200 hover:border-maroon/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-blush-100 flex items-center justify-center text-maroon flex-shrink-0 group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-text-light mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                        {item.label}
                      </p>
                      <p className="text-text font-medium text-sm">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 bg-white rounded-xl p-5 border border-blush-200">
                    <div className="w-11 h-11 rounded-full bg-blush-100 flex items-center justify-center text-maroon flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-text-light mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                        {item.label}
                      </p>
                      <p className="text-text font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl border border-blush-200 p-6 md:p-8"
          >
            <h2 className="font-semibold text-text text-xl mb-1" style={{fontFamily:"'Playfair Display',serif"}}>
              {contactData.formHeading}
            </h2>
            <p className="text-text-muted text-xs mb-6">{contactData.formSubheading}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="sr-only">Your name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-sm bg-ivory border border-blush-200 rounded-lg outline-none focus:border-maroon transition-colors placeholder:text-text-light"
                  />
                </div>
                <div>
                  <label className="sr-only">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-ivory border border-blush-200 rounded-lg outline-none focus:border-maroon transition-colors placeholder:text-text-light"
                  />
                </div>
              </div>
              <div>
                <label className="sr-only">Occasion</label>
                <input
                  type="text"
                  placeholder="Occasion (e.g. Anniversary)"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-ivory border border-blush-200 rounded-lg outline-none focus:border-maroon transition-colors placeholder:text-text-light"
                />
              </div>
              <div>
                <label className="sr-only">Message</label>
                <textarea
                  placeholder="Tell us about the gift..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 text-sm bg-ivory border border-blush-200 rounded-lg outline-none focus:border-maroon transition-colors placeholder:text-text-light resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-maroon text-white font-medium text-sm py-3.5 rounded-full hover:bg-maroon-950 transition-all duration-300 hover:shadow-md active:scale-[0.98]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
                {contactData.formCta}
              </button>
              <p className="text-center text-text-light text-xs">{contactData.formNote}</p>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
