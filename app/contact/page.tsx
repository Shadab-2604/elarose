"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import contactData from "@/json/contact.json";

const WHATSAPP_NUMBER = "919876543210";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'm ${name}${email ? ` (${email})` : ""}. ${occasion ? `Occasion: ${occasion}. ` : ""}${message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const contactItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.12 1.523 5.855L0 24l6.335-1.497A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.497-5.19-1.367l-.37-.22-3.833.905.957-3.735-.241-.384A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      ),
      label: "WHATSAPP",
      value: contactData.whatsapp,
      href: `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent("Hi, I want to place an order.")}`,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
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
