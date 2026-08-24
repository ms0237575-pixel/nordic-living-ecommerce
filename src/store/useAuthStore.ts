import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface AuthStore {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,

      login: (email: string) => {
        set({ isAuthenticated: true, userEmail: email });
        void useCartStore.persist.rehydrate();
        void useWishlistStore.persist.rehydrate();
      },

      logout: () => {
        set({ isAuthenticated: false, userEmail: null });
        useCartStore.getState().clearCart();
        useWishlistStore.getState().clearWishlist();
        void useCartStore.persist.rehydrate();
        void useWishlistStore.persist.rehydrate();
      },
    }),
    {
      name: "nordic-living-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
