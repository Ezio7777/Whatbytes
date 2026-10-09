"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/store/cartStore";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const button = cn(
    "flex items-center justify-center text-brand transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:text-navy-ink/25 disabled:hover:bg-transparent",
    size === "md" ? "h-11 w-11" : "h-9 w-9"
  );

  return (
    <div
      role="group"
      aria-label="Quantity"
      className={cn(
        "inline-flex items-center overflow-hidden rounded-lg border border-brand/25 bg-white",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={button}
      >
        <Minus className="h-4 w-4" />
      </button>

      <span
        aria-live="polite"
        className={cn(
          "relative flex items-center justify-center overflow-hidden text-center font-semibold tabular-nums text-navy-ink",
          size === "md" ? "h-11 w-12" : "h-9 w-10 text-sm"
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={button}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
