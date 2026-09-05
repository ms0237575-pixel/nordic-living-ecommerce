import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface GiftOptions {
  isGift: boolean;
  giftMessage?: string;
  recipientName?: string;
}

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
  userId?: string;
  userEmail?: string;
  gift?: GiftOptions;
}

// BroadcastChannel allows multi-tab order sync; if unavailable (SSR) we ignore it.
const orderChannel =
  typeof window !== "undefined"
    ? new BroadcastChannel("nordic_orders_sync")
    : null;

const getCurrentAuthContext = () => {
  if (typeof window === "undefined") {
    return {
      userEmail: null,
      userId: null,
      role: null as "admin" | "user" | null,
    };
  }

  try {
    const raw = window.localStorage.getItem("nordic-living-auth");
    if (!raw) {
      return { userEmail: null, userId: null, role: null };
    }

    const parsed = JSON.parse(raw);
    return {
      userEmail: parsed?.state?.userEmail ?? null,
      userId: parsed?.state?.userId ?? null,
      role: parsed?.state?.role ?? null,
    };
  } catch {
    return { userEmail: null, userId: null, role: null };
  }
};

/**
 * Play a short notification chime for new orders. Silent-fails in environments
 * where the Web Audio API is not available or when audio initialization errors occur.
 */
export const playOrderNotificationSound = () => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc1.frequency.setValueAtTime(880, ctx.currentTime + 0.12);

    osc2.frequency.setValueAtTime(440, ctx.currentTime);
    osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
  } catch {
    // intentionally silent on audio errors to avoid noisy exceptions in the UI
  }
};

/**
 * Order store interface — keeps a list of `AdminOrder` and provides helpers
 * to add, mutate, and clear orders. `getOrders` scopes results to the
 * authenticated user unless the current role is `admin`.
 */
interface OrderStore {
  orders: AdminOrder[];
  getOrders: () => AdminOrder[];
  addOrder: (
    order: Omit<
      AdminOrder,
      "id" | "createdAt" | "status" | "userId" | "userEmail"
    >,
  ) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: "ORD-94821",
          customerName: "Salma Ahmed",
          customerEmail: "salma@example.com",
          customerPhone: "+20 100 123 4567",
          address: "90th Street, Fifth Settlement",
          city: "New Cairo",
          items: [],
          totalAmount: 1255.0,
          status: "Processing",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          userId: "salma@example.com",
          userEmail: "salma@example.com",
          gift: {
            isGift: true,
            recipientName: "Habiba",
            giftMessage:
              "Warm wishes for your new home. Hope you love this piece!",
          },
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
          userId: "karim@example.com",
          userEmail: "karim@example.com",
        },
      ],

      getOrders: () => {
        const { userEmail, userId, role } = getCurrentAuthContext();

        if (role === "admin") {
          return get().orders;
        }

        const normalizedEmail = userEmail?.toLowerCase() ?? null;
        const normalizedUserId = userId?.toLowerCase() ?? null;

        return get().orders.filter((order) => {
          const matchesUserId =
            normalizedUserId &&
            (order.userId?.toLowerCase() === normalizedUserId ||
              order.customerEmail.toLowerCase() === normalizedUserId);

          const matchesUserEmail =
            normalizedEmail &&
            (order.userEmail?.toLowerCase() === normalizedEmail ||
              order.customerEmail?.toLowerCase() === normalizedEmail);

          return Boolean(matchesUserId || matchesUserEmail);
        });
      },

      addOrder: (orderData) => {
        const { userEmail, userId } = getCurrentAuthContext();
        const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
        const newOrder: AdminOrder = {
          ...orderData,
          id: orderId,
          status: "Processing",
          createdAt: new Date().toISOString(),
          userId: userId ?? orderData.customerEmail,
          userEmail: userEmail ?? orderData.customerEmail,
        };

        set((state) => ({ orders: [newOrder, ...state.orders] }));

        if (orderChannel) {
          orderChannel.postMessage({ type: "NEW_ORDER", order: newOrder });
        }

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

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "nordic-living-orders-storage",
    },
  ),
);
