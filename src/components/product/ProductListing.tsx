"use client";

import { useMemo } from "react";
import type { Product } from "@/types/product";
import { filterProducts, sortProducts } from "@/lib/filterProducts";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";
import { SortSelect } from "./SortSelect";

export function ProductListing({ products }: { products: Product[] }) {
  const { category, priceRange, query, sort, setSort, reset } = useUrlFilters();

  const visible = useMemo(
    () =>
      sortProducts(
        filterProducts(products, { category, priceRange, query }),
        sort
      ),
    [products, category, priceRange, query, sort]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
      <FilterSidebar />

      <section aria-labelledby="listing-title">
        <h1
          id="listing-title"
          className="text-3xl font-bold text-navy-ink md:text-[34px]"
        >
          Product Listing
        </h1>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm text-navy-ink/60" aria-live="polite">
            {visible.length} {visible.length === 1 ? "product" : "products"}
          </p>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <div className="mt-4">
          {visible.length > 0 ? (
            <ProductGrid products={visible} />
          ) : (
            <EmptyState onReset={reset} />
          )}
        </div>
      </section>
    </div>
  );
}
