import Image from "next/image";
import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx";

export default function Footer() {
  const instagramUrl = INSTAGRAM_URL;

  return (
    <footer className="bg-white border-t border-blush-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/images/logo.webp" alt="ELAROSE Logo" width={40} height={40} className="object-contain flex-shrink-0" />
              <div className="leading-tight">
                <div className="font-semibold text-maroon text-base tracking-wide" style={{fontFamily:"'Playfair Display',serif"}}>ELAROSE</div>
                <div className="text-text-muted text-[10px] tracking-[0.15em] uppercase" style={{fontFamily:"'Cormorant Garamond',serif"}}>handmade luxury</div>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-5">
              A boutique atelier crafting heirloom-worthy gifts — bouquets that never wilt, hampers wrapped in love, and keepsakes you will keep forever.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-maroon hover:text-maroon transition-colors duration-300"
                aria-label="Instagram"
              >
                <Image src="/images/instagram.png" alt="Instagram" width={16} height={16} className="object-contain" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-maroon hover:text-maroon transition-colors duration-300"
                aria-label="Instagram"
              >
                <Image src="/images/instagram.png" alt="Instagram" width={16} height={16} className="object-contain" />
              </a>
              <a
                href="mailto:hello@elarose.in"
                className="w-9 h-9 rounded-full bg-blush-100 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-colors duration-300"
                aria-label="Email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="22,4 12,13 2,4"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-text font-semibold text-sm tracking-wider uppercase mb-5" style={{fontFamily:"'Poppins',sans-serif"}}>Explore</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted text-sm hover:text-maroon transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-text font-semibold text-sm tracking-wider uppercase mb-5" style={{fontFamily:"'Poppins',sans-serif"}}>Policies</h3>
            <ul className="space-y-3">
              {[
                { href: "/policies#shipping", label: "Shipping Policy" },
                { href: "/policies#refund", label: "Refund Policy" },
                { href: "/policies#privacy", label: "Privacy Policy" },
                { href: "/policies#cancellation", label: "Cancellation Policy" },
                { href: "/policies#terms", label: "Terms & Conditions" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted text-sm hover:text-maroon transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-text font-semibold text-sm tracking-wider uppercase mb-5" style={{fontFamily:"'Poppins',sans-serif"}}>Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-maroon flex-shrink-0">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"/>
                  <circle cx="17.5" cy="6.5" r="1"/>
                </svg>
                @elarose_atelier
              </li>
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-maroon flex-shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="22,4 12,13 2,4"/>
                </svg>
                hello@elarose.in
              </li>
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-maroon flex-shrink-0">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                Mon–Sat · 10:00 AM – 7:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blush-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-text-light text-xs">© 2026 ELAROSE. Handmade with love in India.</p>
          <p className="text-text-light text-xs italic" style={{fontFamily:"'Cormorant Garamond',serif"}}>
            Crafted for the moments you will never forget.
          </p>
        </div>
      </div>
    </footer>
  );
}
