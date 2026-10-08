"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { FilterPanel } from "./FilterPanel";

export function FilterSidebar() {
  const [open, setOpen] = useState(false);
  const { activeCount } = useUrlFilters();

  return (
    <>
      {/* mobile and tablet: collapsible */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex h-11 w-full items-center justify-between rounded-lg bg-brand px-4 font-semibold text-white shadow-card"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-brand">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                <FilterPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <FilterPanel />
        </div>
      </aside>
    </>
  );
}
