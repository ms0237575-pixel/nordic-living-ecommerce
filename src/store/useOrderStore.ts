import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/product";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersByUser: (userId: string) => Order[];
  getAllOrders: () => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),

      getOrdersByUser: (userId) =>
        get().orders.filter((order) => order.userId === userId),

      getAllOrders: () => get().orders,
    }),
    {
      name: "nordic-orders-storage",
    },
  ),
);
