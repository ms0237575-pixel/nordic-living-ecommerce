import { Link } from "react-router";
import type { Product } from "@/types/product";
import type { MouseEvent } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full backdrop-blur-sm transition-colors hover:bg-white"
      >
        <Heart
          className={`h-5 w-5 ${
            isInWishlist
              ? "fill-nordic-terracotta text-nordic-terracotta"
              : "text-nordic-charcoal"
          }`}
        />
      </button>

      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-4/5 w-full overflow-hidden bg-nordic-gray/10">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="font-sans text-body font-normal text-nordic-charcoal transition-colors duration-300 group-hover:text-nordic-terracotta">
            {product.name}
          </h3>
          <p className="font-sans text-body font-medium text-nordic-terracotta">
            ${product.price}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-4 w-full border border-nordic-gray/20 py-3 text-center font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-charcoal transition-colors hover:bg-nordic-charcoal hover:text-white"
          >
            + Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
}
