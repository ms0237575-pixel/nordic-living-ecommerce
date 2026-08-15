import { Link } from "react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/useWishlistStore";

export function Wishlist() {
  const wishlist = useWishlistStore((s) => s.wishlist);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-display mb-8">Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="font-serif text-h1 mb-6">Your wishlist is empty</div>
          <Link
            to="/shop"
            className="border border-nordic-charcoal px-6 py-3 uppercase tracking-widest font-sans hover:bg-nordic-charcoal hover:text-white transition-colors"
          >
            Browse shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
