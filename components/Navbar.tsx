"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { User as UserIcon, LogOut, ShieldCheck, Search, X, Heart } from "lucide-react";

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
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const { user, openAuthModal, logout } = useAuth();

  const likesCount = user && user.likes ? user.likes.length : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserDropdown(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

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
            {user?.role === "admin" && (
              <li>
                <Link
                  href="/admin"
                  className={`text-xs font-semibold text-maroon hover:text-maroon-950 flex items-center gap-1.5 px-3 py-1 bg-blush-100 rounded-full border border-maroon/20 ${
                    pathname === "/admin" ? "ring-1 ring-maroon" : ""
                  }`}
                >
                  <ShieldCheck size={14} />
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Desktop Right CTA / Search / Wishlist / User controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search Button */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search gifts..."
                      className="w-48 pl-8 pr-7 py-1.5 text-xs bg-white border border-maroon rounded-full outline-none focus:ring-1 focus:ring-maroon text-text"
                    />
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-maroon" />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-maroon"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-maroon hover:bg-blush-100/50 rounded-full transition-colors"
                  title="Search products"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 text-maroon hover:bg-blush-100/50 rounded-full transition-colors flex items-center"
              title="My Wishlist"
            >
              <Heart size={18} />
              {likesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-maroon text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {likesCount}
                </span>
              )}
            </Link>

            {/* User Account Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 text-xs font-medium text-maroon bg-blush-50 hover:bg-blush-100 border border-blush-200 px-3.5 py-2 rounded-full transition-colors"
                >
                  <UserIcon size={14} />
                  <span>{user.name.split(" ")[0]}</span>
                  {user.role === "admin" && (
                    <span className="bg-maroon text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase">
                      Admin
                    </span>
                  )}
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-blush-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-blush-100">
                      <p className="text-xs font-semibold text-text truncate">{user.name}</p>
                      <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/wishlist"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-text hover:bg-blush-50"
                    >
                      <Heart size={14} className="text-maroon" />
                      My Wishlist ({likesCount})
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-maroon hover:bg-blush-50"
                      >
                        <ShieldCheck size={14} />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left border-t border-blush-100"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="text-xs font-medium text-maroon hover:text-maroon-950 px-3 py-2"
              >
                Sign In
              </button>
            )}

            {/* Instagram Order CTA */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-maroon text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-maroon-950 transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <Image src="/images/instagram.png" alt="Instagram" width={18} height={18} className="object-contain" />
              Instagram Order
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/wishlist" className="p-1.5 text-maroon relative" aria-label="Wishlist">
              <Heart size={18} />
              {likesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-maroon text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {likesCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => router.push("/products")}
              className="p-1.5 text-maroon"
              aria-label="Search products"
            >
              <Search size={18} />
            </button>
            {!user && (
              <button
                onClick={() => openAuthModal("login")}
                className="text-xs font-medium text-maroon px-2 py-1"
              >
                Sign In
              </button>
            )}
            <button
              className="p-2 text-maroon"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
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
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search handmade gifts..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-blush-200 rounded-full focus:outline-none focus:border-maroon"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-maroon" />
              </div>
            </form>

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
              <li>
                <Link
                  href="/wishlist"
                  className="block py-3 border-b border-blush-200 text-xl font-medium text-maroon flex items-center justify-between"
                  style={{fontFamily:"'Playfair Display',serif"}}
                >
                  <span>My Wishlist</span>
                  {likesCount > 0 && (
                    <span className="bg-maroon text-white text-xs px-2.5 py-0.5 rounded-full font-sans">
                      {likesCount}
                    </span>
                  )}
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    href="/admin"
                    className="block py-3 border-b border-blush-200 text-xl font-semibold text-maroon"
                    style={{fontFamily:"'Playfair Display',serif"}}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>

            <div className="space-y-3 mt-auto">
              {user ? (
                <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-blush-200">
                  <div>
                    <p className="text-sm font-semibold text-maroon">{user.name}</p>
                    <p className="text-xs text-text-muted">{user.email}</p>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  className="w-full text-center py-3 text-maroon font-medium border border-maroon rounded-full"
                >
                  Sign In / Create Account
                </button>
              )}

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-maroon text-white text-base font-medium px-6 py-4 rounded-full"
              >
                <Image src="/images/instagram.png" alt="Instagram" width={20} height={20} className="rounded-full" />
                Instagram Order
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal />
    </>
  );
}
