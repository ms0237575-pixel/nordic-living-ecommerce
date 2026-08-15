import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product: Product) => {
        const exists = get().wishlist.find((p) => p.id === product.id);
        if (exists) return;
        set({ wishlist: [...get().wishlist, product] });
      },

      removeFromWishlist: (productId: number) => {
        set({ wishlist: get().wishlist.filter((p) => p.id !== productId) });
      },

      isInWishlist: (productId: number) => {
        return !!get().wishlist.find((p) => p.id === productId);
      },

      toggleWishlist: (product: Product) => {
        const exists = get().wishlist.find((p) => p.id === product.id);
        if (exists) {
          set({ wishlist: get().wishlist.filter((p) => p.id !== product.id) });
        } else {
          set({ wishlist: [...get().wishlist, product] });
        }
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "nordic-living-wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useWishlistStore;
