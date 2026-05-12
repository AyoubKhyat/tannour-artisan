# TANNOUR — Artisan Leather E-Commerce

## Overview
Luxury e-commerce website for a Marrakshi leather goods shop. Mock/demo site — no real backend, all data is client-side.

## Stack
- **Next.js 14** (App Router, `'use client'` throughout)
- **Tailwind CSS** with `darkMode: "class"`, semantic CSS variable tokens in `globals.css`
- **Three.js** via `@react-three/fiber@8` + `@react-three/drei@9` (3D product viewer)
- **Framer Motion** (animations, page transitions, scroll effects)
- **Recharts** (admin dashboard charts)
- Standard ease curve: `[0.22, 1, 0.36, 1]`
- Fonts: `Cormorant_Garamond` (serif) + `Inter` (sans) via `next/font/google`

## Architecture

### State Management (React Context)
All providers wrapped in `ClientLayout.tsx` in this order:
`I18nProvider > ThemeProvider > CartProvider > WishlistProvider > ToastProvider > QuickViewProvider`

### Key Directories
```
src/lib/          — Context providers, data, utilities
src/lib/translations/ — en.ts, fr.ts, ar.ts
src/components/   — Shared components
src/components/admin/ — Admin dashboard chart components
src/app/          — Next.js App Router pages
```

### Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage: 3D hero, featured products, craft story, lookbook, scroll counter |
| `/shop` | Product grid with category/price/search filters |
| `/product/[id]` | Product detail: 3D viewer, color/size selectors, reviews, related |
| `/craft` | Heritage storytelling page |
| `/contact` | Contact form + OpenStreetMap + social links |
| `/wishlist` | Saved products grid |
| `/checkout` | Cart summary + mock order placement |
| `/orders` | Order history from localStorage |
| `/faq` | Animated accordion FAQ |
| `/admin` | Dashboard: revenue/orders charts, order table, inventory grid |
| `/not-found` | Custom 404 "Lost in the Medina" |

### Products
12 products defined in `src/lib/products.ts` — bags, wallets, belts, accessories. Each has: `id`, `nameFr`, `nameDarija`, `category`, `price` (MAD), `description`, `colors[]`, `sizes[]`, `featured`.

### Features Implemented
- Dark/light theme toggle
- i18n: EN/FR/AR with RTL support, language switcher in navbar
- Cart drawer with quantities
- Wishlist with localStorage persistence
- Toast notification system
- Product quick view modal
- Star ratings + mock review system (deterministic per product)
- Recently viewed (sessionStorage, max 8)
- Back-to-top button
- Navigation progress bar (NProgress-style)
- Scroll progress indicator
- Scroll counter (animated stats)
- Magnetic button hover effects
- Custom cursor (desktop only)
- Cookie consent banner
- Dismissible announcement bar
- Social proof toasts ("Someone in X purchased Y")
- Newsletter signup in footer
- Page transition animations
- Admin dashboard with Recharts (revenue area chart, orders bar chart)
- SEO: sitemap.ts, robots.ts, Organization + Product JSON-LD

### Persistence
- `localStorage`: locale, theme, wishlist, cart, orders, cookie consent
- `sessionStorage`: recently viewed, announcement dismissed, social proof dismissed

### CSS Variables (in globals.css)
Light/dark tokens: `--surface`, `--card`, `--text`, `--text-muted`, `--text-faint`, `--accent`, `--border`, `--border-strong`, `--nav-bg`, `--hero-overlay`

### Conventions
- Components use `dynamic()` with `ssr: false` for heavy client-only code
- Hydration-safe pattern: initialize state to default, read storage in useEffect
- `product.nameFr` is the display name, `product.nameDarija` is Arabic script
- Dev server runs on port 4000
- Deploy target: Vercel
- Remote: `github.com:AyoubKhyat/tannour-artisan.git` (branch: master)
