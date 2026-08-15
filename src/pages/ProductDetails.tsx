import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Link, useParams } from "react-router";
import { getProductBySlug, getAllProducts } from "@/services/products";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const addToCart = useCartStore((state) => state.addToCart);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [related, setRelated] = useState<Product[] | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadProduct() {
      setLoading(true);
      setProduct(null);
      setQuantity(1);
      setAdded(false);
      setSelectedImage(null);

      const nextProduct = slug ? await getProductBySlug(slug) : undefined;

      if (isCurrent) {
        setProduct(nextProduct ?? null);
        if (nextProduct) {
          setSelectedImage(
            (nextProduct.images && nextProduct.images[0]) ?? nextProduct.image,
          );
        }
        setLoading(false);
      }
    }

    void loadProduct();

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  useEffect(() => {
    let mounted = true;
    async function loadRelated() {
      if (!product) return;
      const all = await getAllProducts();
      const candidates = all.filter((p) => p.id !== product.id);
      const sameCategory = candidates.filter(
        (p) => p.category === product.category,
      );
      const picks = (sameCategory.length ? sameCategory : candidates).slice(
        0,
        4,
      );
      if (mounted) setRelated(picks);
    }

    void loadRelated();

    return () => {
      mounted = false;
    };
  }, [product]);

  useEffect(() => {
    if (!added) {
      return;
    }

    const timeout = window.setTimeout(() => setAdded(false), 2000);

    return () => window.clearTimeout(timeout);
  }, [added]);

  function handleAddToCart() {
    if (!product) {
      return;
    }

    for (let count = 0; count < quantity; count += 1) {
      addToCart(product);
    }

    setAdded(true);
    toast.success(`${product.name} added to cart`);
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 font-sans text-body font-normal text-nordic-sage">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 font-sans text-body font-normal text-nordic-sage">
        <p>Product not found.</p>
        <Link
          to="/shop"
          className="text-nordic-charcoal underline underline-offset-4 transition-colors duration-300 hover:text-nordic-terracotta"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 font-sans text-body font-normal text-nordic-sage transition-colors duration-300 hover:text-nordic-terracotta"
      >
        <ArrowLeft className="size-4 stroke-[1.5]" />
        Back to shop
      </Link>

      <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-square overflow-hidden bg-nordic-gray/10">
            <img
              src={selectedImage ?? product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="mt-4 flex gap-3">
            {(product.images ?? [product.image]).slice(0, 4).map((img) => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 overflow-hidden bg-nordic-gray/10 border ${
                  selectedImage === img
                    ? "border-nordic-charcoal"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <p className="font-sans text-caption font-normal uppercase tracking-[0.14em] text-nordic-sage">
            {product.category} / {product.collection}
          </p>
          <h1 className="mt-4 font-serif text-h1 font-semibold text-nordic-charcoal">
            {product.name}
          </h1>
          <p className="mt-5 font-sans text-subtitle font-semibold text-nordic-terracotta">
            ${product.price}
          </p>
          <p className="mt-8 max-w-xl font-sans text-body font-normal text-nordic-sage">
            {product.description}
          </p>

          {/* Color swatches removed */}

          <div className="mt-10">
            <p className="font-sans text-[13px] uppercase tracking-[0.12em] text-nordic-charcoal">
              Quantity
            </p>
            <div className="mt-3 inline-flex items-center border border-nordic-charcoal">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                className="flex size-11 items-center justify-center text-nordic-charcoal transition-colors duration-300 hover:bg-nordic-gray/10 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={quantity === 1}
              >
                <Minus className="size-4 stroke-[1.5]" />
              </button>
              <span className="flex h-11 min-w-11 items-center justify-center border-x border-nordic-charcoal font-sans text-body font-normal text-nordic-charcoal">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => current + 1)}
                className="flex size-11 items-center justify-center text-nordic-charcoal transition-colors duration-300 hover:bg-nordic-gray/10"
              >
                <Plus className="size-4 stroke-[1.5]" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 w-full border border-nordic-charcoal bg-nordic-charcoal px-6 py-4 font-sans text-button font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-nordic-charcoal/90"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      {related && related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal mb-8">
            You Might Also Like
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
