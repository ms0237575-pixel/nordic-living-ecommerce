import { useState } from "react";
import { Link } from "react-router";
import { CartItem } from "@/components/cart/CartItem";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Truck, Check, Sparkles } from "lucide-react";

const validPromoCodes: Record<string, number> = {
  NORDIC10: 0.1,
  WELCOME20: 0.2,
};

const FREE_SHIPPING_THRESHOLD = 500;

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState<number>(0);
  const [appliedCodeName, setAppliedCodeName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyPromo = () => {
    const normalized = promoCode.trim().toUpperCase();

    if (!normalized || !validPromoCodes[normalized]) {
      setErrorMsg("Invalid promo code");
      setDiscount(0);
      setAppliedCodeName(null);
      return;
    }

    setDiscount(validPromoCodes[normalized]);
    setAppliedCodeName(normalized);
    setErrorMsg(null);
    toast.success(`Promo code ${normalized} applied!`);
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setDiscount(0);
    setAppliedCodeName(null);
    setErrorMsg(null);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          Your Cart is Empty
        </h1>
        <p className="mt-3 font-sans text-body font-normal text-nordic-sage-dark">
          Discover thoughtful pieces for your home.
        </p>
        <Link
          to="/shop"
          className="mt-8 border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-nordic-gray/20 pb-6">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          Your Cart
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="font-sans text-button font-medium uppercase tracking-widest text-nordic-sage-dark transition-colors duration-300 hover:text-nordic-terracotta"
        >
          Clear Cart
        </button>
      </div>

      <div className="mb-10 mt-8 border border-nordic-gray/20 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          {progress >= 100 ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nordic-sage-dark/20 text-nordic-sage-dark">
              <Check className="h-4 w-4 stroke-[2.5]" />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nordic-terracotta/10 text-nordic-terracotta">
              <Truck className="h-4 w-4 stroke-2" />
            </div>
          )}
          <p className="font-sans text-[13px] font-medium tracking-wide text-nordic-charcoal">
            {progress >= 100 ? (
              <span className="flex items-center gap-1.5 text-nordic-charcoal">
                You have unlocked{" "}
                <strong className="text-nordic-terracotta">
                  Free Shipping
                </strong>{" "}
                on this order!
                <Sparkles className="inline h-4 w-4 text-nordic-terracotta" />
              </span>
            ) : (
              <span>
                Add{" "}
                <strong className="text-nordic-terracotta">
                  ${remainingForFreeShipping.toFixed(2)}
                </strong>{" "}
                more to qualify for{" "}
                <strong className="text-nordic-charcoal">Free Shipping</strong>.
              </span>
            )}
          </p>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-nordic-gray/20">
          <div
            className={`h-full transition-all duration-700 ease-out ${
              progress >= 100 ? "bg-nordic-sage-dark" : "bg-nordic-terracotta"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <section aria-label="Cart items" className="space-y-6">
          {cart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onRemove={(productId) => {
                const found = cart.find((c) => c.product.id === productId);
                removeFromCart(productId);
                if (found) {
                  toast(`${found.product.name} removed from cart`);
                }
              }}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </section>

        <aside className="sticky top-28 h-fit border border-nordic-gray/20 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="border-b border-nordic-gray/20 pb-4 font-serif text-[22px] font-semibold text-nordic-charcoal">
            Order Summary
          </h2>

          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault();
              handleApplyPromo();
            }}
          >
            <label
              htmlFor="promo-code"
              className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-nordic-sage-dark"
            >
              Promo code
            </label>
            <div className="flex gap-2">
              <input
                id="promo-code"
                type="text"
                value={promoCode}
                onChange={(event) => {
                  setPromoCode(event.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="NORDIC10"
                className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[13px] uppercase text-nordic-charcoal outline-none transition-colors duration-300 placeholder:text-nordic-sage-dark/60 focus:border-nordic-charcoal"
              />
              <button
                type="submit"
                className="border border-nordic-charcoal bg-nordic-charcoal px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta"
              >
                Apply
              </button>
            </div>
            {errorMsg && (
              <p className="mt-2 font-sans text-[12px] text-nordic-terracotta">
                {errorMsg}
              </p>
            )}
            {appliedCodeName && (
              <div className="mt-3 flex items-center justify-between bg-nordic-gray/10 px-3 py-1.5">
                <span className="font-sans text-[12px] font-medium text-nordic-charcoal">
                  Code{" "}
                  <strong className="text-nordic-terracotta">
                    {appliedCodeName}
                  </strong>{" "}
                  applied
                </span>
                <button
                  type="button"
                  onClick={handleRemovePromo}
                  className="font-sans text-[11px] uppercase tracking-wider text-nordic-sage-dark transition-colors hover:text-nordic-terracotta"
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          <div className="mt-6 space-y-3 border-t border-nordic-gray/20 pt-5">
            <div className="flex items-center justify-between font-sans text-[14px] font-normal text-nordic-charcoal">
              <span>Subtotal</span>
              <span className="font-semibold text-nordic-charcoal">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between font-sans text-[14px] font-normal text-nordic-charcoal">
                <span>Discount ({Math.round(discount * 100)}%)</span>
                <span className="font-semibold text-nordic-terracotta">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between font-sans text-[14px] font-normal text-nordic-charcoal">
              <span>Shipping</span>
              <span className="font-semibold text-nordic-charcoal">
                {progress >= 100 ? (
                  <span className="uppercase text-nordic-sage-dark tracking-wider text-[12px]">
                    Free
                  </span>
                ) : (
                  "Calculated at checkout"
                )}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-nordic-gray/20 pt-4 font-sans text-[16px] text-nordic-charcoal">
              <span className="font-medium">Total</span>
              <span className="font-bold text-nordic-terracotta">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="mt-4 font-sans text-[12px] leading-relaxed text-nordic-sage-dark">
            Taxes and remaining shipping terms are confirmed during checkout.
          </p>

          <Link
            to="/checkout"
            className="mt-6 block border border-nordic-charcoal bg-nordic-charcoal px-6 py-4 text-center font-sans text-button font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
