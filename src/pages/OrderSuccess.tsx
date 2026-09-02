import { useState } from "react";
import {
  Check,
  Copy,
  PackageCheck,
  Truck,
  Clock,
  Sparkles,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";

function formatDeliveryDate(daysAhead: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function OrderSuccess() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderIdFromUrl = params.get("orderId");
  const orderId = orderIdFromUrl
    ? orderIdFromUrl.startsWith("#")
      ? orderIdFromUrl
      : `#${orderIdFromUrl}`
    : `#NC-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedDelivery = formatDeliveryDate(4);
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId.replace("#", ""));
    setCopied(true);
    toast.success("Order ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl border border-nordic-gray/20 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-nordic-terracotta/10 text-nordic-terracotta">
          <Check className="h-9 w-9 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-nordic-gray/10 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-nordic-sage-dark">
          <Sparkles className="h-3.5 w-3.5 text-nordic-terracotta" />
          Order Placed Successfully
        </div>

        <h1 className="mt-4 font-serif text-xl md:text-[36px] lg:text-[44px] font-semibold text-nordic-charcoal">
          Thank you for your order.
        </h1>
        <p className="mx-auto mt-3 max-w-lg font-sans text-[15px] leading-relaxed text-nordic-sage-dark">
          We’ve received your order and our Copenhagen artisans are preparing
          your pieces with care and craftsmanship.
        </p>

        <div className="mt-8 border border-nordic-gray/20 bg-nordic-bg p-6 text-left">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-nordic-sage-dark">
                Order Reference
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-serif text-[20px] font-semibold text-nordic-charcoal">
                  {orderId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  aria-label="Copy Order ID"
                  className="p-1 text-nordic-sage-dark transition-colors hover:text-nordic-terracotta"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-nordic-sage-dark">
                Estimated Delivery
              </p>
              <p className="mt-1 font-sans text-[15px] font-medium text-nordic-charcoal">
                {estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        {/* Order Progress Timeline */}
        <div className="mt-10 border-t border-nordic-gray/15 pt-8">
          <h2 className="mb-6 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-nordic-charcoal">
            Fulfillment Steps
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nordic-charcoal text-white">
                <Clock className="h-4 w-4" />
              </div>
              <span className="mt-2 font-sans text-[12px] font-medium text-nordic-charcoal">
                Confirmed
              </span>
              <span className="text-[11px] text-nordic-sage-dark">
                Payment received
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nordic-gray/20 text-nordic-charcoal">
                <PackageCheck className="h-4 w-4" />
              </div>
              <span className="mt-2 font-sans text-[12px] font-medium text-nordic-charcoal">
                Processing
              </span>
              <span className="text-[11px] text-nordic-sage-dark">
                Quality check
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nordic-gray/20 text-nordic-charcoal">
                <Truck className="h-4 w-4" />
              </div>
              <span className="mt-2 font-sans text-[12px] font-medium text-nordic-charcoal">
                Dispatched
              </span>
              <span className="text-[11px] text-nordic-sage-dark">
                Doorstep delivery
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/shop"
            className="border border-nordic-charcoal bg-nordic-charcoal px-6 sm:px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="border border-nordic-charcoal px-6 sm:px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:bg-nordic-charcoal hover:text-white"
          >
            Track in Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
