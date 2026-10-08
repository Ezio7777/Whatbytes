"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_FILTERS,
  buildQueryString,
  parseFilters,
  type FilterValues,
} from "@/lib/filterParams";

/**
 * URL is the single source of truth for filters, so links can be shared
 * and the back button works. Updating from any page sends you to "/".
 */
export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const apply = useCallback(
    (patch: Partial<FilterValues>, mode: "push" | "replace" = "replace") => {
      const base =
        pathname === "/"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();
      const qs = buildQueryString(base, patch);
      router[mode](qs ? `/?${qs}` : "/", { scroll: false });
    },
    [pathname, router]
  );

  const activeCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
    filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]
      ? 1
      : 0) +
    (filters.query.trim() ? 1 : 0);

  return {
    ...filters,
    activeCount,
    setCategory: (category: FilterValues["category"]) =>
      apply({ category }, "push"),
    setPriceRange: (priceRange: FilterValues["priceRange"]) =>
      apply({ priceRange }),
    setQuery: (query: string) => apply({ query }),
    setSort: (sort: FilterValues["sort"]) => apply({ sort }, "push"),
    reset: () =>
      apply(
        {
          category: DEFAULT_FILTERS.category,
          priceRange: DEFAULT_FILTERS.priceRange,
          query: "",
        },
        "push"
      ),
  };
}
