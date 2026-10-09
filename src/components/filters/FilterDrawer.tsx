"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { FilterPanel } from "./FilterPanel";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  resultCount: number;
}

export function FilterDrawer({ open, onClose, resultCount }: FilterDrawerProps) {
  const controls = useDragControls();
  const hydrated = useHydrated();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!hydrated) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <motion.div
            className="absolute inset-0 bg-navy-deep/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-2xl bg-surface shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 340 }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) onClose();
            }}
          >
            <div
              onPointerDown={(e) => controls.start(e)}
              className="relative flex cursor-grab touch-none justify-center pb-2 pt-3"
            >
              <span className="h-1.5 w-10 rounded-full bg-navy-ink/20" />
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close filters"
                className="absolute right-3 top-1.5 rounded-full p-2 text-navy-ink/60 hover:bg-brand-soft hover:text-navy-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-4 pb-4">
              <FilterPanel />
            </div>

            <div className="border-t border-brand/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={onClose}
                className="h-12 w-full rounded-lg bg-navy-deep text-base font-semibold text-white transition-colors hover:bg-navy"
              >
                Show {resultCount} {resultCount === 1 ? "result" : "results"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
