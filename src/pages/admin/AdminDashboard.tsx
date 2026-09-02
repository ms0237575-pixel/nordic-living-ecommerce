import { Link } from "react-router";
import { useProductStore } from "@/store/useProductStore";
import { useOrderStore } from "@/store/useOrderStore";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  ArrowRight,
  Plus,
  Sparkles,
  DollarSign,
} from "lucide-react";

export function AdminDashboard() {
  const products = useProductStore((state) => state.products);
  const orders = useOrderStore((state) => state.orders);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );
  const pendingOrders = orders.filter((o) => o.status === "Processing").length;
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      caption: "All-time accumulated",
    },
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      caption: "Active items in catalog",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      caption: `${pendingOrders} processing`,
    },
    {
      title: "Avg. Order Value",
      value:
        orders.length > 0
          ? `$${(totalRevenue / orders.length).toFixed(2)}`
          : "$0.00",
      icon: TrendingUp,
      caption: "Per completed checkout",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 border-b border-nordic-gray/20 pb-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-nordic-terracotta" />
            <span className="font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-sage-dark">
              Control Center
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl md:text-[32px] font-semibold text-nordic-charcoal">
            Admin Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 border border-nordic-charcoal bg-nordic-charcoal px-5 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-nordic-terracotta hover:border-nordic-terracotta transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Manage Products
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="border border-nordic-gray/20 bg-white p-6 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-sage-dark">
                {stat.title}
              </span>
              <div className="p-2 rounded-full bg-nordic-gray/10 text-nordic-charcoal">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-[28px] font-semibold text-nordic-charcoal block">
                {stat.value}
              </span>
              <span className="font-sans text-[11px] text-nordic-sage-dark">
                {stat.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="border border-nordic-gray/20 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-nordic-gray/15 pb-4">
            <h2 className="font-serif text-[22px] font-semibold text-nordic-charcoal">
              Quick Portals
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <Link
              to="/admin/products"
              className="group flex items-center justify-between border border-nordic-gray/20 p-5 hover:border-nordic-charcoal transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-nordic-gray/10 text-nordic-charcoal group-hover:bg-nordic-charcoal group-hover:text-white transition-colors">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-[14px] font-semibold text-nordic-charcoal">
                    Products Catalog
                  </h3>
                  <p className="font-sans text-[12px] text-nordic-sage-dark">
                    Add, modify prices, update photos, or delete inventory.
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-nordic-sage-dark group-hover:text-nordic-charcoal group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              to="/admin/orders"
              className="group flex items-center justify-between border border-nordic-gray/20 p-5 hover:border-nordic-charcoal transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-nordic-gray/10 text-nordic-charcoal group-hover:bg-nordic-charcoal group-hover:text-white transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-[14px] font-semibold text-nordic-charcoal">
                    Customer Orders
                  </h3>
                  <p className="font-sans text-[12px] text-nordic-sage-dark">
                    Track shipments, update statuses, inspect purchase logs.
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-nordic-sage-dark group-hover:text-nordic-charcoal group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        <div className="border border-nordic-gray/20 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-nordic-gray/15 pb-4">
            <h2 className="font-serif text-[22px] font-semibold text-nordic-charcoal">
              Recent Order Requests
            </h2>
            <Link
              to="/admin/orders"
              className="font-sans text-[11px] font-medium uppercase tracking-wider text-nordic-terracotta hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {recentOrders.length === 0 ? (
              <p className="font-sans text-[13px] text-nordic-sage-dark py-8 text-center">
                No orders recorded yet.
              </p>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-nordic-gray/10 pb-3 font-sans text-[13px]"
                >
                  <div>
                    <span className="font-mono font-medium text-nordic-charcoal block">
                      {order.id}
                    </span>
                    <span className="text-[11px] text-nordic-sage-dark">
                      {order.customerName} · {order.city}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-nordic-charcoal block">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-nordic-gray/15 text-nordic-charcoal">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
