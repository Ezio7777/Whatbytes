import { products } from "@/data/products";
import type { Category } from "@/types/product";

export interface BrandOption {
  slug: string;
  label: string;
  categories: Category[];
}

export const brandSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** every brand found in the product data, with the categories it sells in */
export const BRAND_OPTIONS: BrandOption[] = (() => {
  const map = new Map<string, BrandOption>();
  for (const product of products) {
    const slug = brandSlug(product.brand);
    const existing = map.get(slug);
    if (existing) {
      if (!existing.categories.includes(product.category)) {
        existing.categories.push(product.category);
      }
    } else {
      map.set(slug, {
        slug,
        label: product.brand,
        categories: [product.category],
      });
    }
  }
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
})();

export const BRAND_SLUGS = BRAND_OPTIONS.map((b) => b.slug);

export function brandsForCategory(category: Category | "all") {
  return category === "all"
    ? BRAND_OPTIONS
    : BRAND_OPTIONS.filter((b) => b.categories.includes(category));
}
