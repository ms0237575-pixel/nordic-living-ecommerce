import { Link } from "react-router";
import { CartItem } from "@/components/cart/CartItem";
import { useCartStore } from "@/store/useCartStore";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

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
          className="mt-8 border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors duration-300 hover:text-nordic-terracotta"
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
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </section>

        <aside className="h-fit border border-nordic-gray/20 bg-nordic-charcoal/3 p-6">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
            Order Summary
          </h2>
          <div className="mt-6 flex items-center justify-between border-t border-nordic-gray/20 pt-5 font-sans text-body font-normal text-nordic-charcoal">
            <span>Subtotal</span>
            <span className="font-semibold text-nordic-terracotta">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <p className="mt-3 font-sans text-body font-normal text-nordic-sage">
            Shipping and taxes are calculated at checkout.
          </p>
          <Link
            to="/checkout"
            className="mt-6 block border border-nordic-charcoal bg-nordic-charcoal px-6 py-4 text-center font-sans text-button font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:bg-nordic-charcoal/90"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
