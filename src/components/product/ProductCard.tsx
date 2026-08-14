import { Link } from "react-router";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
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
        </div>
      </Link>
    </div>
  );
}
