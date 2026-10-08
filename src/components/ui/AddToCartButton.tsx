"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  onAdd?: () => void;
  size?: "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function AddToCartButton({
  onAdd,
  size = "md",
  disabled,
  className,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  const handleClick = () => {
    onAdd?.();
    setAdded(true);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-lg font-semibold text-white shadow-sm",
        "transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        added ? "bg-emerald-600" : "bg-brand hover:bg-brand-dark",
        size === "md" ? "h-10 px-4 text-[15px]" : "h-12 px-8 text-lg",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5"
          >
            <Check className="h-4 w-4" aria-hidden /> Added
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
