import Link from "next/link";

const WHATSAPP_NUMBER = "919876543210";
const WHATSAPP_MSG = "Hi, I want to place an order.";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <footer className="bg-white border-t border-blush-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-maroon flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-base leading-none" style={{fontFamily:"'Playfair Display',serif"}}>E</span>
              </div>
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
                href="https://instagram.com/elarose.gifts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blush-100 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blush-100 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.12 1.523 5.855L0 24l6.335-1.497A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.497-5.19-1.367l-.37-.22-3.833.905.957-3.735-.241-.384A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
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
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.12 1.523 5.855L0 24l6.335-1.497A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.497-5.19-1.367l-.37-.22-3.833.905.957-3.735-.241-.384A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-maroon flex-shrink-0">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                @elarose.gifts
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
