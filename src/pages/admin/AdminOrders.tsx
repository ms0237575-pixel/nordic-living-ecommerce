import { useState, useEffect } from "react";
import {
  useOrderStore,
  playOrderNotificationSound,
  type OrderStatus,
  type AdminOrder,
} from "@/store/useOrderStore";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
  Trash2,
  Eye,
  X,
  Volume2,
  Gift,
} from "lucide-react";
import { toast } from "sonner";

const STATUS_FILTERS: Array<"All" | OrderStatus> = [
  "All",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("nordic_orders_sync");

    channel.onmessage = (event) => {
      if (event.data?.type === "NEW_ORDER") {
        const newOrder: AdminOrder = event.data.order;
        playOrderNotificationSound();
        toast.info(
          `🔔 New order received: ${newOrder.id} (${newOrder.customerName} - $${newOrder.totalAmount.toFixed(2)})`,
          {
            duration: 6000,
          },
        );
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 text-[11px] font-medium text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
            <Clock className="h-3 w-3" /> Processing
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 text-[11px] font-medium text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
            <Truck className="h-3 w-3" /> Shipped
          </span>
        );
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-[11px] font-medium text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
            <CheckCircle2 className="h-3 w-3" /> Delivered
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 text-[11px] font-medium text-rose-800 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40">
            <XCircle className="h-3 w-3" /> Cancelled
          </span>
        );
    }
  };

  const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    updateOrderStatus(orderId, nextStatus);
    toast.success(`Order ${orderId} updated to ${nextStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: nextStatus } : null,
      );
    }
  };

  const handleDelete = (orderId: string) => {
    if (
      confirm(`Are you sure you want to permanently delete order ${orderId}?`)
    ) {
      deleteOrder(orderId);
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
      toast.success(`Order ${orderId} removed`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 border-b border-nordic-gray/20 pb-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-nordic-terracotta" />
            <span className="font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-sage-dark">
              Admin Portal
            </span>
          </div>
          <h1 className="mt-1 font-serif text-[32px] font-semibold text-nordic-charcoal dark:text-white">
            Order Management
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-nordic-charcoal dark:text-white font-sans text-[13px]">
          <button
            onClick={() => {
              playOrderNotificationSound();
              toast.info("Notification chime audio test");
            }}
            className="inline-flex items-center gap-2 border border-nordic-gray/30 bg-white dark:bg-nordic-charcoal px-3.5 py-2.5 font-sans text-[12px] font-medium text-inherit hover:bg-nordic-gray/10 transition-colors shadow-sm"
            title="Test alert chime"
          >
            <Volume2 className="h-4 w-4 text-nordic-terracotta" />
            Test Chime
          </button>

          <div className="border border-nordic-gray/20 bg-white dark:bg-nordic-charcoal px-4 py-2.5 shadow-sm">
            <span className="text-nordic-sage-dark block text-[11px] uppercase tracking-wider">
              Total Revenue
            </span>
            <strong className="text-[16px]">
              ${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}
            </strong>
          </div>
          <div className="border border-nordic-gray/20 bg-white dark:bg-nordic-charcoal px-4 py-2.5 shadow-sm">
            <span className="text-nordic-sage-dark block text-[11px] uppercase tracking-wider">
              Total Orders
            </span>
            <strong className="text-[16px]">{orders.length}</strong>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nordic-sage-dark" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, email..."
            className="w-full border border-nordic-gray/30 bg-transparent py-2 pl-9 pr-3 font-sans text-[13px] text-nordic-charcoal dark:text-white outline-none focus:border-nordic-charcoal dark:focus:border-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 font-sans text-[12px] font-medium transition-colors ${
                statusFilter === status
                  ? "bg-nordic-charcoal dark:bg-white text-white dark:text-nordic-charcoal"
                  : "border border-nordic-gray/20 bg-white dark:bg-nordic-charcoal text-nordic-charcoal dark:text-white hover:bg-nordic-gray/10"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto border border-nordic-gray/20 bg-white dark:bg-nordic-charcoal shadow-sm">
        <table className="w-full text-left font-sans text-[13px]">
          <thead className="border-b border-nordic-gray/20 bg-[#fbf9f5] dark:bg-[#141413] font-semibold uppercase tracking-wider text-nordic-sage-dark text-[11px]">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Gift</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nordic-gray/10 text-nordic-charcoal dark:text-white">
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-nordic-sage-dark"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-nordic-gray/5 transition-colors"
                >
                  <td className="px-6 py-4 font-mono font-medium">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-medium">
                      {order.customerName}
                    </span>
                    <span className="text-[11px] text-nordic-sage-dark">
                      {order.customerEmail}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-nordic-sage-dark text-[12px]">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {order.gift?.isGift ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-nordic-terracotta bg-nordic-terracotta/10 px-2 py-0.5 rounded-full">
                        <Gift className="h-3 w-3" /> Yes
                      </span>
                    ) : (
                      <span className="text-nordic-sage-dark text-[12px]">
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as OrderStatus,
                        )
                      }
                      className="border border-nordic-gray/30 bg-transparent py-1 px-2 text-[12px] font-medium outline-none focus:border-nordic-charcoal dark:focus:border-white cursor-pointer"
                    >
                      <option
                        value="Processing"
                        className="dark:bg-nordic-charcoal"
                      >
                        Processing
                      </option>
                      <option
                        value="Shipped"
                        className="dark:bg-nordic-charcoal"
                      >
                        Shipped
                      </option>
                      <option
                        value="Delivered"
                        className="dark:bg-nordic-charcoal"
                      >
                        Delivered
                      </option>
                      <option
                        value="Cancelled"
                        className="dark:bg-nordic-charcoal"
                      >
                        Cancelled
                      </option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-nordic-sage-dark hover:text-nordic-charcoal dark:hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 text-nordic-sage-dark hover:text-nordic-terracotta transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-nordic-gray/20 bg-white dark:bg-nordic-charcoal text-nordic-charcoal dark:text-white p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-nordic-gray/15 pb-4">
              <div>
                <h2 className="font-serif text-[20px] font-semibold text-inherit">
                  Order Details — {selectedOrder.id}
                </h2>
                <div className="mt-1">
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-nordic-sage-dark hover:text-nordic-charcoal dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 font-sans text-[13px]">
              <div>
                <span className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px]">
                  Customer & Shipping
                </span>
                <p className="mt-1 font-medium">{selectedOrder.customerName}</p>
                <p className="text-nordic-sage-dark">
                  {selectedOrder.customerEmail}
                </p>
                {selectedOrder.customerPhone && (
                  <p className="text-nordic-sage-dark">
                    {selectedOrder.customerPhone}
                  </p>
                )}
                <p className="mt-1">
                  {selectedOrder.address}, {selectedOrder.city}
                </p>
              </div>

              {selectedOrder.gift?.isGift && (
                <div className="border-t border-nordic-gray/15 pt-4 bg-[#fbf9f5] dark:bg-[#141413] p-3 border">
                  <div className="flex items-center gap-1.5 font-semibold text-nordic-terracotta text-[12px] uppercase tracking-wider">
                    <Gift className="h-3.5 w-3.5" /> Gift Wrapping & Card
                  </div>
                  {selectedOrder.gift.recipientName && (
                    <p className="mt-1 text-[12px]">
                      <strong className="font-medium text-nordic-sage-dark">
                        To:
                      </strong>{" "}
                      {selectedOrder.gift.recipientName}
                    </p>
                  )}
                  {selectedOrder.gift.giftMessage && (
                    <p className="mt-1 text-[12px] italic text-nordic-sage-dark">
                      "{selectedOrder.gift.giftMessage}"
                    </p>
                  )}
                </div>
              )}

              <div className="border-t border-nordic-gray/15 pt-4">
                <span className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px] mb-2">
                  Order Items
                </span>
                {selectedOrder.items.length === 0 ? (
                  <p className="text-nordic-sage-dark italic">
                    Default seed order items.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-[12px]"
                      >
                        <span>
                          {item.product.name} (x{item.quantity})
                        </span>
                        <strong>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-nordic-gray/15 pt-4 flex justify-between items-center">
                <span className="font-semibold text-[14px]">Total Paid:</span>
                <span className="font-serif text-subtitle font-semibold text-nordic-terracotta">
                  ${selectedOrder.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end pt-4 border-t border-nordic-gray/15">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="border border-nordic-charcoal bg-nordic-charcoal dark:bg-white dark:text-nordic-charcoal px-6 py-2 uppercase tracking-wider text-[11px] font-semibold text-white hover:bg-nordic-terracotta hover:border-nordic-terracotta dark:hover:bg-nordic-terracotta dark:hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
