# 🛋️ Nordic Living — Minimalist E-Commerce Platform

A minimalist, high-performance e‑commerce storefront inspired by Scandinavian design — built with React, TypeScript, Vite and Tailwind for pixel-perfect responsive UI and production-ready developer ergonomics.

[![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State-black?style=flat-square&logo=zustand)](https://github.com/pmndrs/zustand)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

---

## 🔗 Links

- Live Demo: https://nordic-living-ecommerce.vercel.app/
- Repository: https://github.com/ms0237575-pixel/nordic-living-ecommerce

---

## 🧭 Overview & Features

Nordic Living is a complete sample storefront showcasing a production-minded React app with a polished, accessible UI and an admin area for store management.

- Dynamic Cart & Wishlist with persisted state and real-time updates (Zustand + localStorage).
- Pixel-perfect responsive design: mobile → tablet → desktop layouts tuned for touch and desktop workflows.
- Lightweight global state management using Zustand for predictable, minimal boilerplate state logic.
- Fully functional Admin Dashboard for inventory, orders, and store metrics — mobile friendly and responsive.
- Accessible components and UX decisions focused on high Lighthouse scores and low CLS.
- Seamless dev experience via Vite, modular UI primitives, embla product carousel, and toast notifications.

---

## 🚀 Performance (Lighthouse)

- 🟢 Accessibility: 100 / 100
- 🟢 Best Practices: 100 / 100
- 🟢 SEO: 100 / 100
- 🟢 Performance: 90+ (optimized LCP, low CLS)

---

## ⚙️ Getting Started

Prerequisites: Node.js (LTS recommended) and `pnpm` installed.

Clone, install, and run locally:

```bash
git clone https://github.com/ms0237575-pixel/nordic-living-ecommerce.git
cd nordic-living-ecommerce
pnpm install
pnpm dev
# open http://localhost:5173 (or the port printed by Vite)

src/
├── App.tsx                      # Main app + routes
├── main.tsx
├── components/
│   ├── cart/
│   │   └── CartItem.tsx
│   ├── home/
│   │   └── HeroSection.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchOverlay.tsx
│   │   └── ProtectedRoute.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductCardSkeleton.tsx
│   │   └── ProductCarousel.tsx
│   ├── search/
│   │   ├── Filters.tsx
│   │   └── Search.tsx
│   └── ui/
│       ├── button.tsx
│       └── sheet.tsx
├── pages/
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       ├── AdminOrders.tsx
│       └── AdminProducts.tsx
├── store/                        # Zustand stores (cart, auth, orders, wishlist, products)
│   ├── useAuthStore.ts
│   ├── useCartStore.ts
│   ├── useOrderStore.ts
│   └── useProductStore.ts
├── data/                         # Mock/static product data
├── hooks/                        # Custom hooks
├── lib/                          # Utilities (authStorage, utils)
└── types/                        # TypeScript types


🛠Tech Stack
React 18 + TypeScript
Vite (development + build)
Tailwind CSS (utility-first styling)
Zustand (state management)
react-router (routing)
lucide-react (icons), sonner (toasts), Embla (carousel)
Deployment: Vercel (recommended)

👨‍💻 Developer
Mohamed Ahmed Ali Ahmed Saif El Deen
Front‑End Developer | Computer Science, El Shorouk Academy
New Cairo, Egypt

Repository: https://github.com/ms0237575-pixel/nordic-living-ecommerce
Live demo: https://nordic-living-ecommerce.vercel.app/
```
