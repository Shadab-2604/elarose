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
          DEFAULT: "#5B0F2D",
          50: "#fdf2f6",
          100: "#fce7ef",
          200: "#f9d0e1",
          300: "#f4aac8",
          400: "#ec77a5",
          500: "#e04d84",
          600: "#cc2d64",
          700: "#a81f4d",
          800: "#8a1b41",
          900: "#5B0F2D",
          950: "#3d0920",
        },
        blush: {
          DEFAULT: "#EBC7D2",
          50: "#fdf5f7",
          100: "#fceef3",
          200: "#f8dde8",
          300: "#EBC7D2",
          400: "#dea8bc",
          500: "#cc85a0",
          600: "#b56282",
          700: "#9a4869",
          800: "#7d3655",
          900: "#5c2440",
        },
        ivory: {
          DEFAULT: "#FFF8F8",
          50: "#ffffff",
          100: "#FFF8F8",
          200: "#ffeef0",
          300: "#ffe0e4",
          400: "#ffcdd3",
          500: "#ffb3bc",
        },
        gold: {
          DEFAULT: "#C8A96B",
          50: "#fdf9f0",
          100: "#f9f0db",
          200: "#f1dcb0",
          300: "#e5c47d",
          400: "#C8A96B",
          500: "#b8924f",
          600: "#9a7640",
          700: "#7d5e35",
          800: "#634a2d",
          900: "#4f3b25",
        },
        text: {
          DEFAULT: "#2D1B20",
          muted: "#7a5c64",
          light: "#a68990",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "ivory-gradient": "linear-gradient(135deg, #FFF8F8 0%, #ffeef0 50%, #fff3e8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
