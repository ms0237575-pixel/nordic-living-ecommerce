import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Search, Menu } from "lucide-react";
import Sheet, { SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchValue, setNavSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }

    function onClick(e: MouseEvent) {
      if (
        searchRef.current &&
        e.target instanceof Node &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const submitNavSearch = (value?: string) => {
    const q = (value ?? navSearchValue).trim();
    if (!q) return;
    setSearchOpen(false);
    setNavSearchValue("");
    navigate(`/shop?search=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-nordic-gray/20 bg-nordic-bg/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <button className="p-2 h-11 w-11 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors">
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <div className="px-4 pt-4 pb-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (navSearchValue.trim()) {
                        submitNavSearch(navSearchValue.trim());
                        setOpen(false);
                      }
                    }}
                    className="flex items-center"
                  >
                    <input
                      value={navSearchValue}
                      onChange={(e) => setNavSearchValue(e.target.value)}
                      placeholder="Search products"
                      aria-label="Search products"
                      className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
                    />
                    <button
                      type="submit"
                      className="ml-2 p-2 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                    >
                      <Search className="h-5 w-5 stroke-[1.5]" />
                    </button>
                  </form>
                </div>
                <nav className="flex flex-col">
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="mb-4 flex items-center gap-2 font-serif text-[28px] font-semibold text-nordic-charcoal"
                  >
                    Nordic Living
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      setOpen(false);
                      if (location.pathname === "/")
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full border-b border-nordic-gray/20 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="w-full border-b border-nordic-gray/20 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setOpen(false)}
                    className="w-full border-b border-nordic-gray/20 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
                  >
                    About
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setOpen(false)}
                    className="w-full border-b border-nordic-gray/20 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
                  >
                    Orders
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex-1 text-center lg:text-left lg:flex-none">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 font-serif text-[32px] font-semibold text-nordic-charcoal lg:justify-start"
            >
              Nordic Living
            </Link>
          </div>

          {/* TODO: Replace these simple links with Shadcn NavigationMenu component for Ferm Living style mega-dropdowns (e.g. "Shop" opens a panel with Shop by Room / Shop by Category). Do not implement now — current simple links must keep working as-is. */}
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === "/")
                  window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
            >
              About
            </Link>
            <Link
              to="/orders"
              className="font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
            >
              Orders
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-6 lg:flex-none">
            <div ref={searchRef} className="relative">
              {!searchOpen ? (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 h-11 w-11 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5 stroke-[1.5]" />
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitNavSearch();
                  }}
                  className="flex items-center"
                >
                  <input
                    autoFocus
                    value={navSearchValue}
                    onChange={(e) => setNavSearchValue(e.target.value)}
                    className="w-48 rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
                    placeholder="Search products"
                    aria-label="Search products"
                  />
                  <button
                    type="button"
                    onClick={() => submitNavSearch()}
                    className="ml-2 p-2 inline-flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
                    aria-label="Submit search"
                  >
                    <Search className="h-5 w-5 stroke-[1.5]" />
                  </button>
                </form>
              )}
            </div>

            <Link
              to="/cart"
              className="relative group text-nordic-charcoal hover:text-nordic-terracotta transition-colors p-2 h-11 w-11 inline-flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-nordic-terracotta font-sans text-[10px] font-normal text-white group-hover:bg-nordic-charcoal transition-colors">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
