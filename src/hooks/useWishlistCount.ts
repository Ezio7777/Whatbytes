import { useWishlistStore } from "@/store/wishlistStore";
import { useHydrated } from "./useHydrated";

/** saved item count that is safe to render on the server (0 until hydrated) */
export function useWishlistCount() {
  const count = useWishlistStore((s) => s.ids.length);
  const hydrated = useHydrated();
  return hydrated ? count : 0;
}
