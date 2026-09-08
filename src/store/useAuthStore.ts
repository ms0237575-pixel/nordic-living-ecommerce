import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface AuthUserProfile {
  userId?: string;
  role?: "admin" | "user";
}

interface AuthStore {
  isAuthenticated: boolean;
  userEmail: string | null;
  userId: string | null;
  role: "admin" | "user" | null;
  login: (email: string, profile?: AuthUserProfile) => void;
  logout: () => void;
}

const removeScopedStorage = (prefix: string, userKey?: string | null) => {
  if (typeof window === "undefined") return;

  const scope = userKey ? encodeURIComponent(String(userKey)) : null;
  if (!scope) {
    localStorage.removeItem(`${prefix}-guest`);
    return;
  }

  localStorage.removeItem(`${prefix}-${scope}`);
};

/**
 * Authentication store — tracks whether a user is authenticated and basic
 * profile information (email, id, role). It also coordinates scoped cleanup
 * of persisted stores when logging out.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      userId: null,
      role: null,

      login: (email: string, profile: AuthUserProfile = {}) => {
        const normalizedEmail = email.trim();
        const nextUserId = profile.userId ?? normalizedEmail;
        const nextRole = profile.role ?? "user";

        set({
          isAuthenticated: true,
          userEmail: normalizedEmail,
          userId: nextUserId,
          role: nextRole,
        });

        void useCartStore.persist.rehydrate();
        void useWishlistStore.persist.rehydrate();
      },

      logout: () => {
        const currentState = useAuthStore.getState();
        const previousUserKey = currentState.userId ?? currentState.userEmail;

        removeScopedStorage("nordic-living-cart", previousUserKey);
        removeScopedStorage("nordic-living-wishlist", previousUserKey);

        useCartStore.getState().clearCart();
        useWishlistStore.getState().clearWishlist();
        useOrderStore.getState().clearOrders();

        set({
          isAuthenticated: false,
          userEmail: null,
          userId: null,
          role: null,
        });

        void useCartStore.persist.rehydrate();
        void useWishlistStore.persist.rehydrate();
      },
    }),
    {
      name: "nordic-living-auth",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Ensure we don't accidentally start a fresh/cleared session pre-authenticated
      // If persisted data claims `isAuthenticated` but lacks identifying info,
      // treat the session as logged out to avoid phantom pre-authenticated sessions.
      onRehydrateStorage: () => (persistedState) => {
        if (!persistedState) return;

        const invalidAuth =
          persistedState.isAuthenticated &&
          (!persistedState.userEmail || !persistedState.userId);
        if (invalidAuth) {
          // Force logged-out state on rehydrate when persisted auth is invalid.
          // We cannot call `set` directly here, so use the store's setter after rehydration.
          // Use a small timeout to defer until store is available.
          setTimeout(() => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const { useAuthStore: auth } = require("./useAuthStore");
              if (auth && typeof auth.getState === "function") {
                auth.setState({
                  isAuthenticated: false,
                  userEmail: null,
                  userId: null,
                  role: null,
                });
              }
            } catch (err) {
              // ignore — best effort cleanup
            }
          }, 0);
        }
      },
    },
  ),
);

export default useAuthStore;
