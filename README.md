# Whatbytes Store

A responsive online store built with Next.js for the Whatbytes frontend assignment. You can browse products, filter and search them, open a product page, and manage a cart that stays saved even after refresh.

## Live demo

**https://whatbytes-ten-nu.vercel.app/**

## What you can do

- Browse 10 products in a clean grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Filter by category, price range and brand
- Search products by name, brand or category
- Sort by price or rating
- Open any product to see its gallery, details, reviews and related products
- Add items to the cart, change quantity right from the product card, and remove items
- Save products to a wishlist
- Use it comfortably on phone, tablet and desktop

## Assignment checklist

**Home page (`/`)**

- [x] Header with logo, search bar, cart button with badge, and profile avatar
- [x] Sidebar with category filter, price range slider and brand filter
- [x] Product grid with image, title, price, rating stars and Add to Cart button
- [x] Footer with copyright text and social icons

**Product page (`/product/[id]`)**

- [x] Image carousel
- [x] Title, price, description and category
- [x] Quantity selector and Add to Cart button
- [x] Reviews section

**Cart page (`/cart`)**

- [x] List of added products
- [x] Quantity update and remove item
- [x] Price summary

**Logic**

- [x] Category and price filtering
- [x] Search with string matching
- [x] URL based filters
- [x] Cart state with Zustand
- [x] Dynamic routing for product pages
- [x] Message when no products are found
- [x] Cart saved in localStorage

## Extra features

- Wishlist page with heart button on every product (saved in localStorage)
- Quantity stepper on product cards: after adding, the button turns into `-  1  +`
- Profile menu in the header with quick links
- Brand filter with multiple selection
- Mobile filter drawer that slides up from the bottom
- Toast messages for add to cart, remove, and wishlist, with an Undo button where it makes sense
- Confirmation pop up before clearing the cart
- Coupon codes in the cart: `SAVE10` (10% off) and `WELCOME20` (20% off)
- Free delivery above $100, with a progress bar in the cart
- Smooth page transitions and animations using Framer Motion
- Loading skeletons, custom 404 page and error page
- Cart syncs between browser tabs
- Keyboard friendly, with reduced motion support

## URL filters

Filters live in the URL, so any filtered page can be shared or bookmarked, and the browser back button works.

| Filter | Example |
| --- | --- |
| Category | `/?category=electronics` |
| Price range | `/?price=0-500` |
| Brand | `/?brand=sonic,pulse` |
| Search | `/?q=phone` |
| Sort | `/?sort=price-desc` |
| All together | `/?category=electronics&price=0-1000&brand=sonic,pulse&q=watch&sort=rating` |

Sort values: `price-asc`, `price-desc`, `rating`.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Product listing with filters |
| `/product/[id]` | Product details (ids 1 to 10) |
| `/cart` | Shopping cart |
| `/wishlist` | Saved products |

## Tech stack

| Tool | Used for |
| --- | --- |
| Next.js 15 (App Router) | Routing and static pages |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Cart, wishlist and toast state |
| Framer Motion | Animations |
| lucide-react | Icons |
| Unsplash | Product images |

## Run it locally

You need Node.js 18.18 or newer.

```bash
git clone https://github.com/Ezio7777/Whatbytes.git
cd Whatbytes
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Other commands:

```bash
npm run build      # create a production build
npm run start      # run the production build
npm run typecheck  # check TypeScript types
```

## Project structure

```
src/
  app/              pages: home, product, cart, wishlist, 404 and error
  components/
    layout/         header, footer, logo, search bar, cart button, profile menu
    filters/        category, price slider, brand filter, sidebar and mobile drawer
    product/        product card, grid, gallery, details, reviews, related products
    cart/           cart rows, order summary, cart page view
    wishlist/       heart button and wishlist view
    ui/             shared pieces like toast, stars, quantity selector, confirm dialog
  data/             product data and sample reviews
  hooks/            URL filters, debounce, add to cart, hydration helpers
  lib/              filter logic, cart calculations, constants, helpers
  store/            Zustand stores for cart, wishlist and toasts
```

## How it works

- **Filters:** the URL is the single source of truth. Helper functions in `lib/filterParams.ts` read and write the URL, and `lib/filterProducts.ts` does the actual filtering and sorting.
- **Cart:** stored in Zustand and saved to localStorage under the key `whatbytes-cart`. The cart only keeps product ids and quantities, and prices come from the product data, so totals are always correct.
- **No hydration errors:** things that depend on localStorage (cart badge, cart page, wishlist) render after the page loads in the browser, so the server and browser HTML always match.
- **Product pages:** generated at build time using `generateStaticParams`, and each one gets its own title and description for SEO.
- **Images:** loaded with `next/image`. If an image link breaks, a simple placeholder icon is shown instead.

## Notes

- Product data and reviews are sample data written for this assignment.
- Checkout is not part of the assignment, so the checkout button only shows a message.
- The design had two filter panels, and the second one looked like a mockup glitch (it even had a typo in the heading), so only the blue Filters panel is built.

## Deployment

The project is deployed on Vercel. To deploy your own copy, push the code to GitHub, import the repo at https://vercel.com/new, and keep the default settings. No environment variables are needed.
