import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import SearchOverlay from "@/components/layout/SearchOverlay";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === "/";
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast.success("Successfully logged out");
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
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          display: inline-flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full overflow-x-hidden">
        {isHome && (
          <div className="relative flex h-9 w-full items-center overflow-hidden border-b border-nordic-charcoal/5 bg-nordic-bg text-nordic-charcoal">
            <div className="flex h-full w-full items-center overflow-hidden whitespace-nowrap">
              <div className="animate-marquee">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="mx-8 text-caption font-medium uppercase tracking-widest shrink-0"
                    >
                      Complimentary worldwide shipping on orders over $500 ·
                      Handcrafted in Copenhagen
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}

        <nav
          className={`w-full transition-all duration-500 ${
            isScrolled
              ? "bg-nordic-bg/95 backdrop-blur-md border-b border-nordic-charcoal/10 text-nordic-charcoal shadow-sm py-3"
              : isHome
                ? "bg-transparent border-b-0 text-white py-4"
                : "bg-nordic-bg/95 backdrop-blur-md border-b border-nordic-charcoal/10 text-nordic-charcoal py-4"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 h-10 w-10 inline-flex items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex-1 text-center lg:text-left lg:flex-none">
                <Link
                  to="/"
                  onClick={makeNavHandler("/", false)}
                  className="inline-block font-serif text-3xl font-normal text-inherit transition-colors hover:text-nordic-terracotta lg:text-[30px]"
                >
                  Nordic Living
                </Link>
              </div>

              <div className="hidden lg:flex lg:gap-x-10">
                <Link
                  to="/"
                  onClick={makeNavHandler("/", false)}
                  className="font-sans text-xs font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={makeNavHandler("/shop", false)}
                  className="font-sans text-xs font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Collection
                </Link>
                <Link
                  to="/about"
                  onClick={makeNavHandler("/about", false)}
                  className="font-sans text-xs font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Philosophy
                </Link>
                <Link
                  to="/orders"
                  onClick={makeNavHandler("/orders", false)}
                  className="font-sans text-xs font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Orders
                </Link>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setSearchOverlayOpen(true)}
                  className="p-2 h-10 w-10 inline-flex items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 stroke-[1.5]" />
                </button>

                <Link
                  to="/wishlist"
                  onClick={makeNavHandler("/wishlist", false)}
                  aria-label="Wishlist"
                  className="relative p-2 h-10 w-10 inline-flex items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                >
                  <Heart className="h-5 w-5 stroke-[1.5]" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-nordic-terracotta font-sans text-[10px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  onClick={makeNavHandler("/cart", false)}
                  aria-label="Shopping bag"
                  className="relative p-2 h-10 w-10 inline-flex items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-nordic-terracotta font-sans text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Sign Out"
                    className="hidden lg:inline-flex p-2 h-10 w-10 items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                  >
                    <LogOut className="h-5 w-5 stroke-[1.5]" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={makeNavHandler("/login", false)}
                    title="Account Login"
                    className="hidden lg:inline-flex p-2 h-10 w-10 items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                  >
                    <User className="h-5 w-5 stroke-[1.5]" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-nordic-charcoal/40 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />

          <aside className="fixed left-0 top-0 z-50 h-full w-80 bg-white text-nordic-charcoal shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between border-b border-nordic-gray/20 pb-4">
                <span className="font-serif text-[22px] font-normal text-inherit">
                  Nordic Living
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="h-10 w-10 flex items-center justify-center text-inherit hover:text-nordic-terracotta transition-colors"
                >
                  <X className="h-6 w-6 stroke-[1.5]" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-1">
                <Link
                  to="/"
                  onClick={makeNavHandler("/", true)}
                  className="py-3 font-sans text-sm font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={makeNavHandler("/shop", true)}
                  className="py-3 font-sans text-sm font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Collection
                </Link>
                <Link
                  to="/about"
                  onClick={makeNavHandler("/about", true)}
                  className="py-3 font-sans text-sm font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Philosophy
                </Link>
                <Link
                  to="/orders"
                  onClick={makeNavHandler("/orders", true)}
                  className="py-3 font-sans text-sm font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Orders
                </Link>
                <Link
                  to="/wishlist"
                  onClick={makeNavHandler("/wishlist", true)}
                  className="py-3 font-sans text-sm font-medium uppercase tracking-widest text-inherit transition-colors hover:text-nordic-terracotta"
                >
                  Wishlist ({wishlistCount})
                </Link>
              </nav>
            </div>

            <div className="border-t border-nordic-gray/20 pt-4">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 py-3 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-terracotta"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={makeNavHandler("/login", true)}
                  className="flex w-full items-center justify-center gap-2 border border-nordic-charcoal bg-nordic-charcoal py-3 font-sans text-[12px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-nordic-terracotta hover:border-nordic-terracotta"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              )}
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

export default Navbar;
