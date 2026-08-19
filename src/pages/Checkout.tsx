import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useCartStore } from "@/store/useCartStore";
import type { CartItem } from "@/types/product";

interface CheckoutFormState {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
}

const initialFormState: CheckoutFormState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
};

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const shipping = cart.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    const generatedOrderId = Math.random().toString(36).substring(2, 9);
    const order = {
      id: generatedOrderId,
      date: new Date().toISOString(),
      items: cart.map((item) => ({ ...item })) as CartItem[],
      subtotal,
      shipping,
      total,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
      },
    };

    try {
      const storedOrders = localStorage.getItem("nordic-living-orders");
      const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
      const nextOrders = Array.isArray(parsedOrders) ? parsedOrders : [];
      nextOrders.push(order);
      localStorage.setItem("nordic-living-orders", JSON.stringify(nextOrders));
    } catch {
      localStorage.setItem("nordic-living-orders", JSON.stringify([order]));
    }

    clearCart();
    setOrderId(generatedOrderId);
    setSuccess(true);
    navigate(`/order-success?orderId=${encodeURIComponent(generatedOrderId)}`, {
      replace: true,
    });
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          Your cart is empty
        </h1>
        <Link
          to="/shop"
          className="mt-8 border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full border border-nordic-gray/20 bg-nordic-charcoal/3 p-8 text-center">
          <p className="font-sans text-button font-medium uppercase tracking-widest text-nordic-sage">
            Order placed
          </p>
          <h1 className="mt-4 font-serif text-h1 font-semibold text-nordic-charcoal">
            Thank You
          </h1>
          <p className="mt-4 font-sans text-body font-normal text-nordic-sage">
            Your order has been confirmed. Order ID: {orderId}
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-8">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          Checkout
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-16">
        <section className="border border-nordic-gray/20 bg-nordic-charcoal/3 p-6 sm:p-8">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
            Billing Details
          </h2>

          <form onSubmit={handlePlaceOrder} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
                />
              </div>

              <div>
                <label className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
              />
            </div>

            <div>
              <label className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
              />
            </div>

            <div>
              <label className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full border border-nordic-charcoal px-6 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
            >
              Place Order
            </button>
          </form>
        </section>

        <aside className="border border-nordic-gray/20 bg-nordic-charcoal/3 p-6 sm:p-8">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-4 border-b border-nordic-gray/20 pb-3"
              >
                <div>
                  <p className="font-sans text-body font-normal text-nordic-charcoal">
                    {item.product.name}
                  </p>
                  <p className="font-sans text-[14px] text-nordic-sage">
                    Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-sans text-body font-normal text-nordic-charcoal">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between font-sans text-body font-normal text-nordic-charcoal">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-sans text-body font-normal text-nordic-charcoal">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-nordic-gray/20 pt-3 font-sans text-body font-semibold text-nordic-charcoal">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
