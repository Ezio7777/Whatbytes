import { getProductById } from "@/data/products";
import type { CartItem } from "@/store/cartStore";
import type { Product } from "@/types/product";

export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FEE = 9;

export const COUPONS: Record<string, { percent: number; label: string }> = {
  SAVE10: { percent: 10, label: "10% off" },
  WELCOME20: { percent: 20, label: "20% off" },
};

export interface CartLine {
  product: Product;
  quantity: number;
  subtotal: number;
}

export function getCartLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = getProductById(item.id);
    if (!product) return [];
    return [
      { product, quantity: item.quantity, subtotal: product.price * item.quantity },
    ];
  });
}

export function getCartSummary(lines: CartLine[], couponPercent = 0) {
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.subtotal, 0);
  const discount = Math.round(subtotal * couponPercent) / 100;
  const discounted = subtotal - discount;
  const shipping =
    lines.length === 0 || discounted >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = discounted + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discounted);

  return {
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
    remainingForFreeShipping,
  };
}

export function findCoupon(code: string) {
  const key = code.trim().toUpperCase();
  const coupon = COUPONS[key];
  return coupon ? { code: key, ...coupon } : null;
}
