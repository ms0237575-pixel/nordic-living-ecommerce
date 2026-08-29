import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address: string;
  city: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

interface OrderStore {
  orders: AdminOrder[];
  addOrder: (order: Omit<AdminOrder, "id" | "createdAt" | "status">) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [
        {
          id: "ORD-94821",
          customerName: "Salma Ahmed",
          customerEmail: "salma@example.com",
          customerPhone: "+20 100 123 4567",
          address: "90th Street, Fifth Settlement",
          city: "New Cairo",
          items: [],
          totalAmount: 1240.0,
          status: "Processing",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: "ORD-83912",
          customerName: "Karim Mostafa",
          customerEmail: "karim@example.com",
          address: "Zamalek, Gezira Island",
          city: "Cairo",
          items: [],
          totalAmount: 480.0,
          status: "Shipped",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        },
      ],

      addOrder: (orderData) => {
        const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
        const newOrder: AdminOrder = {
          ...orderData,
          id: orderId,
          status: "Processing",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return orderId;
      },

      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o,
          ),
        })),

      deleteOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== orderId),
        })),
    }),
    {
      name: "nordic-living-orders-storage",
    },
  ),
);
