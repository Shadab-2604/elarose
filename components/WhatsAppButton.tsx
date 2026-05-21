"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const INSTAGRAM_URL = "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx";

export default function WhatsAppButton() {
  const url = INSTAGRAM_URL;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Instagram"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-maroon text-white flex items-center justify-center shadow-xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-maroon animate-ping opacity-30" />
      <Image src="/images/instagram.png" alt="Instagram" width={26} height={26} className="relative z-10 object-contain" />
    </motion.a>
  );
}
