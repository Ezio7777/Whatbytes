import { products } from "@/data/products";
import { ProductListing } from "@/components/product/ProductListing";

export default function HomePage() {
  return (
    <div className="container-page py-6 md:py-10">
      <ProductListing products={products} />
    </div>
  );
}
