import { brandSlug } from "@/lib/brands";
import type { SortKey } from "@/lib/filterParams";
import type { Category, Product } from "@/types/product";

export interface ProductFilters {
  category: Category | "all";
  priceRange: [number, number];
  brands: string[];
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
    if (
      filters.brands.length > 0 &&
      !filters.brands.includes(brandSlug(product.brand))
    ) {
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

export function sortProducts(products: Product[], sort: SortKey) {
  if (sort === "featured") return products;
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
}
