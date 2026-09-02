import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);
    toast.success("Thank you for subscribing to Nordic Living.");
    setEmail("");
  };

  return (
    <footer className="mt-20 border-t border-nordic-charcoal/10 bg-nordic-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 space-y-6">
            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className="inline-block font-serif text-2xl md:text-[32px] font-semibold text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
            >
              Nordic Living
            </Link>
            <p className="max-w-sm font-sans text-[14px] leading-relaxed text-nordic-charcoal">
              Crafted with honest materials, quiet forms, and Scandinavian
              clarity. Curated furniture and tactile accents made to endure.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                onClick={(event) => event.preventDefault()}
                className="flex h-10 w-10 items-center justify-center border border-nordic-charcoal/20 bg-white/50 text-nordic-charcoal transition-all duration-300 hover:border-nordic-terracotta hover:bg-nordic-terracotta hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                onClick={(event) => event.preventDefault()}
                className="flex h-10 w-10 items-center justify-center border border-nordic-charcoal/20 bg-white/50 text-nordic-charcoal transition-all duration-300 hover:border-nordic-terracotta hover:bg-nordic-terracotta hover:text-white"
              >
                <MapPin className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                onClick={(event) => event.preventDefault()}
                className="flex h-10 w-10 items-center justify-center border border-nordic-charcoal/20 bg-white/50 text-nordic-charcoal transition-all duration-300 hover:border-nordic-terracotta hover:bg-nordic-terracotta hover:text-white"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-nordic-charcoal">
              Explore
            </h3>
            <ul className="space-y-3 font-sans text-[14px] text-nordic-charcoal">
              <li>
                <Link
                  to="/"
                  onClick={() => handleNavClick("/")}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={() => handleNavClick("/shop")}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Furniture"
                  onClick={() => handleNavClick("/shop?category=Furniture")}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Furniture
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Accessories"
                  onClick={() => handleNavClick("/shop?category=Accessories")}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => handleNavClick("/about")}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-nordic-charcoal">
              Assistance
            </h3>
            <ul className="space-y-3 font-sans text-[14px] text-nordic-charcoal">
              <li>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Product Care
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="transition-colors hover:text-nordic-terracotta"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-nordic-charcoal">
              The Journal & Offers
            </h3>
            <p className="font-sans text-[14px] leading-relaxed text-nordic-charcoal">
              Subscribe to receive private preview access, architectural
              stories, and 10% off your initial order.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex flex-col gap-2"
            >
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border border-nordic-charcoal/20 bg-white px-4 py-3.5 pr-12 font-sans text-[13px] text-nordic-charcoal outline-none transition-colors duration-300 placeholder:text-nordic-sage-dark/60 focus:border-nordic-charcoal"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-nordic-charcoal text-white transition-colors duration-300 hover:bg-nordic-terracotta"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {subscribed && (
                <p className="flex items-center gap-1.5 font-sans text-[12px] font-medium text-nordic-charcoal">
                  <Check className="h-3.5 w-3.5 text-nordic-terracotta" />
                  You are now subscribed to our private list.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-nordic-charcoal/10 bg-nordic-bg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <div className="font-sans text-caption text-nordic-charcoal">
            © 2026 Nordic Living Copenhagen. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-sans text-caption uppercase tracking-wider text-nordic-charcoal">
            <span>Sustainable Craft</span>
            <span>·</span>
            <span>Danish Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
