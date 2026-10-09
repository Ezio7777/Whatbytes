"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

export function WishlistLink({ count = 0 }: { count?: number }) {
  return (
    <motion.div whileTap={{ scale: 0.92 }} className="relative">
      <Link
        href="/wishlist"
        title="Wishlist"
        aria-label={`Wishlist${count ? `, ${count} saved` : ""}`}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/40 text-white transition-all duration-200 hover:border-white hover:bg-white/10"
      >
        <Heart
          className={count > 0 ? "h-[18px] w-[18px] fill-current" : "h-[18px] w-[18px]"}
          aria-hidden
        />
      </Link>

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-rose-500 shadow"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
