"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortKey } from "@/lib/filterParams";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-navy-ink/70">
      <span className="hidden sm:inline">Sort by</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="h-10 cursor-pointer appearance-none rounded-lg border border-brand/20 bg-white pl-3 pr-9 text-sm font-medium text-navy-ink shadow-card transition-all hover:border-brand/50 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand"
          aria-hidden
        />
      </span>
    </label>
  );
}
