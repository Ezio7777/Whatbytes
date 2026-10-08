import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function HomePage() {
  return (
    <section className="container-page py-8 md:py-10">
      <h1 className="text-3xl font-bold text-navy-ink md:text-[34px]">
        Product Listing
      </h1>
      <ProductGrid products={products} className="mt-5" />
    </section>
  );
}
