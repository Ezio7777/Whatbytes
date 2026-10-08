import { products } from "@/data/products";

export default function HomePage() {
  return (
    <main className="container-page py-16">
      <h1 className="text-3xl font-bold text-navy-ink">Whatbytes Store</h1>
      <p className="mt-2 text-navy-ink/70">
        Project setup done. {products.length} products loaded from mock data.
      </p>
    </main>
  );
}
