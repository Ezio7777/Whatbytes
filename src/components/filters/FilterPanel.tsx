"use client";

import { RotateCcw } from "lucide-react";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { CategoryFilter } from "./CategoryFilter";
import { PriceRangeSlider } from "./PriceRangeSlider";

export function FilterPanel() {
  const { reset, activeCount } = useUrlFilters();

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
