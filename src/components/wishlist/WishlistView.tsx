"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { getProductById } from "@/data/products";
import type { Product } from "@/types/product";
import { useHydrated } from "@/hooks/useHydrated";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";

export function WishlistView() {
  const hydrated = useHydrated();
  const ids = useWishlistStore((s) => s.ids);

  const saved = useMemo(
    () =>
      ids
        .map((id) => getProductById(id))
        .filter((p): p is Product => Boolean(p)),
    [ids]
  );

  return (
    <div className="container-page py-6 md:py-10">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold text-navy-ink md:text-[34px]">
          Wishlist
        </h1>
        {hydrated && saved.length > 0 && (
          <p className="text-sm text-navy-ink/60">
            {saved.length} saved {saved.length === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      <div className="mt-6">
        {!hydrated ? (
          <ProductGridSkeleton count={3} />
        ) : saved.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center rounded-card bg-white px-6 py-20 text-center shadow-card"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <Heart className="h-10 w-10" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-bold text-navy-ink">
              Nothing saved yet
            </h2>
            <p className="mt-2 max-w-sm text-navy-ink/70">
              Tap the heart on any product to save it here for later.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex h-12 items-center rounded-lg bg-brand px-8 text-lg font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Browse products
            </Link>
          </motion.div>
        ) : (
          <ProductGrid products={saved} compact />
        )}
      </div>
    </div>
  );
}
