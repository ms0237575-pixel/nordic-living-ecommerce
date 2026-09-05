import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts } from "@/data/products";
import type { Product } from "@/types/product";

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, updated: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  resetToDefault: () => void;
}

/**
 * Product store — manages the product catalog used across the site.
 * Supports adding, updating, deleting and resetting to built-in defaults.
 */
export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: initialProducts,

      addProduct: (newProdData) =>
        set((state) => {
          const maxId = state.products.reduce(
            (max, p) => Math.max(max, p.id),
            0,
          );
          const newProduct: Product = {
            ...newProdData,
            id: maxId + 1,
          };
          return { products: [newProduct, ...state.products] };
        }),

      updateProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((item) =>
            item.id === id ? { ...item, ...updated } : item,
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((item) => item.id !== id),
        })),

      resetToDefault: () => set({ products: initialProducts }),
    }),
    {
      name: "nordic-living-custom-products",
    },
  ),
);
