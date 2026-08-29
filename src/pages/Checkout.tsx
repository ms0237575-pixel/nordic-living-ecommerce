import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import type { CartItem } from "@/types/product";
import { ShieldCheck, Truck, ArrowLeft, Lock, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface CheckoutFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "card" | "cod";
}

const initialFormState: CheckoutFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "card",
};

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 500 || cart.length === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderPayload = {
      customerName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      customerEmail: formData.email.trim(),
      customerPhone: formData.phone.trim() || undefined,
      address: formData.address.trim(),
      city: formData.city.trim(),
      items: cart.map((item) => ({ ...item })) as CartItem[],
      totalAmount: total,
    };

    const newOrderId = addOrder(orderPayload);

    clearCart();
    toast.success(`Order ${newOrderId} placed successfully!`);
    navigate(`/order-success?orderId=${encodeURIComponent(newOrderId)}`, {
      replace: true,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          Your cart is empty
        </h1>
        <p className="mt-3 font-sans text-body text-nordic-sage-dark">
          Add some curated pieces to proceed with checkout.
        </p>
        <Link
          to="/shop"
          className="mt-8 border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:bg-nordic-charcoal hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 font-sans text-[13px] text-nordic-sage-dark transition-colors hover:text-nordic-terracotta"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>
        <h1 className="mt-4 font-serif text-h1 font-semibold text-nordic-charcoal">
          Checkout
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-16">
        <section className="space-y-8">
          <form
            id="checkout-form"
            onSubmit={handlePlaceOrder}
            className="space-y-8"
          >
            <div className="border border-nordic-gray/20 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="border-b border-nordic-gray/20 pb-4 font-serif text-[20px] font-semibold text-nordic-charcoal">
                1. Shipping Address
              </h2>

              <div className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-sans text-[13px] uppercase tracking-wider text-nordic-sage-dark">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Henrik"
                      className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors focus:border-nordic-charcoal"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[13px] uppercase tracking-wider text-nordic-sage-dark">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Holm"
                      className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors focus:border-nordic-charcoal"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-sans text-[13px] uppercase tracking-wider text-nordic-sage-dark">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="henrik@example.com"
                      className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors focus:border-nordic-charcoal"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[13px] uppercase tracking-wider text-nordic-sage-dark">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+20 100 000 0000"
                      className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors focus:border-nordic-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[13px] uppercase tracking-wider text-nordic-sage-dark">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Apartment, suite, street"
                    className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors focus:border-nordic-charcoal"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-sans text-[13px] uppercase tracking-wider text-nordic-sage-dark">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. New Cairo"
                      className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors focus:border-nordic-charcoal"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[13px] uppercase tracking-wider text-nordic-sage-dark">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      placeholder="11835"
                      className="w-full border border-nordic-gray/30 bg-transparent px-3 py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors focus:border-nordic-charcoal"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-nordic-gray/20 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="border-b border-nordic-gray/20 pb-4 font-serif text-[20px] font-semibold text-nordic-charcoal">
                2. Payment Details
              </h2>

              <div className="mt-6 space-y-4">
                <label className="flex cursor-pointer items-center justify-between border border-nordic-gray/30 p-4 transition-colors hover:border-nordic-terracotta">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="text-nordic-terracotta focus:ring-0"
                    />
                    <div>
                      <p className="font-sans text-[14px] font-medium text-nordic-charcoal">
                        Credit / Debit Card
                      </p>
                      <p className="font-sans text-[12px] text-nordic-sage-dark">
                        Secure transaction with 256-bit encryption
                      </p>
                    </div>
                  </div>
                  <CreditCard className="h-5 w-5 text-nordic-sage-dark" />
                </label>

                <label className="flex cursor-pointer items-center justify-between border border-nordic-gray/30 p-4 transition-colors hover:border-nordic-terracotta">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="text-nordic-terracotta focus:ring-0"
                    />
                    <div>
                      <p className="font-sans text-[14px] font-medium text-nordic-charcoal">
                        Cash on Delivery
                      </p>
                      <p className="font-sans text-[12px] text-nordic-sage-dark">
                        Pay in cash upon doorstep arrival
                      </p>
                    </div>
                  </div>
                  <Truck className="h-5 w-5 text-nordic-sage-dark" />
                </label>
              </div>
            </div>
          </form>
        </section>

        <aside className="sticky top-28 h-fit border border-nordic-gray/20 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="border-b border-nordic-gray/20 pb-4 font-serif text-[20px] font-semibold text-nordic-charcoal">
            Order Review
          </h2>

          <div className="mt-6 max-h-80 overflow-y-auto space-y-4 pr-1">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 border-b border-nordic-gray/10 pb-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 bg-nordic-gray/10 object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-[14px] font-medium text-nordic-charcoal truncate">
                    {item.product.name}
                  </p>
                  <p className="font-sans text-[12px] text-nordic-sage-dark">
                    Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-sans text-[14px] font-medium text-nordic-charcoal shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-nordic-gray/20 pt-4 font-sans text-[14px]">
            <div className="flex items-center justify-between text-nordic-charcoal">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-nordic-charcoal">
              <span>Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-nordic-sage-dark uppercase text-[12px] tracking-wider">
                    Free
                  </span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-nordic-gray/20 pt-3 text-[16px] text-nordic-charcoal">
              <span className="font-semibold">Total Due</span>
              <span className="font-bold text-nordic-terracotta">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="mt-8 flex w-full items-center justify-center gap-2 border border-nordic-charcoal bg-nordic-charcoal px-6 py-4 font-sans text-[12px] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
          >
            <Lock className="h-4 w-4" />
            Complete Order (${total.toFixed(2)})
          </button>

          <div className="mt-6 space-y-2 border-t border-nordic-gray/10 pt-4 font-sans text-[12px] text-nordic-sage-dark">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-nordic-charcoal shrink-0" />
              <span>Encrypted SSL Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-nordic-charcoal shrink-0" />
              <span>30-Day Nordic Return Guarantee</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
