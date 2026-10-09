"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="mt-10">
      <h2 id="related-title" className="text-2xl font-bold text-navy-ink">
        You may also like
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.li
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
          >
            <ProductCard product={product} compact />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
