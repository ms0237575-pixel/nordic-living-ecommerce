import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function Wishlist() {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist ?? (() => {}));
  const addToCart = useCartStore((s) => s.addToCart);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  const handleMoveAllToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    wishlist.forEach((item) => {
      addToCart(item);
    });

    // After moving all items to cart, clear the wishlist so items don't remain
    clearWishlist();

    toast.success(`Moved ${wishlist.length} item(s) to your cart`);
    navigate("/cart");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-nordic-gray/20 pb-6">
        <div>
          <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
            Your Wishlist
          </h1>
          <p className="mt-2 font-sans text-body text-nordic-sage-dark">
            {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved
            for later
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleMoveAllToCart}
              className="inline-flex items-center gap-2 border border-nordic-charcoal bg-nordic-charcoal px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
            >
              <ShoppingBag className="h-4 w-4 stroke-[1.8]" />
              Move all to cart
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-nordic-gray/10 text-nordic-sage-dark mb-6">
            <Heart className="h-7 w-7 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-[28px] font-medium text-nordic-charcoal">
            Your wishlist is empty
          </h2>
          <p className="mt-3 max-w-md font-sans text-body text-nordic-sage-dark">
            Save the pieces you love and revisit them anytime while curating
            your living space.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:bg-nordic-charcoal hover:text-white"
          >
            Explore Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
