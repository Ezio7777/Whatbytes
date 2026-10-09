"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, LayoutGrid, ShoppingCart, User } from "lucide-react";

interface ProfileMenuProps {
  cartCount: number;
  wishlistCount: number;
}

export function ProfileMenu({ cartCount, wishlistCount }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemClass =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-navy-ink transition-colors hover:bg-brand-soft";

  const items = [
    { href: "/wishlist", label: "Wishlist", Icon: Heart, count: wishlistCount },
    { href: "/cart", label: "Cart", Icon: ShoppingCart, count: cartCount },
    { href: "/", label: "All products", Icon: LayoutGrid, count: 0 },
  ];

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Profile menu"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition-all duration-200 hover:border-white hover:bg-white/25"
      >
        <User className="h-5 w-5" aria-hidden />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 origin-top-right rounded-xl bg-white p-1.5 shadow-card-hover ring-1 ring-brand/10"
          >
            <div className="flex items-center gap-3 border-b border-brand/10 px-3 pb-3 pt-2.5">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white"
              >
                <User className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy-ink">
                  Guest user
                </p>
                <p className="truncate text-xs text-navy-ink/60">
                  Browsing as guest
                </p>
              </div>
            </div>

            <div className="mt-1.5">
              {items.map(({ href, label, Icon, count }) => (
                <Link
                  key={href}
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={itemClass}
                >
                  <Icon className="h-[18px] w-[18px] text-brand" aria-hidden />
                  <span className="flex-1">{label}</span>
                  {count > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
