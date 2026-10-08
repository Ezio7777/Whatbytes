export type Category = "electronics" | "clothing" | "home";

export interface Product {
  id: string;
  title: string;
  price: number;
  category: Category;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  /** extra images for the detail page carousel */
  gallery: string[];
  inStock: boolean;
}

export interface CategoryOption {
  value: Category | "all";
  label: string;
}
