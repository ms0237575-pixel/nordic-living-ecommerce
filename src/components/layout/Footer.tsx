import { Link, useLocation } from "react-router";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const location = useLocation();
  return (
    <footer className="mt-16 border-t border-nordic-gray/20 bg-nordic-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === "/")
                  window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 font-serif text-[32px] text-nordic-charcoal"
            >
              Nordic Living
            </Link>
            <div className="mt-2 font-sans text-body font-normal text-nordic-sage">
              Thoughtful design, made to last.
            </div>

            <div className="mt-4 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 h-11 w-11 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                <FaInstagram className="h-5 w-5" aria-hidden />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="p-2 h-11 w-11 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                <FaXTwitter className="h-5 w-5" aria-hidden />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="p-2 h-11 w-11 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                <FaFacebookF className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-body font-normal text-nordic-charcoal">
              <Link
                to="/shop"
                className="transition-colors hover:text-nordic-terracotta"
              >
                Shop
              </Link>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    if (location.pathname === "/")
                      window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="font-sans text-body font-normal text-nordic-charcoal hover:text-nordic-terracotta"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-sans text-body font-normal text-nordic-charcoal hover:text-nordic-terracotta"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-body font-normal text-nordic-charcoal">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  className="font-sans text-body font-normal text-nordic-charcoal hover:text-nordic-terracotta"
                  href="#"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  className="font-sans text-body font-normal text-nordic-charcoal hover:text-nordic-terracotta"
                  href="#"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  className="font-sans text-body font-normal text-nordic-charcoal hover:text-nordic-terracotta"
                  href="#"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  className="font-sans text-body font-normal text-nordic-charcoal hover:text-nordic-terracotta"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-subtitle text-nordic-charcoal">
              Stay Updated
            </h3>
            <p className="mt-2 font-sans text-body font-normal text-nordic-sage">
              Get new product drops and exclusive offers.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex w-full max-w-sm items-center"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border border-nordic-gray/20 rounded-none px-3 py-2 font-sans text-body font-normal text-nordic-charcoal"
                aria-label="Email address"
              />
              <button
                className="ml-2 rounded-none border border-nordic-gray/20 bg-nordic-charcoal px-4 py-2 font-sans text-button font-medium text-white"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-nordic-gray/20 bg-nordic-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-left font-sans text-caption font-normal text-nordic-sage">
            © 2026 Nordic Living. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
