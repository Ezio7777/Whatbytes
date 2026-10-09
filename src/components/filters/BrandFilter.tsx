"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { brandsForCategory } from "@/lib/brands";
import { cn } from "@/lib/utils";
import { useUrlFilters } from "@/hooks/useUrlFilters";

const VISIBLE_COUNT = 5;

export function BrandFilter() {
  const idPrefix = useId();
  const { category, brands, toggleBrand } = useUrlFilters();
  const [expanded, setExpanded] = useState(false);

  const options = brandsForCategory(category);
  const canCollapse = options.length > VISIBLE_COUNT;
  // selected brands always stay visible, even when the list is collapsed
  const shown =
    expanded || !canCollapse
      ? options
      : options.filter((b, i) => i < VISIBLE_COUNT || brands.includes(b.slug));

  return (
    <fieldset>
      <legend className="text-xl font-medium text-white">Brand</legend>

      <ul className="mt-2">
        <AnimatePresence initial={false}>
          {shown.map((option) => {
            const checked = brands.includes(option.slug);
            const id = `${idPrefix}-${option.slug}`;
            return (
              <motion.li
                key={option.slug}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <label
                  htmlFor={id}
                  className="group flex cursor-pointer items-center gap-3 py-1.5 text-[17px]"
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleBrand(option.slug)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 transition-all duration-200",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-white/70 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-brand",
                      checked
                        ? "border-white bg-white"
                        : "border-white/45 group-hover:border-white/80"
                    )}
                  >
                    <AnimatePresence>
                      {checked && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 600, damping: 22 }}
                          className="flex"
                        >
                          <Check className="h-3.5 w-3.5 text-brand" strokeWidth={3.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span
                    className={
                      checked
                        ? "font-semibold text-white"
                        : "text-white/85 transition-colors group-hover:text-white"
                    }
                  >
                    {option.label}
                  </span>
                </label>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {canCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-1 flex items-center gap-1 rounded-md py-1 text-sm font-medium text-white/90 hover:text-white"
        >
          {expanded ? "Show less" : `Show all ${options.length}`}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              expanded && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      )}
    </fieldset>
  );
}
