# TANNOUR — Luxury Handcrafted Leather Goods

Demo e-commerce store for a Moroccan artisan leather brand — 3D product viewer, multi-language interface, wishlist, cart, and an admin dashboard. All client-side state (localStorage), no backend required.

**Live:** https://tannour.vercel.app/

## Pages

- `/` — Homepage: 3D hero, featured products, craft story, lookbook
- `/shop` — Product grid with category/price/search filters
- `/product/[id]` — Product detail with 3D viewer, color/size selectors, reviews
- `/craft` — Heritage storytelling page
- `/wishlist` — Saved products
- `/checkout` — Cart summary + mock order placement
- `/orders` — Order history (localStorage)
- `/faq` — Animated accordion
- `/contact` — Form + OpenStreetMap + social links
- `/admin` — Dashboard with revenue/orders charts, order table, inventory grid

## Features

- **Multi-language** — English, French, Arabic (RTL). Language switcher in navbar, persists to localStorage
- **3D product viewer** — Three.js via `@react-three/fiber` + `drei`
- **Dark / light theme** toggle with persistent preference
- **Cart + wishlist** — full state managed via React Context + localStorage
- **Toast notifications, quick-view modal, star ratings, recently viewed**
- **Social proof toasts, dismissible announcement bar, cookie consent**
- **Admin dashboard** with Recharts (revenue area chart, orders bar chart, inventory table)
- **SEO** — sitemap.ts, robots.ts, Organization + Product JSON-LD

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with dark mode class strategy
- **3D:** Three.js (`@react-three/fiber` 8, `@react-three/drei` 9)
- **Animation:** Framer Motion
- **Charts:** Recharts (admin only)
- **Fonts:** Cormorant Garamond (serif) + Inter (sans)
- **Hosting:** Vercel

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:4000

## Project structure

```
tannour-artisan/
├── src/app/
│   ├── shop/          # product listing
│   ├── product/[id]/  # product detail with 3D viewer
│   ├── checkout/      # cart + mock checkout
│   ├── orders/
│   ├── wishlist/
│   ├── craft/         # heritage story
│   ├── contact/
│   ├── faq/
│   ├── admin/         # dashboard with charts
│   ├── layout.tsx
│   └── page.tsx
├── src/components/
│   └── admin/         # chart components
├── src/lib/
│   ├── products.ts    # 12 products defined here
│   └── translations/  # en.ts, fr.ts, ar.ts
└── public/
```

## About

Built by [Ayoub Khyat](https://github.com/AyoubKhyat) — full-stack developer, Marrakech.

For custom e-commerce work, 3D product visualization, or admin dashboards, contact via [Ibda3 Digital](https://ibda3-digital.vercel.app/) or [Fiverr](https://www.fiverr.com/ayoubkhyat).
