"use client";

import { useCallback } from "react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

export function useAddToCart() {
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useToastStore((s) => s.push);

  return useCallback(
    (product: Product, quantity = 1) => {
      addItem(product.id, quantity);
      pushToast({
        key: `cart-${product.id}`,
        title: "Added to cart",
        description:
          quantity > 1 ? `${product.title} x ${quantity}` : product.title,
        image: product.image,
        href: "/cart",
        actionLabel: "View cart",
      });
    },
    [addItem, pushToast]
  );
}
