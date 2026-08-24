import { Link, useNavigate } from "react-router";
import type { Product } from "@/types/product";
import type { MouseEvent } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to save items to your wishlist.");
      navigate("/login");
      return;
    }

    const wasWished = isInWishlist;
    toggleWishlist(product);
    if (wasWished) {
      toast(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const hoverImage = product.images && product.images.length > 1
    ? product.images[1]
    : null;

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleToggleWishlist}
        aria-label="Toggle wishlist"
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
        <div className="aspect-4/5 w-full overflow-hidden bg-nordic-gray/10 relative group">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`h-full w-full object-cover object-center ${
              hoverImage
                ? "absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                : ""
            }`}
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
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
