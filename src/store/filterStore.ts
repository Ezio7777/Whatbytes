import { create } from "zustand";
import type { Category } from "@/types/product";
import { PRICE_MAX, PRICE_MIN } from "@/lib/constants";

export type PriceRange = [number, number];

interface FilterState {
  category: Category | "all";
  priceRange: PriceRange;
  query: string;
  setCategory: (category: Category | "all") => void;
  setPriceRange: (range: PriceRange) => void;
  setQuery: (query: string) => void;
  reset: () => void;
}

export const DEFAULT_PRICE_RANGE: PriceRange = [PRICE_MIN, PRICE_MAX];

export const useFilterStore = create<FilterState>((set) => ({
  category: "all",
  priceRange: DEFAULT_PRICE_RANGE,
  query: "",
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setQuery: (query) => set({ query }),
  reset: () =>
    set({ category: "all", priceRange: DEFAULT_PRICE_RANGE, query: "" }),
}));
