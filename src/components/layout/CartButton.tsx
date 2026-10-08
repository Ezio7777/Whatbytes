"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  count?: number;
}

export function CartButton({ count = 0 }: CartButtonProps) {
  // wiggle the icon only when something gets added
  const previous = useRef(count);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    if (count > previous.current) setBump((b) => b + 1);
    previous.current = count;
  }, [count]);

  return (
    <motion.div whileTap={{ scale: 0.95 }} className="relative">
      <Link
        href="/cart"
        aria-label={`Cart${count ? `, ${count} items` : ""}`}
        className="flex h-11 items-center gap-2 rounded-lg bg-navy-deep px-4 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy hover:shadow-md sm:px-5"
      >
        <motion.span
          key={bump}
          animate={bump > 0 ? { rotate: [0, -16, 14, -8, 0] } : undefined}
          transition={{ duration: 0.5 }}
          className="flex"
        >
          <ShoppingCart className="h-[18px] w-[18px]" aria-hidden />
        </motion.span>
        <span>Cart</span>
      </Link>

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-brand shadow"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
