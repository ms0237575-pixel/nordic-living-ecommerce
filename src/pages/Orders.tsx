import { useState } from "react";
import { Link } from "react-router";
import type { CartItem } from "@/types/product";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nordic-terracotta/30 bg-nordic-terracotta/10 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-nordic-terracotta">
            <Clock className="h-3 w-3" />
            Processing
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nordic-charcoal/30 bg-nordic-charcoal/5 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-nordic-charcoal">
            <Truck className="h-3 w-3" />
            Shipped
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-nordic-sage-dark/30 bg-nordic-sage-dark/10 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-nordic-sage-dark">
            <CheckCircle2 className="h-3 w-3" />
            Delivered
          </span>
        );
    }
  };

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-nordic-gray/10 text-nordic-sage-dark">
          <Package className="h-7 w-7 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-[32px] font-semibold text-nordic-charcoal">
          No Previous Orders Found
        </h1>
        <p className="mt-3 max-w-md font-sans text-body text-nordic-sage-dark">
          When you place orders, their fulfillment status and tracking receipts
          will be listed right here.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 border border-nordic-charcoal bg-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="border-b border-nordic-gray/20 pb-6">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          Order History
        </h1>
        <p className="mt-2 font-sans text-body text-nordic-sage-dark">
          Review your past orders, delivery states, and item receipts.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-nordic-gray/20 bg-white shadow-sm transition-all duration-300 hover:border-nordic-charcoal/30"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-nordic-gray/15 bg-[#fbf9f5] px-6 py-4">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="block font-sans text-[11px] uppercase tracking-wider text-nordic-sage-dark">
                    Order Reference
                  </span>
                  <span className="font-serif text-[15px] font-semibold text-nordic-charcoal">
                    {order.id.startsWith("#") ? order.id : `#${order.id}`}
                  </span>
                </div>
                <div>
                  <span className="block font-sans text-[11px] uppercase tracking-wider text-nordic-sage-dark">
                    Date Placed
                  </span>
                  <span className="font-sans text-[13px] font-medium text-nordic-charcoal">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="block font-sans text-[11px] uppercase tracking-wider text-nordic-sage-dark">
                    Total Amount
                  </span>
                  <span className="font-sans text-[13px] font-bold text-nordic-terracotta">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>{getStatusBadge(order.status ?? "Delivered")}</div>
            </div>

            {/* Content & items */}
            <div className="grid gap-8 p-6 lg:grid-cols-[1fr_280px]">
              <div className="space-y-4">
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-wider text-nordic-charcoal">
                  Items (
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
                <div className="divide-y divide-nordic-gray/10">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 bg-nordic-gray/10 object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="font-serif text-[15px] font-medium text-nordic-charcoal hover:text-nordic-terracotta transition-colors truncate block"
                        >
                          {item.product.name}
                        </Link>
                        <p className="font-sans text-[12px] text-nordic-sage-dark">
                          Qty: {item.quantity} · $
                          {item.product.price.toFixed(2)} each
                        </p>
                      </div>
                      <span className="font-sans text-[14px] font-medium text-nordic-charcoal shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery destination summary */}
              <div className="border-t border-nordic-gray/15 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-wider text-nordic-charcoal mb-3">
                  Delivered To
                </h3>
                <div className="font-sans text-[13px] leading-relaxed text-nordic-sage-dark">
                  <p className="font-medium text-nordic-charcoal">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.customer.address}</p>
                  <p>{order.customer.city}</p>
                  <p className="mt-2 text-[12px] text-nordic-sage-dark/80">
                    {order.customer.email}
                  </p>
                </div>

                <div className="mt-6 border-t border-nordic-gray/10 pt-4 text-[12px] font-sans">
                  <div className="flex justify-between py-1 text-nordic-sage-dark">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-nordic-sage-dark">
                    <span>Shipping</span>
                    <span>
                      {order.shipping === 0
                        ? "Free"
                        : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
