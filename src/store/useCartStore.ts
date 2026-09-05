import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";
import type { CartItem, Product } from "@/types/product";

/**
 * Builds a storage key scoped to the currently authenticated user when possible.
 *
 * Why: persisting cart per-user avoids leaking cart data between different accounts
 * while still gracefully falling back to a guest key when no auth info exists.
 */
const getScopedStorageKey = (prefix: string) => {
  if (typeof window === "undefined") return `${prefix}-guest`;

  try {
    const raw = localStorage.getItem("nordic-living-auth");
    if (!raw) return `${prefix}-guest`;

    const parsed = JSON.parse(raw);
    const identifier =
      parsed?.state?.userId ?? parsed?.state?.userEmail ?? null;

    if (!identifier) return `${prefix}-guest`;

    return `${prefix}-${encodeURIComponent(String(identifier))}`;
  } catch {
    // If storage parsing fails, fallback to a guest-scoped key to avoid throwing.
    return `${prefix}-guest`;
  }
};

export interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

/**
 * Zustand store for cart management.
 * Exposes the cart array and basic mutators used by UI components.
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: Product) => {
        const existingItem = get().cart.find(
          (item) => item.product.id === product.id,
        );

        if (existingItem) {
          set({
            cart: get().cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
          return;
        }

        set({ cart: [...get().cart, { product, quantity: 1 }] });
      },

      removeFromCart: (productId: number) => {
        set({
          cart: get().cart.filter((item) => item.product.id !== productId),
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          cart: get().cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "nordic-living-cart",
      storage: createJSONStorage<StateStorage>(() => {
        const resolveKey = () => getScopedStorageKey("nordic-living-cart");

        return {
          getItem: () => localStorage.getItem(resolveKey()),
          setItem: (name, value) => {
            void name;
            localStorage.setItem(resolveKey(), value);
          },
          removeItem: () => localStorage.removeItem(resolveKey()),
        };
      }),
    },
  ),
);
