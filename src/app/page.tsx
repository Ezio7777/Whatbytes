import { products } from "@/data/products";

export default function HomePage() {
  return (
    <section className="container-page py-8 md:py-10">
      <h1 className="text-3xl font-bold text-navy-ink md:text-[34px]">
        Product Listing
      </h1>
      <p className="mt-2 text-navy-ink/70">
        {products.length} products available. Product grid comes in the next
        stage.
      </p>
    </section>
  );
}
