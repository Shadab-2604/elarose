import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "ELAROSE — Luxury Handmade Gifting",
  description:
    "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting. Handcrafted with love. Pan India delivery.",
  keywords:
    "handmade gifts, luxury gifting, pipe cleaner bouquets, personalized keychains, gift hampers, custom gifts india",
  icons: {
    icon: "/images/logo.webp",
  },
  openGraph: {
    title: "ELAROSE — Luxury Handmade Gifting",
    description:
      "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting.",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "ELAROSE Luxury Handmade Gifts",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ivory text-text antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
