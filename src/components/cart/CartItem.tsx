import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import type { CartItem as CartItemType } from "@/types/product";

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <article className="grid grid-cols-[96px_1fr] gap-4 border-b border-nordic-gray/20 py-6 sm:grid-cols-[120px_1fr_auto] sm:gap-6">
      <Link to={`/product/${product.slug}`} className="aspect-square overflow-hidden bg-nordic-gray/10">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </Link>

      <div className="flex min-w-0 flex-col">
        <Link
          to={`/product/${product.slug}`}
          className="font-serif text-[24px] leading-tight text-nordic-charcoal transition-colors duration-300 hover:text-nordic-terracotta"
        >
          {product.name}
        </Link>
        <p className="mt-2 font-sans text-body font-medium text-nordic-terracotta">
          ${product.price}
        </p>
        <div className="mt-5 inline-flex w-fit items-center border border-nordic-charcoal">
          <button
            type="button"
            aria-label={`Decrease quantity of ${product.name}`}
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            className="flex size-10 items-center justify-center text-nordic-charcoal transition-colors duration-300 hover:bg-nordic-gray/10"
          >
            <Minus className="size-4 stroke-[1.5]" />
          </button>
          <span className="flex size-10 items-center justify-center border-x border-nordic-charcoal font-sans text-body font-normal text-nordic-charcoal">
            {quantity}
          </span>
          <button
            type="button"
            aria-label={`Increase quantity of ${product.name}`}
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            className="flex size-10 items-center justify-center text-nordic-charcoal transition-colors duration-300 hover:bg-nordic-gray/10"
          >
            <Plus className="size-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => onRemove(product.id)}
        className="col-start-2 row-start-1 justify-self-end p-2 text-nordic-sage transition-colors duration-300 hover:text-nordic-terracotta sm:col-start-3"
      >
        <Trash2 className="size-5 stroke-[1.5]" />
      </button>
    </article>
  );
}
