import { Link } from "react-router";
import { useOrderStore, type OrderStatus } from "@/store/useOrderStore";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Gift,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";

interface StepConfig {
  label: string;
  sublabel: string;
  icon: typeof Package;
}

const ORDER_STEPS: StepConfig[] = [
  { label: "Order Placed", sublabel: "Confirmed & Logged", icon: Package },
  {
    label: "Quality Check",
    sublabel: "Nordic Atelier Prep",
    icon: ClipboardCheck,
  },
  { label: "In Transit", sublabel: "Dispatched Courier", icon: Truck },
  { label: "Delivered", sublabel: "Safely Arrived", icon: CheckCircle2 },
];

function getStepProgress(status: OrderStatus): {
  currentStep: number;
  isCancelled: boolean;
} {
  switch (status) {
    case "Processing":
      return { currentStep: 1, isCancelled: false };
    case "Shipped":
      return { currentStep: 2, isCancelled: false };
    case "Delivered":
      return { currentStep: 3, isCancelled: false };
    case "Cancelled":
      return { currentStep: -1, isCancelled: true };
    default:
      return { currentStep: 0, isCancelled: false };
  }
}

function OrderTimeline({ status }: { status: OrderStatus }) {
  const { currentStep, isCancelled } = getStepProgress(status);

  if (isCancelled) {
    return (
      <div className="mt-8 rounded-none border border-rose-200 bg-rose-50/50 p-4 flex items-center gap-3 text-rose-800 font-sans text-[13px]">
        <XCircle className="h-5 w-5 shrink-0 text-rose-600" />
        <div>
          <span className="font-semibold block">Order Cancelled</span>
          <span className="text-[12px] text-rose-700/80">
            This shipment has been cancelled. If you have questions, please
            contact our atelier support.
          </span>
        </div>
      </div>
    );
  }

  const progressPercent = (currentStep / (ORDER_STEPS.length - 1)) * 100;

  return (
    <div className="mt-8 border-t border-nordic-gray/15 pt-6">
      <div className="flex items-center justify-between mb-6">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-nordic-sage-dark flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-nordic-terracotta" />
          Live Shipment Progress
        </span>
        <span className="font-sans text-[12px] font-medium text-nordic-terracotta capitalize">
          {status === "Processing" ? "Processing & Inspection" : status}
        </span>
      </div>

      <div className="relative mx-auto px-2">
        {/* Background Track */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-nordic-gray/25 -translate-y-1/2 z-0 sm:left-12 sm:right-12" />

        {/* Animated Active Progress Fill */}
        <div
          className="absolute top-5 left-6 h-0.5 bg-nordic-charcoal -translate-y-1/2 z-0 transition-all duration-700 ease-out sm:left-12"
          style={{ width: `calc(${progressPercent}% * 0.82)` }}
        />

        {/* Steps Nodes */}
        <div className="relative z-10 flex justify-between items-start">
          {ORDER_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const StepIcon = step.icon;

            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center w-20 sm:w-28"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${
                    isCompleted
                      ? "bg-nordic-charcoal text-white shadow-sm ring-4 ring-nordic-bg"
                      : isCurrent
                        ? "bg-nordic-terracotta text-white shadow-md ring-4 ring-nordic-terracotta/20 scale-110"
                        : "bg-white text-nordic-gray border border-nordic-gray/40"
                  }`}
                >
                  <StepIcon className="h-4 w-4 stroke-[1.8]" />
                </div>

                <div className="mt-3">
                  <span
                    className={`block font-sans text-[12px] transition-colors leading-tight ${
                      isCurrent
                        ? "font-semibold text-nordic-charcoal"
                        : isCompleted
                          ? "font-medium text-nordic-charcoal"
                          : "text-nordic-sage-dark"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="hidden sm:block font-sans text-[10px] text-nordic-sage-dark mt-0.5">
                    {step.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Orders() {
  const customerOrders = useOrderStore((state) => state.orders);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[12px] font-medium text-amber-800 border border-amber-200/60">
            <Clock className="h-3.5 w-3.5" /> Processing
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[12px] font-medium text-blue-800 border border-blue-200/60">
            <Truck className="h-3.5 w-3.5" /> Shipped
          </span>
        );
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-medium text-emerald-800 border border-emerald-200/60">
            <CheckCircle2 className="h-3.5 w-3.5" /> Delivered
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[12px] font-medium text-rose-800 border border-rose-200/60">
            <XCircle className="h-3.5 w-3.5" /> Cancelled
          </span>
        );
    }
  };

  if (customerOrders.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nordic-gray/10 text-nordic-charcoal">
          <ShoppingBag className="h-8 w-8 stroke-[1.2]" />
        </div>
        <h1 className="mt-6 font-serif text-[32px] font-semibold text-nordic-charcoal">
          No Orders Placed Yet
        </h1>
        <p className="mt-3 font-sans text-[14px] text-nordic-sage-dark max-w-md mx-auto">
          When you purchase any of our timeless Scandinavian designs, your
          orders and real-time delivery tracking will appear here.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block border border-nordic-charcoal bg-nordic-charcoal px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-widest text-white transition-all hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="border-b border-nordic-gray/20 pb-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-nordic-terracotta" />
          <span className="font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-sage-dark">
            Account Activity
          </span>
        </div>
        <h1 className="mt-2 font-serif text-[32px] font-semibold text-nordic-charcoal">
          Your Order History
        </h1>
      </div>

      <div className="mt-10 space-y-10">
        {customerOrders.map((order) => (
          <div
            key={order.id}
            className="border border-nordic-gray/20 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-nordic-gray/15 pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-[14px] font-semibold text-nordic-charcoal">
                  {order.id}
                </span>
                <p className="mt-1 font-sans text-[12px] text-nordic-sage-dark">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {getStatusBadge(order.status)}
                <span className="font-serif text-[20px] font-semibold text-nordic-charcoal">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Live Interactive Stepper Timeline */}
            <OrderTimeline status={order.status} />

            <div className="mt-8 divide-y divide-nordic-gray/10 border-t border-nordic-gray/15 pt-6">
              {order.items.length === 0 ? (
                <p className="py-4 font-sans text-[13px] text-nordic-sage-dark italic">
                  Pre-configured sample order package.
                </p>
              ) : (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover bg-nordic-gray/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-serif text-[15px] font-medium text-nordic-charcoal hover:text-nordic-terracotta transition-colors truncate block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="font-sans text-[12px] text-nordic-sage-dark mt-0.5">
                        Qty: {item.quantity} · $
                        {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {order.gift?.isGift && (
              <div className="mt-6 border-t border-nordic-gray/15 pt-4 bg-[#fbf9f5] p-4 border">
                <div className="flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-wider text-nordic-terracotta">
                  <Gift className="h-4 w-4" /> Gift Packaging Included
                </div>
                {order.gift.recipientName && (
                  <p className="mt-1 font-sans text-[13px] text-nordic-charcoal">
                    <strong className="font-medium text-nordic-sage-dark">
                      Recipient:
                    </strong>{" "}
                    {order.gift.recipientName}
                  </p>
                )}
                {order.gift.giftMessage && (
                  <p className="mt-1 font-sans text-[13px] italic text-nordic-sage-dark">
                    "{order.gift.giftMessage}"
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col justify-between gap-2 border-t border-nordic-gray/15 pt-4 font-sans text-[12px] text-nordic-sage-dark sm:flex-row sm:items-center">
              <span>
                Shipping to:{" "}
                <strong className="text-nordic-charcoal font-medium">
                  {order.address}, {order.city}
                </strong>
              </span>
              <span className="capitalize">
                Current Status:{" "}
                <strong className="text-nordic-charcoal font-medium">
                  {order.status}
                </strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
