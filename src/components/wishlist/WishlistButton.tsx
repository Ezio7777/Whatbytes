"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/useHydrated";
import { useToastStore } from "@/store/toastStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const hydrated = useHydrated();
  const saved = useWishlistStore((s) => s.ids.includes(product.id));
  const toggle = useWishlistStore((s) => s.toggle);
  const pushToast = useToastStore((s) => s.push);
  const active = hydrated && saved;

  const handleClick = () => {
    toggle(product.id);
    if (!saved) {
      pushToast({
        key: `wishlist-${product.id}`,
        title: "Saved to wishlist",
        description: product.title,
        image: product.image,
        href: "/wishlist",
        actionLabel: "View wishlist",
      });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-card backdrop-blur transition-colors hover:bg-white",
        active ? "text-rose-500" : "text-navy-ink/60 hover:text-rose-500",
        className
      )}
    >
      <motion.span
        key={String(active)}
        initial={active ? { scale: 0.4 } : false}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
        className="flex"
      >
        <Heart className={cn("h-[18px] w-[18px]", active && "fill-current")} aria-hidden />
      </motion.span>
    </motion.button>
  );
}
