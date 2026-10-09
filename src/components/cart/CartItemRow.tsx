"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { CartLine } from "@/lib/cart";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function CartItemRow({ line }: { line: CartLine }) {
  const { product, quantity, subtotal } = line;
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useToastStore((s) => s.push);

  const handleRemove = () => {
    removeItem(product.id);
    pushToast({
      key: `remove-${product.id}`,
      title: "Removed from cart",
      description: product.title,
      image: product.image,
      actionLabel: "Undo",
      onAction: () => addItem(product.id, quantity),
    });
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-4 rounded-card bg-white p-3 shadow-card sm:p-4"
    >
      <Link
        href={`/product/${product.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-soft sm:h-28 sm:w-28"
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.id}`}
              className="block truncate text-base font-semibold text-navy-ink hover:text-brand sm:text-lg"
            >
              {product.title}
            </Link>
            <p className="text-sm text-navy-ink/60">
              {product.brand} · {CATEGORY_LABELS[product.category]}
            </p>
            <p className="mt-1 text-sm text-navy-ink/80">
              {formatPrice(product.price)} each
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${product.title} from cart`}
            className="rounded-lg p-2 text-navy-ink/50 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantitySelector
            size="sm"
            value={quantity}
            onChange={(value) => setQuantity(product.id, value)}
          />
          <p className="text-lg font-bold text-navy-ink">
            {formatPrice(subtotal, true)}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
