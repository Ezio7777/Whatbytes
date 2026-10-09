"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { ProductImage } from "@/components/ui/ProductImage";
import { Stars } from "@/components/ui/Stars";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { useAddToCart } from "@/hooks/useAddToCart";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  /** always use the normal card layout, even for featured products */
  compact?: boolean;
}

export function ProductCard({ product, priority, compact }: ProductCardProps) {
  const href = `/product/${product.id}`;
  const addToCart = useAddToCart();

  if (product.featured && !compact) {
    return (
      <article className="group flex h-full flex-col gap-4 rounded-card bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:flex-row sm:p-5">
        <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:min-h-[260px] sm:w-[42%]">
          <Link
            href={href}
            aria-label={`View ${product.title}`}
            className="absolute inset-0 block overflow-hidden rounded-lg bg-brand-soft"
          >
            <ProductImage
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 40vw, 100vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          <WishlistButton product={product} className="absolute right-2 top-2" />
        </div>

        <div className="flex flex-1 flex-col">
          <Link href={href} className="w-fit">
            <h2 className="text-2xl font-bold text-navy-ink hover:text-brand sm:text-[28px]">
              {product.title}
            </h2>
          </Link>
          <p className="mt-1 text-xl font-bold text-navy-ink">
            {formatPrice(product.price)}
          </p>
          <Stars rating={product.rating} size={18} className="mt-2" />
          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-navy-ink/80">
            {product.description}
          </p>
          <dl className="mt-3 space-y-1 text-[15px] text-navy-ink">
            <dt className="text-navy-ink/70">Category</dt>
            <dd className="font-medium capitalize">{product.category}</dd>
          </dl>
          <div className="mt-auto flex justify-end pt-5">
            <AddToCartButton
              size="lg"
              onAdd={() => addToCart(product)}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col rounded-card bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] w-full">
        <Link
          href={href}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 block overflow-hidden rounded-lg bg-brand-soft"
        >
          <ProductImage
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <WishlistButton product={product} className="absolute right-2 top-2" />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <Link href={href} className="w-fit">
          <h2 className="text-base font-semibold leading-snug text-navy-ink hover:text-brand">
            {product.title}
          </h2>
        </Link>
        <p className="mt-1 text-lg font-bold text-navy-ink">
          {formatPrice(product.price)}
        </p>
        <AddToCartButton
          onAdd={() => addToCart(product)}
          className="mt-3 w-full"
        />
      </div>
    </article>
  );
}
