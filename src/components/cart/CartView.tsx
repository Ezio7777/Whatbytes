"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash2 } from "lucide-react";
import { getCartLines } from "@/lib/cart";
import { useHydrated } from "@/hooks/useHydrated";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";

function CartSkeleton() {
  return (
    <div aria-hidden className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-card bg-white shadow-card"
          />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-card bg-white shadow-card" />
    </div>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-card bg-white px-6 py-20 text-center shadow-card"
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-brand">
        <ShoppingBag className="h-10 w-10" aria-hidden />
      </span>
      <h2 className="mt-6 text-2xl font-bold text-navy-ink">
        Your cart is empty
      </h2>
      <p className="mt-2 max-w-sm text-navy-ink/70">
        Looks like you have not added anything yet. Browse our products and add
        something you like.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex h-12 items-center rounded-lg bg-brand px-8 text-lg font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Start shopping
      </Link>
    </motion.div>
  );
}

export function CartView() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useToastStore((s) => s.push);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const lines = useMemo(() => getCartLines(items), [items]);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  const handleClear = () => {
    const snapshot = items;
    setConfirmOpen(false);
    clear();
    pushToast({
      key: "clear-cart",
      title: "Cart cleared",
      actionLabel: "Undo",
      onAction: () => snapshot.forEach((i) => addItem(i.id, i.quantity)),
    });
  };

  return (
    <div className="container-page py-6 md:py-10">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold text-navy-ink md:text-[34px]">
          Shopping Cart
        </h1>
        {hydrated && count > 0 && (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 active:scale-[0.97]"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Clear cart
          </button>
        )}
      </div>
      {hydrated && count > 0 && (
        <p className="mt-1 text-sm text-navy-ink/60">
          {count} {count === 1 ? "item" : "items"} in your cart
        </p>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Clear your cart?"
        description={`This will remove all ${count} ${count === 1 ? "item" : "items"} from your cart.`}
        confirmLabel="Yes, clear cart"
        cancelLabel="Keep items"
        onConfirm={handleClear}
        onCancel={() => setConfirmOpen(false)}
      />

      <div className="mt-6">
        {!hydrated ? (
          <CartSkeleton />
        ) : lines.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {lines.map((line) => (
                  <CartItemRow key={line.product.id} line={line} />
                ))}
              </AnimatePresence>
            </ul>
            <OrderSummary lines={lines} />
          </div>
        )}
      </div>
    </div>
  );
}
