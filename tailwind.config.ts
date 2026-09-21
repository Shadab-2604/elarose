import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "var(--color-maroon, #5c0a29)",
          50: "var(--color-maroon-50, #fdf2f6)",
          100: "var(--color-maroon-100, #fce7ef)",
          200: "var(--color-maroon-200, #f9d0e1)",
          300: "#f4aac8",
          400: "#ec77a5",
          500: "#e04d84",
          600: "#cc2d64",
          700: "#a81f4d",
          800: "#8a1b41",
          900: "var(--color-maroon, #5c0a29)",
          950: "var(--color-maroon-dark, #38061a)",
        },
        blush: {
          DEFAULT: "var(--color-blush, #EBC7D2)",
          50: "var(--color-blush-light, #fdf5f7)",
          100: "var(--color-blush-100, #fceef3)",
          200: "var(--color-blush-200, #f8dde8)",
          300: "var(--color-blush, #EBC7D2)",
          400: "#dea8bc",
          500: "#cc85a0",
          600: "#b56282",
          700: "#9a4869",
          800: "#7d3655",
          900: "#5c2440",
        },
        ivory: {
          DEFAULT: "var(--color-ivory, #FFF8F8)",
          50: "#ffffff",
          100: "var(--color-ivory, #FFF8F8)",
          200: "#ffeef0",
          300: "#ffe0e4",
          400: "#ffcdd3",
          500: "#ffb3bc",
        },
        gold: {
          DEFAULT: "var(--color-gold, #C8A96B)",
          50: "#fdf9f0",
          100: "#f9f0db",
          200: "#f1dcb0",
          300: "#e5c47d",
          400: "var(--color-gold, #C8A96B)",
          500: "var(--color-gold, #C8A96B)",
          600: "#9a7640",
          700: "#7d5e35",
          800: "#634a2d",
          900: "#4f3b25",
        },
        text: {
          DEFAULT: "var(--color-text, #5c0a29)",
          muted: "var(--color-text-muted, #7a5c64)",
          light: "var(--color-text-light, #a68990)",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "ivory-gradient": "linear-gradient(135deg, var(--color-ivory) 0%, #ffeef0 50%, #fff3e8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
