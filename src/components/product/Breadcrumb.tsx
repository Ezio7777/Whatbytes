import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { CATEGORY_LABELS } from "@/lib/constants";

export function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-navy-ink/70">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-brand hover:underline">
            Home
          </Link>
        </li>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <li>
          <Link
            href={`/?category=${product.category}`}
            className="hover:text-brand hover:underline"
          >
            {CATEGORY_LABELS[product.category]}
          </Link>
        </li>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <li aria-current="page" className="font-medium text-navy-ink">
          {product.title}
        </li>
      </ol>
    </nav>
  );
}
