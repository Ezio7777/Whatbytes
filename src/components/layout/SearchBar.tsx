"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ className, value, onChange }: SearchBarProps) {
  const [internal, setInternal] = useState("");
  const current = value ?? internal;

  const update = (next: string) => {
    if (onChange) onChange(next);
    else setInternal(next);
  };

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={cn(
        "group flex h-11 w-full items-center gap-2.5 rounded-lg border border-white/40 bg-white/0 px-3.5 text-white",
        "transition-all duration-300 focus-within:border-white focus-within:bg-white/10 focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.18)]",
        "hover:border-white/70",
        className
      )}
    >
      <Search
        className="h-[18px] w-[18px] shrink-0 text-white/80 transition-transform duration-300 group-focus-within:scale-110"
        aria-hidden
      />
      <input
        type="search"
        value={current}
        onChange={(e) => update(e.target.value)}
        placeholder="Search for products..."
        aria-label="Search for products"
        className="h-full w-full bg-transparent text-[15px] text-white placeholder:text-white/80 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {current && (
        <button
          type="button"
          onClick={() => update("")}
          aria-label="Clear search"
          className="rounded-full p-1 text-white/80 hover:bg-white/15 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
