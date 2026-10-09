"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useHydrated } from "@/hooks/useHydrated";
import { MAX_QUANTITY, useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

interface CartControlProps {
  product: Product;
  size?: "md" | "lg";
  className?: string;
}

/**
 * Add to Cart on a product card. After adding it flashes green, then turns
 * into a - / + stepper that stays in sync with the cart. Going below 1
 * removes the item and the Add to Cart button comes back.
 */
export function CartControl({ product, size = "md", className }: CartControlProps) {
  const hydrated = useHydrated();
  const stored = useCartStore(
    (s) => s.items.find((i) => i.id === product.id)?.quantity ?? 0
  );
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const addToCart = useAddToCart();
  const pushToast = useToastStore((s) => s.push);

  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(false), 900);
    return () => clearTimeout(timer);
  }, [flash]);

  const quantity = hydrated ? stored : 0;
  const mode = quantity === 0 ? "add" : flash ? "added" : "stepper";

  const handleAdd = () => {
    addToCart(product);
    setFlash(true);
  };

  const handleMinus = () => {
    if (quantity <= 1) {
      removeItem(product.id);
      pushToast({
        key: `remove-${product.id}`,
        title: "Removed from cart",
        description: product.title,
        image: product.image,
        actionLabel: "Undo",
        onAction: () => addItem(product.id, 1),
      });
      return;
    }
    decrement(product.id);
  };

  const height = size === "md" ? "h-10" : "h-12";
  const text = size === "md" ? "text-[15px]" : "text-lg";
  const fade = {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 },
    transition: { duration: 0.16 },
  };

  return (
    <div className={cn("relative", height, className)}>
      <AnimatePresence mode="wait" initial={false}>
        {mode === "stepper" ? (
          <motion.div
            key="stepper"
            {...fade}
            className={cn(
              "flex h-full w-full items-center justify-between overflow-hidden rounded-lg bg-brand text-white shadow-sm",
              text
            )}
          >
            <button
              type="button"
              onClick={handleMinus}
              aria-label={`Decrease quantity of ${product.title}`}
              className="flex h-full w-12 items-center justify-center transition-colors hover:bg-brand-dark active:bg-navy"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span
              aria-live="polite"
              className="relative flex h-full flex-1 items-center justify-center overflow-hidden font-semibold tabular-nums"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={quantity}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>
            </span>

            <button
              type="button"
              onClick={() => increment(product.id)}
              disabled={quantity >= MAX_QUANTITY}
              aria-label={`Increase quantity of ${product.title}`}
              className="flex h-full w-12 items-center justify-center transition-colors hover:bg-brand-dark active:bg-navy disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Plus className="h-4 w-4" />
            </button>
          </motion.div>
        ) : mode === "added" ? (
          <motion.div
            key="added"
            {...fade}
            className={cn(
              "flex h-full w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 font-semibold text-white shadow-sm",
              text
            )}
          >
            <Check className="h-4 w-4" aria-hidden /> Added
          </motion.div>
        ) : (
          <motion.button
            key="add"
            type="button"
            {...fade}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            disabled={!product.inStock}
            className={cn(
              "h-full w-full rounded-lg bg-brand font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50",
              text
            )}
          >
            Add to Cart
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
