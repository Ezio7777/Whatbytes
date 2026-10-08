import { Suspense } from "react";
import { products } from "@/data/products";
import { ProductListing } from "@/components/product/ProductListing";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";

function ListingFallback() {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
      <div className="hidden h-[420px] animate-pulse rounded-card bg-brand/20 lg:block" />
      <div>
        <h1 className="text-3xl font-bold text-navy-ink md:text-[34px]">
          Product Listing
        </h1>
        <ProductGridSkeleton className="mt-8" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="container-page py-6 md:py-10">
      <Suspense fallback={<ListingFallback />}>
        <ProductListing products={products} />
      </Suspense>
    </div>
  );
}
