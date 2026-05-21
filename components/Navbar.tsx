"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/policies", label: "Policies" },
];

const INSTAGRAM_URL = "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const instagramUrl = INSTAGRAM_URL;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-sm border-b border-blush-200"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.webp"
              alt="ELAROSE Logo"
              width={40}
              height={40}
              className="object-contain flex-shrink-0"
            />
            <div className="leading-tight">
              <div className="font-playfair font-semibold text-maroon text-lg tracking-wide leading-none" style={{fontFamily:"'Playfair Display',serif"}}>
                ELAROSE
              </div>
              <div className="text-text-muted text-[10px] tracking-[0.15em] uppercase leading-none mt-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                handmade luxury
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    pathname === link.href
                      ? "text-maroon"
                      : "text-text-muted hover:text-maroon"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-maroon transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-maroon text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-maroon-950 transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <Image src="/images/instagram.png" alt="Instagram" width={18} height={18} className="object-contain" />
            Instagram Order
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-maroon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-ivory flex flex-col pt-20 pb-10 px-8"
          >
            <ul className="flex flex-col gap-2 flex-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 border-b border-blush-200 text-xl font-medium transition-colors ${
                      pathname === link.href ? "text-maroon" : "text-text-muted"
                    }`}
                    style={{fontFamily:"'Playfair Display',serif"}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 bg-maroon text-white text-base font-medium px-6 py-4 rounded-full"
            >
              <Image src="/images/instagram.png" alt="Instagram" width={20} height={20} className="rounded-full" />
              Instagram Order
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
