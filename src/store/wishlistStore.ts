import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WISHLIST_STORAGE_KEY } from "@/lib/constants";

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      remove: (id) =>
        set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
    }),
    {
      name: WISHLIST_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ ids: state.ids }),
    }
  )
);
