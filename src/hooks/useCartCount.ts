import { selectCartCount, useCartStore } from "@/store/cartStore";
import { useHydrated } from "./useHydrated";

/** cart item count that is safe to render on the server (0 until hydrated) */
export function useCartCount() {
  const count = useCartStore(selectCartCount);
  const hydrated = useHydrated();
  return hydrated ? count : 0;
}
