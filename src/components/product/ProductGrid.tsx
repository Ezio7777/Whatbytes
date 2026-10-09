"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
  /** use the normal card layout for every product (no wide featured card) */
  compact?: boolean;
}

export function ProductGrid({ products, className, compact }: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial>
        {products.map((product, index) => (
          <motion.li
            key={product.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              delay: Math.min(index, 8) * 0.04,
            }}
            className={product.featured && !compact ? "sm:col-span-2" : undefined}
          >
            <ProductCard product={product} priority={index < 3} compact={compact} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
