import type { Category, CategoryOption } from "@/types/product";

export const PRICE_MIN = 0;
export const PRICE_MAX = 1000;

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home" },
];

export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com" },
  { name: "Twitter", href: "https://twitter.com" },
  { name: "Instagram", href: "https://instagram.com" },
];

export const CART_STORAGE_KEY = "whatbytes-cart";

export const CATEGORY_LABELS: Record<Category, string> = {
  electronics: "Electronics",
  clothing: "Clothing",
  home: "Home",
};
