"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useToastStore, type Toast } from "@/store/toastStore";
import { ProductImage } from "./ProductImage";

function ToastItem({ toast }: { toast: Toast }) {
  const dismiss = useToastStore((s) => s.dismiss);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => dismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [paused, dismiss, toast.id]);

  return (
    <motion.div
      layout
      role="status"
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl bg-white p-3 pr-2 shadow-card-hover ring-1 ring-brand/10 sm:w-80"
    >
      {toast.image ? (
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-brand-soft">
          <ProductImage
            src={toast.image}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <Check className="h-3.5 w-3.5" aria-hidden />
          {toast.title}
        </p>
        {toast.description && (
          <p className="truncate text-sm font-medium text-navy-ink">
            {toast.description}
          </p>
        )}
        {toast.href && toast.actionLabel && (
          <Link
            href={toast.href}
            onClick={() => dismiss(toast.id)}
            className="text-xs font-semibold text-brand hover:underline"
          >
            {toast.actionLabel}
          </Link>
        )}
      </div>

      <button
        type="button"
        onClick={() => dismiss(toast.id)}
        aria-label="Dismiss notification"
        className="self-start rounded-md p-1.5 text-navy-ink/50 hover:bg-brand-soft hover:text-navy-ink"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
