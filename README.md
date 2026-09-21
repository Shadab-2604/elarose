# ELAROSE — Luxury Handmade Gifts & E-Commerce Platform

ELAROSE is a luxury e-commerce storefront and atelier management platform specializing in handcrafted pipe cleaner floral arrangements, personalized keychains, bespoke luxury hampers, and customized keepsake gifts.

---

## 🌹 Business Overview

ELAROSE provides an end-to-end digital commerce solution engineered for high-end artisanal gifting. The platform connects consumers seeking unique, everlasting handcrafted floral arrangements with an integrated inventory and store management suite.

### Key Product Categories
- **Flower Pots**: Everlasting handcrafted floral arrangements housed in decorative ceramic and rustic pots.
- **Personalized Keychains**: Hand-detailed floral and pearl charm accessories designed for everyday luxury.
- **Luxury Hampers**: Curated gift boxes featuring velvet ribbons, scented accents, and custom greeting cards.
- **Custom Creations**: Bespoke monogrammed floral boxes and custom-ordered keepsakes tailored for specific recipients.
- **Flower Bouquets & Home Decor**: Artisanal wall hangings and bridal bouquet arrangements.

---

## 🛒 Storefront Features

### 1. Dynamic Catalog Filtering & Search
- **Instant Product Search**: Real-time keyword filtering across title, description, and category attributes.
- **Dynamic Category Pills**: Dynamic category buttons derived automatically from active inventory and custom additions.
- **Expandable Arrow Controls**: Adaptive sidebar navigation equipped with `+ N More ▾` / `Show Less ▴` arrow toggles for streamlined category and occasion exploration.
- **Occasion-Based Discovery**: Dedicated filters for Birthdays, Weddings, Anniversaries, Housewarmings, and Special Surprises.

### 2. Interactive Product Experience
- **Quick-View Modal**: Instant modal popups for detailed product specifications, material details, and customization options.
- **URL Deep-Linking**: Direct query link support (`/products?category=hampers` or `/products?occasion=Birthday`) for seamless marketing campaigns.

---

## ⚙️ Administration & Inventory Management Portal

Access the admin dashboard at `/admin` to manage catalog inventory, store branding, and home page merchandising in real time.

### Core Admin Capabilities
- **Inventory & Product Control**: Full CRUD operations for products including title, price, descriptions, high-resolution imagery, and best-seller flags.
- **Dynamic Category Management**: Create custom product categories on the fly with automatic site-wide filter propagation.
- **5-Aesthetic Theme Switcher**: 1-click site-wide color palette customizer featuring Rose Atelier, Dusty Rose & Mauve, Pastel Lavender, Peach Blossom, and Champagne Silk presets.
- **Content & Banner Merchandising**: Inline visual management for Hero Banners, Signature Packaging showcases, Trust Points, and Instagram Feed integrations.

---

## 🛠️ Technical Stack & Architecture

- **Frontend**: Next.js 16 (App Router), React 19, TailwindCSS, Framer Motion.
- **Backend & API**: Next.js Server Routes, MongoDB with Mongoose ODM, JWT Authentication.
- **Assets & Storage**: Optimized Next.js Image Component, Local & Cloud Asset Handlers.

---

## 🚀 Operations & Deployment Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB Database Connection String

### Environment Setup
Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/elarose
JWT_SECRET=your_secure_jwt_secret_key
ADMIN_EMAIL=admin@elarose.com
ADMIN_PASSWORD=your_secure_admin_password
```

### Installation & Execution

```bash
# Install dependencies
npm install

# Run localized development server
npm run dev

# Execute production build verification
cmd /c npm run build

# Start production server
npm run start
```

---

## 📋 Commercial Quality Assurance

- **Unique Component Identity**: Clean keying across dynamic rendering lists preventing DOM re-render glitches.
- **Graceful API Fallbacks**: Autonomous fallback to initial JSON datasets ensuring 100% storefront uptime during maintenance window API reconnects.
