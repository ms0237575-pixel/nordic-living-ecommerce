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

    toast.custom((t) => (
      <div className="flex w-full min-w-60 md:min-w-[320px] max-w-95 items-center gap-4 bg-nordic-charcoal p-4 text-nordic-bg shadow-2xl border border-white/10">
        <img
          src={product.image}
          alt={product.name}
          width={56}
          height={56}
          className="h-14 w-14 object-cover shrink-0 bg-white/5"
        />
        <div className="flex-1 min-w-0">
          <p className="font-serif text-[14px] font-medium text-white truncate">
            {product.name}
          </p>
          <p className="font-sans text-[12px] text-white/60">
            Added to your cart · ${product.price}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            toast.dismiss(t);
            navigate("/cart");
          }}
          className="shrink-0 border-b border-nordic-terracotta pb-0.5 font-sans text-[11px] font-medium uppercase tracking-widest text-nordic-terracotta transition-colors hover:text-white"
        >
          View Cart
        </button>
      </div>
    ));
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

  const hoverImage =
    product.images && product.images.length > 1 ? product.images[1] : null;

  return (
    <div className="group/card relative">
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
        <div className="aspect-4/5 w-full overflow-hidden bg-nordic-gray/10 relative">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={400}
            height={500}
            className={`h-full w-full object-cover object-center ${
              hoverImage
                ? "absolute inset-0 transition-opacity duration-500 group-hover/card:opacity-0"
                : ""
            }`}
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={product.name}
              loading="lazy"
              width={400}
              height={500}
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            />
          )}
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="font-sans text-body font-normal text-nordic-charcoal transition-colors duration-300 group-hover/card:text-nordic-terracotta">
            {product.name}
          </h3>
          <p className="font-sans text-body font-medium text-nordic-terracotta">
            ${product.price}
          </p>

          <button
            type="button"
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

export default ProductCard;
