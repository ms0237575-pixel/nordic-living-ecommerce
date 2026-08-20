import { Check } from "lucide-react";
import { Link, useLocation } from "react-router";

function formatDeliveryDate(daysAhead: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);

  return new Intl.DateTimeFormat("en-US", {
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

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl border border-nordic-gray/20 bg-nordic-charcoal/3 p-8 text-center sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-nordic-terracotta/30 bg-nordic-terracotta/10 text-nordic-terracotta">
          <Check className="h-7 w-7" />
        </div>

        <p className="font-sans text-button font-medium uppercase tracking-[0.18em] text-nordic-sage-dark">
          Order confirmed
        </p>
        <h1 className="mt-4 font-serif text-[36px] text-nordic-charcoal md:text-[44px]">
          Thank you for your order.
        </h1>
        <p className="mt-4 font-sans text-[15px] text-nordic-sage-dark">
          Your order has been placed successfully and is now being prepared with
          care.
        </p>

        <div className="mt-8 border border-nordic-gray/20 bg-nordic-bg p-5 text-left sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-nordic-sage-dark">
                Order reference
              </p>
              <p className="mt-2 font-sans text-subtitle font-medium text-nordic-charcoal">
                {orderId}
              </p>
            </div>

            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-nordic-sage-dark">
                Estimated delivery
              </p>
              <p className="mt-2 font-sans text-subtitle font-medium text-nordic-charcoal">
                {estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/shop"
            className="border border-nordic-charcoal bg-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:bg-nordic-charcoal/90"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors duration-300 hover:text-nordic-terracotta"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
