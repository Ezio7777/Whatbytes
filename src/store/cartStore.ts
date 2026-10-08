import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CART_STORAGE_KEY } from "@/lib/constants";

export const MAX_QUANTITY = 10;

export interface CartItem {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
}

const clampQuantity = (n: number) =>
  Math.min(MAX_QUANTITY, Math.max(1, Math.floor(n)));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (id, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
                  : item
              ),
            };
          }
          return { items: [...state.items, { id, quantity: clampQuantity(quantity) }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: clampQuantity(quantity) } : item
          ),
        })),

      increment: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: clampQuantity(item.quantity + 1) }
              : item
          ),
        })),

      decrement: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: clampQuantity(item.quantity - 1) }
              : item
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// keep the cart in sync when it changes in another browser tab
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === CART_STORAGE_KEY) {
      void useCartStore.persist.rehydrate();
    }
  });
}

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);
