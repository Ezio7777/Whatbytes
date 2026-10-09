# Whatbytes Store

A responsive e-commerce storefront built for the Whatbytes frontend assignment. It has a filterable product listing, product detail pages, a persistent cart, and a lot of small animations.

**Live demo:** https://your-project.vercel.app

> Replace the link above with your real Vercel URL after deploying.

## Features

**Product listing (`/`)**
- Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Category filter and dual handle price range slider
- Search with string matching (debounced)
- Sort by price and rating
- Filters stored in the URL, for example `/?category=electronics&price=0-1000&q=phone&sort=price-desc`
- Empty state when nothing matches
- Mobile filter bottom sheet with drag to close

**Product detail (`/product/[id]`)**
- Dynamic routing with static generation for every product
- Image gallery with arrows, thumbnails and swipe
- Quantity selector, live total, add to cart
- Reviews section and related products
- Per product page title and meta description

**Cart (`/cart`)**
- Quantity update, remove with undo, clear cart
- Order summary with delivery rule and a coupon field (`SAVE10`, `WELCOME20`)
- Cart saved in localStorage and synced between tabs

**Extras**
- Wishlist (`/wishlist`) saved in localStorage
- Toast notifications, animated cart badge, page transitions
- Loading skeletons, custom 404 and error pages
- Keyboard and screen reader friendly controls, reduced motion support

## Tech stack

- Next.js 15 (App Router) and TypeScript
- Tailwind CSS
- Zustand with persist middleware for cart and wishlist
- Framer Motion for animations
- lucide-react for icons
- Product images from Unsplash through `next/image`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build
npm run typecheck  # TypeScript check
```

## Project structure

```
src/
  app/             routes: /, /product/[id], /cart, /wishlist, 404 and error pages
  components/
    layout/        header, footer, search bar, cart button
    filters/       category filter, price slider, sidebar and mobile drawer
    product/       card, grid, gallery, details, reviews, related products
    cart/          cart rows, order summary, cart view
    wishlist/      heart button and wishlist view
    ui/            reusable pieces (toast, stars, quantity selector, buttons)
  data/            mock products and sample reviews
  hooks/           URL filters, add to cart, debounce, hydration helpers
  lib/             filter logic, cart maths, constants, utils
  store/           Zustand stores for cart, wishlist and toasts
```

## Notes

- Filters use the URL as the single source of truth, so links can be shared and the back button works.
- Cart and wishlist are rendered after hydration, so there is no server and client mismatch.
- Checkout is not part of the assignment, so the checkout button only shows an info message.

## Deployment

The project is deployed on Vercel. To deploy your own copy, push the repo to GitHub, import it on https://vercel.com/new and keep the default Next.js settings. No environment variables are needed.
