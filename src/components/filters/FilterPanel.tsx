"use client";

import { RotateCcw } from "lucide-react";
import { DEFAULT_PRICE_RANGE, useFilterStore } from "@/store/filterStore";
import { CategoryFilter } from "./CategoryFilter";
import { PriceRangeSlider } from "./PriceRangeSlider";

export function useActiveFilterCount() {
  const category = useFilterStore((s) => s.category);
  const priceRange = useFilterStore((s) => s.priceRange);
  const query = useFilterStore((s) => s.query);

  let count = 0;
  if (category !== "all") count += 1;
  if (
    priceRange[0] !== DEFAULT_PRICE_RANGE[0] ||
    priceRange[1] !== DEFAULT_PRICE_RANGE[1]
  )
    count += 1;
  if (query.trim()) count += 1;
  return count;
}

export function FilterPanel() {
  const reset = useFilterStore((s) => s.reset);
  const activeCount = useActiveFilterCount();

  return (
    <div className="rounded-card bg-brand p-5 text-white shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Filters</h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-white/90 hover:bg-white/15 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Clear
          </button>
        )}
      </div>

      <div className="mt-5 space-y-7">
        <CategoryFilter />
        <PriceRangeSlider />
      </div>
    </div>
  );
}
