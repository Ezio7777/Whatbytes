"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useCartCount } from "@/hooks/useCartCount";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { CartButton } from "./CartButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { query, setQuery } = useUrlFilters();
  const cartCount = useCartCount();

  // typing updates the URL after a short pause, URL changes flow back here
  const [value, setValue] = useState(query);
  const lastPushed = useRef(query);
  const debounced = useDebounce(value, 300);

  useEffect(() => {
    if (debounced === value && debounced !== query) {
      lastPushed.current = debounced;
      setQuery(debounced);
    }
  }, [debounced, value, query, setQuery]);

  useEffect(() => {
    if (query !== lastPushed.current) {
      lastPushed.current = query;
      setValue(query);
    }
  }, [query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-brand transition-shadow duration-300",
        scrolled ? "shadow-[0_6px_20px_rgba(11,42,91,0.25)]" : "shadow-none"
      )}
    >
      <div className="container-page grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 py-3 md:grid-cols-[1fr_minmax(0,2fr)_1fr] md:gap-x-8 md:py-4">
        <div className="md:justify-self-start">
          <Logo />
        </div>

        <div className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
          <SearchBar value={value} onChange={setValue} />
        </div>

        <div className="justify-self-end md:col-start-3 md:row-start-1">
          <CartButton count={cartCount} />
        </div>
      </div>
    </header>
  );
}
