"use client";

import { useId } from "react";
import { CATEGORY_OPTIONS } from "@/lib/constants";
import { useUrlFilters } from "@/hooks/useUrlFilters";

export function CategoryFilter() {
  const name = useId();
  const { category, setCategory } = useUrlFilters();

  return (
    <fieldset>
      <legend className="text-xl font-medium text-white">Category</legend>
      <div className="mt-3 flex flex-col gap-3">
        {CATEGORY_OPTIONS.map((option) => {
          const checked = category === option.value;
          return (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-3 text-[17px]"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => setCategory(option.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="h-5 w-5 shrink-0 rounded-full border-2 border-white/45 transition-all duration-200 group-hover:border-white/80 peer-checked:border-[6px] peer-checked:border-white peer-focus-visible:ring-2 peer-focus-visible:ring-white/70 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-brand"
              />
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
          );
        })}
      </div>
    </fieldset>
  );
}
