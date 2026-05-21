"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PolicyItem {
  id: string;
  title: string;
  content: string[];
}

export default function PolicyAccordion({ items }: { items: PolicyItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          id={item.id}
          className="bg-white border border-blush-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="w-full flex items-center justify-between px-6 py-4 text-left group"
            aria-expanded={open === item.id}
          >
            <span className="font-medium text-maroon text-base" style={{fontFamily:"'Playfair Display',serif"}}>
              {item.title}
            </span>
            <motion.span
              animate={{ rotate: open === item.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-text-muted ml-4 flex-shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 border-t border-blush-100">
                  <ul className="mt-4 space-y-2">
                    {item.content.map((para, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                        <p className="text-text-muted text-sm leading-relaxed">{para}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
