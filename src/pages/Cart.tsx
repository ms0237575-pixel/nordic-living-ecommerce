import { useState } from "react";
import { Link } from "react-router";
import { CartItem } from "@/components/cart/CartItem";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const validPromoCodes: Record<string, number> = {
  NORDIC10: 0.1,
  WELCOME20: 0.2,
};

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
        <p className="mt-3 font-sans text-body font-normal text-nordic-sage">
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
          className="font-sans text-button font-medium uppercase tracking-widest text-nordic-sage transition-colors duration-300 hover:text-nordic-terracotta"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <section aria-label="Cart items">
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

        <aside className="h-fit border border-nordic-gray/20 bg-nordic-charcoal/3 p-6">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
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
              className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-nordic-sage"
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
                placeholder="Enter code"
                className="w-full border border-nordic-gray/30 bg-white px-3 py-3 font-sans text-body text-nordic-charcoal outline-none transition-colors duration-300 placeholder:text-nordic-sage focus:border-nordic-charcoal"
              />
              <button
                type="submit"
                className="border border-nordic-charcoal px-4 py-3 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
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
              <button
                type="button"
                onClick={handleRemovePromo}
                className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-nordic-sage transition-colors duration-300 hover:text-nordic-terracotta"
              >
                Remove code
              </button>
            )}
          </form>

          <div className="mt-6 space-y-3 border-t border-nordic-gray/20 pt-5">
            <div className="flex items-center justify-between font-sans text-body font-normal text-nordic-charcoal">
              <span>Subtotal</span>
              <span className="font-semibold text-nordic-charcoal">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between font-sans text-body font-normal text-nordic-charcoal">
                <span>Discount ({Math.round(discount * 100)}%)</span>
                <span className="font-semibold text-nordic-terracotta">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-nordic-gray/20 pt-4 font-sans text-body font-normal text-nordic-charcoal">
              <span>Total</span>
              <span className="font-semibold text-nordic-terracotta">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="mt-4 font-sans text-body font-normal text-nordic-sage">
            Shipping and taxes are calculated at checkout.
          </p>
          <Link
            to="/checkout"
            className="mt-6 block border border-nordic-charcoal px-6 py-4 text-center font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
