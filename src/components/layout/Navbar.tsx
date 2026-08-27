import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useWishlistStore } from "@/store/useWishlistStore";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast("Logged out");
  };

  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const makeNavHandler =
    (path: string, closeDrawer = false) =>
    () => {
      if (closeDrawer) setOpen(false);
      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {isHome && (
          <div className="relative flex items-center bg-[#F4F0EB] text-nordic-charcoal overflow-hidden h-10 border-b border-nordic-charcoal/5">
            <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center h-full">
              <div className="animate-marquee inline-block">
                {Array(10)
                  .fill(null)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="mx-8 text-[11px] font-medium tracking-widest uppercase"
                    >
                      Welcome, Sign up{" "}
                      <Link
                        to="/login"
                        className="underline underline-offset-4 hover:text-nordic-terracotta transition-colors"
                      >
                        here
                      </Link>{" "}
                      and get 10% off!
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}

        <nav
          className={`w-full border-b transition-all duration-500 ${
            isHome && !isScrolled
              ? "bg-transparent border-transparent text-white py-5"
              : "bg-nordic-bg/95 backdrop-blur-md border-nordic-charcoal/10 text-nordic-charcoal shadow-sm py-3"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 h-11 w-11 inline-flex items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex-1 text-center lg:text-left lg:flex-none">
                <Link
                  to="/"
                  onClick={makeNavHandler("/", false)}
                  className="flex items-center justify-center gap-2 font-serif text-[28px] lg:text-[32px] font-semibold text-inherit lg:justify-start hover:text-nordic-terracotta transition-colors"
                >
                  Nordic Living
                </Link>
              </div>

              <div className="hidden lg:flex lg:gap-x-12">
                <Link
                  to="/"
                  onClick={makeNavHandler("/", false)}
                  className="font-sans text-[12px] font-medium uppercase tracking-widest text-inherit hover:text-nordic-terracotta transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={makeNavHandler("/shop", false)}
                  className="font-sans text-[12px] font-medium uppercase tracking-widest text-inherit hover:text-nordic-terracotta transition-colors"
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  onClick={makeNavHandler("/about", false)}
                  className="font-sans text-[12px] font-medium uppercase tracking-widest text-inherit hover:text-nordic-terracotta transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/orders"
                  onClick={makeNavHandler("/orders", false)}
                  className="font-sans text-[12px] font-medium uppercase tracking-widest text-inherit hover:text-nordic-terracotta transition-colors"
                >
                  Orders
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2 lg:gap-6 lg:flex-none">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="hidden items-center font-sans text-[12px] font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta sm:inline-flex"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={makeNavHandler("/login", false)}
                    className="hidden items-center font-sans text-[12px] font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta sm:inline-flex"
                  >
                    Login
                  </Link>
                )}

                <button
                  onClick={() => setSearchOverlayOpen(true)}
                  className="p-2 h-11 w-11 inline-flex items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5 stroke-[1.5]" />
                </button>

                <Link
                  to="/cart"
                  onClick={makeNavHandler("/cart", false)}
                  aria-label="Shopping cart"
                  className="relative group text-inherit hover:text-nordic-terracotta transition-colors p-2 h-11 w-11 inline-flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 stroke-[1.5]" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-nordic-terracotta font-sans text-[10px] font-bold text-white group-hover:bg-nordic-charcoal transition-colors">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/wishlist"
                  onClick={makeNavHandler("/wishlist", false)}
                  aria-label="Wishlist"
                  className="relative group text-inherit hover:text-nordic-terracotta transition-colors p-2 h-11 w-11 inline-flex items-center justify-center"
                >
                  <Heart className="h-5 w-5 stroke-[1.5]" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-nordic-terracotta font-sans text-[10px] font-bold text-white group-hover:bg-nordic-charcoal transition-colors">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-nordic-charcoal/40 transition-opacity"
            onClick={() => setOpen(false)}
          />

          <aside className="fixed left-0 top-0 z-50 h-full w-80 bg-nordic-bg shadow-xl animate-in slide-in-from-left duration-300 flex flex-col">
            <div className="px-6 pt-6 pb-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-12">
                <div className="font-serif text-[24px] font-semibold text-nordic-charcoal">
                  Nordic Living
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="h-11 w-11 flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                >
                  <X className="h-6 w-6 stroke-[1.5]" />
                </button>
              </div>

              <nav className="flex flex-col">
                <Link
                  to="/"
                  onClick={makeNavHandler("/", true)}
                  className="border-b border-nordic-gray/20 py-4 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={makeNavHandler("/shop", true)}
                  className="border-b border-nordic-gray/20 py-4 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  onClick={makeNavHandler("/about", true)}
                  className="border-b border-nordic-gray/20 py-4 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/orders"
                  onClick={makeNavHandler("/orders", true)}
                  className="border-b border-nordic-gray/20 py-4 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                >
                  Orders
                </Link>
                <Link
                  to="/wishlist"
                  onClick={makeNavHandler("/wishlist", true)}
                  className="border-b border-nordic-gray/20 py-4 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                >
                  Wishlist
                </Link>
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full border-b border-nordic-gray/20 py-4 text-left font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={makeNavHandler("/login", true)}
                    className="border-b border-nordic-gray/20 py-4 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </aside>
        </div>
      )}

      <SearchOverlay
        isOpen={searchOverlayOpen}
        onClose={() => setSearchOverlayOpen(false)}
      />
    </>
  );
}
