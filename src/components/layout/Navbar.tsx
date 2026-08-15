import { Link, useLocation } from "react-router";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useWishlistStore } from "@/store/useWishlistStore";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);

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
      <nav className="sticky top-0 z-40 w-full border-b border-nordic-gray/20 bg-nordic-bg/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setOpen(true)}
                className="p-2 h-11 w-11 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Brand */}
            <div className="flex-1 text-center lg:text-left lg:flex-none">
              <Link
                to="/"
                onClick={makeNavHandler("/", false)}
                className="flex items-center justify-center gap-2 font-serif text-[28px] lg:text-[32px] font-semibold text-nordic-charcoal lg:justify-start hover:text-nordic-terracotta transition-colors"
              >
                Nordic Living
              </Link>
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex lg:gap-x-12">
              <Link
                to="/"
                onClick={makeNavHandler("/", false)}
                className="font-sans text-[12px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={makeNavHandler("/shop", false)}
                className="font-sans text-[12px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/about"
                onClick={makeNavHandler("/about", false)}
                className="font-sans text-[12px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                About
              </Link>
              <Link
                to="/orders"
                onClick={makeNavHandler("/orders", false)}
                className="font-sans text-[12px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                Orders
              </Link>
            </div>

            {/* Right controls */}
            <div className="flex flex-1 items-center justify-end gap-2 lg:gap-6 lg:flex-none">
              <Link
                to="/login"
                onClick={makeNavHandler("/login", false)}
                className="hidden items-center font-sans text-[12px] font-medium uppercase tracking-widest text-nordic-charcoal transition-colors hover:text-nordic-terracotta sm:inline-flex"
              >
                Login
              </Link>

              <button
                onClick={() => setSearchOverlayOpen(true)}
                className="p-2 h-11 w-11 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                aria-label="Open search"
              >
                <Search className="h-5 w-5 stroke-[1.5]" />
              </button>

              <Link
                to="/cart"
                onClick={makeNavHandler("/cart", false)}
                className="relative group text-nordic-charcoal hover:text-nordic-terracotta transition-colors p-2 h-11 w-11 inline-flex items-center justify-center"
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
                className="relative group text-nordic-charcoal hover:text-nordic-terracotta transition-colors p-2 h-11 w-11 inline-flex items-center justify-center"
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

      {/* Custom Mobile Drawer (No Shadcn Sheet) */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-nordic-charcoal/40 transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Sidebar */}
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
                  to="/login"
                  onClick={makeNavHandler("/login", true)}
                  className="border-b border-nordic-gray/20 py-4 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                >
                  Login
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Global Full-Screen Search Overlay */}
      <SearchOverlay
        isOpen={searchOverlayOpen}
        onClose={() => setSearchOverlayOpen(false)}
      />
    </>
  );
}
