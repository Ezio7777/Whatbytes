"use client";

import { useMemo } from "react";
import type { Product } from "@/types/product";
import { filterProducts } from "@/lib/filterProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilterStore } from "@/store/filterStore";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";

export function ProductListing({ products }: { products: Product[] }) {
  const category = useFilterStore((s) => s.category);
  const priceRange = useFilterStore((s) => s.priceRange);
  const query = useFilterStore((s) => s.query);
  const reset = useFilterStore((s) => s.reset);

  const debouncedQuery = useDebounce(query, 250);

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        category,
        priceRange,
        query: debouncedQuery,
      }),
    [products, category, priceRange, debouncedQuery]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
      <FilterSidebar />

      <section aria-labelledby="listing-title">
        <div className="flex items-baseline justify-between gap-4">
          <h1
            id="listing-title"
            className="text-3xl font-bold text-navy-ink md:text-[34px]"
          >
            Product Listing
          </h1>
          <p className="text-sm text-navy-ink/60" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="mt-5">
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <EmptyState onReset={reset} />
          )}
        </div>
      </section>
    </div>
  );
}
