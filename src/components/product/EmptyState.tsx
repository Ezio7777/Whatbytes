"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center rounded-card bg-white px-6 py-16 text-center shadow-card"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
        <SearchX className="h-8 w-8" aria-hidden />
      </span>
      <h2 className="mt-5 text-xl font-semibold text-navy-ink">
        No products found
      </h2>
      <p className="mt-1.5 max-w-sm text-[15px] text-navy-ink/70">
        Nothing matches your search and filters. Try a different keyword or
        widen the price range.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 h-10 rounded-lg bg-brand px-5 font-semibold text-white hover:bg-brand-dark"
      >
        Clear all filters
      </button>
    </motion.div>
  );
}
