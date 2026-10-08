import { create } from "zustand";

export interface Toast {
  id: number;
  /** toasts with the same key replace each other */
  key?: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  actionLabel?: string;
}

interface ToastState {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
}

let nextId = 1;
const MAX_TOASTS = 3;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (toast) =>
    set((state) => {
      const rest = toast.key
        ? state.toasts.filter((t) => t.key !== toast.key)
        : state.toasts;
      return { toasts: [...rest, { ...toast, id: nextId++ }].slice(-MAX_TOASTS) };
    }),
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
