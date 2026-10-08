import type { Category } from "@/types/product";
import { PRICE_MAX, PRICE_MIN } from "./constants";

export type PriceRange = [number, number];
export type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export interface FilterValues {
  category: Category | "all";
  priceRange: PriceRange;
  query: string;
  sort: SortKey;
}

export const DEFAULT_PRICE_RANGE: PriceRange = [PRICE_MIN, PRICE_MAX];

export const DEFAULT_FILTERS: FilterValues = {
  category: "all",
  priceRange: DEFAULT_PRICE_RANGE,
  query: "",
  sort: "featured",
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const CATEGORIES: Category[] = ["electronics", "clothing", "home"];
const SORT_KEYS = SORT_OPTIONS.map((o) => o.value);

type ParamReader = { get(name: string): string | null };

const clamp = (n: number) => Math.min(PRICE_MAX, Math.max(PRICE_MIN, n));

export function parseFilters(params: ParamReader): FilterValues {
  const rawCategory = params.get("category");
  const category = CATEGORIES.includes(rawCategory as Category)
    ? (rawCategory as Category)
    : "all";

  let priceRange: PriceRange = DEFAULT_PRICE_RANGE;
  const match = params.get("price")?.match(/^(\d+)-(\d+)$/);
  if (match) {
    const min = clamp(Number(match[1]));
    const max = clamp(Number(match[2]));
    if (min < max) priceRange = [min, max];
  }

  const rawSort = params.get("sort");
  const sort = SORT_KEYS.includes(rawSort as SortKey)
    ? (rawSort as SortKey)
    : "featured";

  return { category, priceRange, query: params.get("q") ?? "", sort };
}

/** merges a patch into the current filters and returns a clean query string */
export function buildQueryString(
  current: ParamReader,
  patch: Partial<FilterValues>
) {
  const next = { ...parseFilters(current), ...patch };
  const params = new URLSearchParams();

  if (next.category !== "all") params.set("category", next.category);
  if (
    next.priceRange[0] !== PRICE_MIN ||
    next.priceRange[1] !== PRICE_MAX
  ) {
    params.set("price", `${next.priceRange[0]}-${next.priceRange[1]}`);
  }
  if (next.query.trim()) params.set("q", next.query.trim());
  if (next.sort !== "featured") params.set("sort", next.sort);

  return params.toString();
}
