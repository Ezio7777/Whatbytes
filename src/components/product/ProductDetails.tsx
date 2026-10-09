"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/types/product";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useAddToCart } from "@/hooks/useAddToCart";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Stars } from "@/components/ui/Stars";

export function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        {product.brand}
      </p>
      <h1 className="mt-1 text-3xl font-bold text-navy-ink md:text-4xl">
        {product.title}
      </h1>

      <div className="mt-3 flex items-center gap-2.5">
        <Stars rating={product.rating} size={18} />
        <span className="text-sm font-medium text-navy-ink">
          {product.rating.toFixed(1)}
        </span>
        <a
          href="#reviews"
          className="text-sm text-navy-ink/60 underline-offset-2 hover:text-brand hover:underline"
        >
          {product.reviewCount} reviews
        </a>
      </div>

      <p className="mt-5 text-3xl font-bold text-navy-ink">
        {formatPrice(product.price)}
      </p>

      <p className="mt-4 leading-relaxed text-navy-ink/80">
        {product.description}
      </p>

      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
        <dt className="text-navy-ink/60">Category</dt>
        <dd className="font-medium text-navy-ink">
          {CATEGORY_LABELS[product.category]}
        </dd>
        <dt className="text-navy-ink/60">Brand</dt>
        <dd className="font-medium text-navy-ink">{product.brand}</dd>
        <dt className="text-navy-ink/60">Availability</dt>
        <dd
          className={
            product.inStock
              ? "flex items-center gap-1 font-medium text-emerald-600"
              : "font-medium text-red-600"
          }
        >
          {product.inStock ? (
            <>
              <Check className="h-4 w-4" aria-hidden /> In stock
            </>
          ) : (
            "Out of stock"
          )}
        </dd>
      </dl>

      <div className="mt-7 border-t border-brand/10 pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <p className="text-sm text-navy-ink/70">
            Total{" "}
            <span className="text-lg font-bold text-navy-ink">
              {formatPrice(product.price * quantity)}
            </span>
          </p>
        </div>

        <AddToCartButton
          size="lg"
          disabled={!product.inStock}
          onAdd={() => addToCart(product, quantity)}
          className="mt-4 w-full sm:w-auto sm:min-w-[240px]"
        />
      </div>

      <ul className="mt-6 flex flex-col gap-2 text-sm text-navy-ink/70 sm:flex-row sm:gap-6">
        <li className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-brand" aria-hidden />
          Free delivery over $100
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-brand" aria-hidden />
          30 day easy returns
        </li>
      </ul>
    </motion.div>
  );
}
