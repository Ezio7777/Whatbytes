"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Tag, Truck, X } from "lucide-react";
import { findCoupon, FREE_SHIPPING_THRESHOLD, getCartSummary, type CartLine } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";
import { useToastStore } from "@/store/toastStore";

interface OrderSummaryProps {
  lines: CartLine[];
}

function Row({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between text-[15px]", className)}>
      <dt className="text-navy-ink/70">{label}</dt>
      <dd className="relative overflow-hidden font-medium text-navy-ink">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </dd>
    </div>
  );
}

export function OrderSummary({ lines }: OrderSummaryProps) {
  const pushToast = useToastStore((s) => s.push);
  const [input, setInput] = useState("");
  const [coupon, setCoupon] = useState<ReturnType<typeof findCoupon>>(null);
  const [error, setError] = useState("");

  const summary = getCartSummary(lines, coupon?.percent ?? 0);
  const progress = Math.min(
    100,
    ((summary.subtotal - summary.discount) / FREE_SHIPPING_THRESHOLD) * 100
  );

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const found = findCoupon(input);
    if (!found) {
      setError("This coupon code is not valid");
      return;
    }
    setCoupon(found);
    setError("");
    setInput("");
    pushToast({
      key: "coupon",
      title: "Coupon applied",
      description: `${found.code}, ${found.label}`,
    });
  };

  return (
    <aside className="h-fit rounded-card bg-white p-5 shadow-card lg:sticky lg:top-24">
      <h2 className="text-xl font-bold text-navy-ink">Order Summary</h2>

      {/* free shipping progress */}
      <div className="mt-4 rounded-lg bg-brand-soft p-3">
        <p className="flex items-center gap-2 text-sm font-medium text-navy-ink">
          <Truck className="h-4 w-4 shrink-0 text-brand" aria-hidden />
          {summary.remainingForFreeShipping > 0
            ? `Add ${formatPrice(summary.remainingForFreeShipping, true)} more for free delivery`
            : "You get free delivery on this order"}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* coupon */}
      <div className="mt-5">
        <AnimatePresence mode="wait" initial={false}>
          {coupon ? (
            <motion.div
              key="applied"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2 font-medium text-emerald-700">
                <Tag className="h-4 w-4" aria-hidden />
                {coupon.code} · {coupon.label}
              </span>
              <button
                type="button"
                onClick={() => setCoupon(null)}
                aria-label="Remove coupon"
                className="rounded p-1 text-emerald-700 hover:bg-emerald-100"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={applyCoupon}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <label htmlFor="coupon" className="text-sm font-medium text-navy-ink">
                Coupon code
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  id="coupon"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setError("");
                  }}
                  placeholder="Try SAVE10"
                  autoComplete="off"
                  className={cn(
                    "h-10 min-w-0 flex-1 rounded-lg border bg-white px-3 text-sm uppercase placeholder:normal-case focus:outline-none focus:ring-2",
                    error
                      ? "border-red-400 focus:ring-red-200"
                      : "border-brand/25 focus:border-brand focus:ring-brand/20"
                  )}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="h-10 rounded-lg bg-navy-deep px-4 text-sm font-semibold text-white hover:bg-navy disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              {error && (
                <p role="alert" className="mt-1.5 text-sm text-red-600">
                  {error}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <dl className="mt-5 space-y-3 border-t border-brand/10 pt-5">
        <Row
          label={`Subtotal (${summary.itemCount} ${summary.itemCount === 1 ? "item" : "items"})`}
          value={formatPrice(summary.subtotal, true)}
        />
        {summary.discount > 0 && (
          <Row
            label="Discount"
            value={`-${formatPrice(summary.discount, true)}`}
            className="[&_dd]:text-emerald-600"
          />
        )}
        <Row
          label="Delivery"
          value={summary.shipping === 0 ? "Free" : formatPrice(summary.shipping, true)}
        />
        <div className="flex items-center justify-between border-t border-brand/10 pt-4">
          <dt className="text-lg font-bold text-navy-ink">Total</dt>
          <dd className="text-2xl font-bold text-navy-ink">
            {formatPrice(summary.total, true)}
          </dd>
        </div>
      </dl>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() =>
          pushToast({
            key: "checkout",
            variant: "info",
            title: "Demo store",
            description: "Checkout is not available, no real orders are placed.",
          })
        }
        className="mt-5 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
      >
        Proceed to Checkout
      </motion.button>

      <Link
        href="/"
        className="mt-3 block text-center text-sm font-medium text-brand hover:underline"
      >
        Continue shopping
      </Link>
    </aside>
  );
}
