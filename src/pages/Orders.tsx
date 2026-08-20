import { useState } from "react";
import { Link } from "react-router";
import type { CartItem } from "@/types/product";

interface Order {
  id: string;
  date: string;
  status?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
  };
}

function deriveOrderStatus(now: number, date: string): string {
  const ageDays = (now - new Date(date).getTime()) / 86400000;
  if (ageDays >= 14) return "Delivered";
  if (ageDays >= 3) return "Shipped";
  return "Processing";
}

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem("nordic-living-orders");
    const parsed = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(parsed) ? parsed : [];
    list.sort((a: Order, b: Order) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return db - da;
    });
    const now = Date.now();
    return list.map((order: Order) => ({
      ...order,
      status: order.status ?? deriveOrderStatus(now, order.date),
    }));
  } catch {
    return [];
  }
}

export default function Orders() {
  const [orders] = useState<Order[]>(loadOrders);

  const statusStyles: Record<string, string> = {
    Processing: "border-nordic-terracotta/40 text-nordic-terracotta",
    Shipped: "border-nordic-charcoal/30 text-nordic-charcoal",
    Delivered: "border-nordic-gray/40 text-nordic-sage-dark",
  };

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          You have no previous orders
        </h1>
        <Link
          to="/shop"
          className="mt-8 border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors duration-300 hover:bg-nordic-charcoal hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
        Orders
      </h1>

      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-sm border border-nordic-gray/20 bg-nordic-charcoal/3 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-sans text-[14px] text-nordic-sage-dark uppercase">
                  Order ID: {order.id}
                </div>
                <div className="mt-1 font-sans text-body font-normal text-nordic-charcoal">
                  {new Date(order.date).toLocaleDateString()}
                </div>

                <div className="mt-3">
                  <div className="font-sans text-body font-medium text-nordic-charcoal">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                  <div className="font-sans text-[14px] text-nordic-sage-dark">
                    {order.customer.address}
                  </div>
                  <div className="font-sans text-[14px] text-nordic-sage-dark">
                    {order.customer.city}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block border px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-widest ${
                    statusStyles[order.status ?? "Delivered"] ??
                    "border-nordic-gray/40 text-nordic-sage-dark"
                  }`}
                >
                  {order.status ?? "Delivered"}
                </span>
                <div className="mt-3 font-sans text-body font-normal text-nordic-charcoal">
                  Subtotal: ${order.subtotal.toFixed(2)}
                </div>
                <div className="font-sans text-body font-normal text-nordic-charcoal">
                  Shipping: ${order.shipping.toFixed(2)}
                </div>
                <div className="mt-2 font-sans text-body font-semibold text-nordic-terracotta">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-nordic-gray/20 pt-4">
              <h3 className="font-sans text-body font-medium text-nordic-charcoal">
                Items
              </h3>
              <ul className="mt-2 space-y-2">
                {order.items.map((item) => (
                  <li
                    key={item.product.id}
                    className="font-sans text-body text-nordic-charcoal"
                  >
                    {item.product.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
