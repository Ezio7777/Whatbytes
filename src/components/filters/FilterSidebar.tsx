"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { FilterDrawer } from "./FilterDrawer";
import { FilterPanel } from "./FilterPanel";

export function FilterSidebar({ resultCount }: { resultCount: number }) {
  const [open, setOpen] = useState(false);
  const { activeCount } = useUrlFilters();

  return (
    <>
      {/* mobile and tablet: button opens a bottom sheet */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand font-semibold text-white shadow-card transition-all hover:bg-brand-dark active:scale-[0.99]"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-brand">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        resultCount={resultCount}
      />

      {/* desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-card">
          <FilterPanel />
        </div>
      </aside>
    </>
  );
}
