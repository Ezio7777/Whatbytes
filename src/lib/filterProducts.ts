import type { Category, Product } from "@/types/product";

export interface ProductFilters {
  category: Category | "all";
  priceRange: [number, number];
  query: string;
}

export function filterProducts(products: Product[], filters: ProductFilters) {
  const tokens = filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const [min, max] = filters.priceRange;

  return products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    if (product.price < min || product.price > max) {
      return false;
    }
    if (tokens.length > 0) {
      const haystack =
        `${product.title} ${product.brand} ${product.category}`.toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    }
    return true;
  });
}
