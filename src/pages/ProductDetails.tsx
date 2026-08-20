import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { Link, useParams } from "react-router";
import { getProductBySlug, getAllProducts } from "@/services/products";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const sampleReviews: Review[] = [
  {
    name: "Anna Mikkelsen",
    rating: 5,
    date: "2026-03-12",
    comment:
      "Beautifully made and even more stunning in person. The craftsmanship is exceptional and the materials feel truly premium.",
  },
  {
    name: "Jonas Berg",
    rating: 5,
    date: "2026-01-28",
    comment:
      "Exactly what I hoped for — clean lines, warm wood, and it fits perfectly in our home. Shipping was quick and carefully packaged.",
  },
  {
    name: "Freja Lund",
    rating: 4,
    date: "2025-11-05",
    comment:
      "Lovely design and very comfortable to live with. A small scratch arrived on the base, but customer care resolved it right away.",
  },
  {
    name: "Oscar Lindqvist",
    rating: 5,
    date: "2025-09-19",
    comment:
      "A timeless piece that elevates the whole room. You can tell it was made with care. I would buy again without hesitation.",
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < Math.round(value)
              ? "fill-nordic-terracotta text-nordic-terracotta"
              : "text-nordic-gray"
          }`}
        />
      ))}
    </div>
  );
}

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const addToCart = useCartStore((state) => state.addToCart);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [related, setRelated] = useState<Product[] | null>(null);
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewErrors, setReviewErrors] = useState<{
    name?: string;
    rating?: string;
    comment?: string;
  }>({});

  useEffect(() => {
    let isCurrent = true;

    async function loadProduct() {
      setLoading(true);
      setProduct(null);
      setQuantity(1);
      setAdded(false);
      setSelectedImage(null);
      setReviews(sampleReviews);
      setReviewName("");
      setReviewRating(0);
      setReviewComment("");
      setReviewErrors({});

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

  function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: typeof reviewErrors = {};
    if (!reviewName.trim()) nextErrors.name = "Please add your name.";
    if (reviewRating < 1) nextErrors.rating = "Please select a rating.";
    if (!reviewComment.trim()) nextErrors.comment = "Please share a few words.";
    setReviewErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const newReview: Review = {
      name: reviewName.trim(),
      rating: reviewRating,
      date: new Date().toISOString(),
      comment: reviewComment.trim(),
    };

    setReviews((current) => [newReview, ...current]);
    setReviewName("");
    setReviewRating(0);
    setReviewComment("");
    toast.success("Thanks — your review has been added");
  }

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

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
              loading="lazy"
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
                  loading="lazy"
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
            className="mt-8 w-full border border-nordic-charcoal px-6 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      <section className="mt-20 border-t border-nordic-gray/20 pt-16 lg:mt-24">
        <h2 className="mb-10 font-serif text-h2 font-medium text-nordic-charcoal">
          Customer Reviews
        </h2>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div>
            <div className="flex items-center gap-5">
              <span className="font-serif text-[64px] font-semibold leading-none text-nordic-charcoal">
                {averageRating.toFixed(1)}
              </span>
              <div>
                <StarRating value={averageRating} />
                <p className="mt-2 font-sans text-[14px] text-nordic-sage">
                  / 5.0 · {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-8">
              {reviews.map((review, index) => (
                <article
                  key={`${review.date}-${index}`}
                  className="border-b border-nordic-gray/20 pb-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center bg-nordic-charcoal font-serif text-subtitle font-medium text-white">
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-sans text-body font-medium text-nordic-charcoal">
                          {review.name}
                        </p>
                        <p className="font-sans text-[13px] text-nordic-sage">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating value={review.rating} />
                  </div>
                  <p className="mt-4 font-sans text-body font-normal leading-relaxed text-nordic-sage">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleReviewSubmit}
            className="h-fit border border-nordic-gray/20 bg-nordic-charcoal/[0.03] p-6 sm:p-8"
          >
            <h3 className="font-serif text-[24px] font-medium text-nordic-charcoal">
              Write a Review
            </h3>
            <p className="mt-2 font-sans text-[14px] text-nordic-sage">
              Share your experience with this piece.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="review-name"
                  className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal"
                >
                  Name
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={reviewName}
                  onChange={(event) => {
                    setReviewName(event.target.value);
                    setReviewErrors((current) => ({
                      ...current,
                      name: undefined,
                    }));
                  }}
                  placeholder="Your name"
                  className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
                />
                {reviewErrors.name && (
                  <p className="mt-2 font-sans text-[13px] text-nordic-terracotta">
                    {reviewErrors.name}
                  </p>
                )}
              </div>

              <div>
                <span className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal">
                  Rating
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-label={`Rate ${value} star${value !== 1 ? "s" : ""}`}
                        onClick={() => {
                          setReviewRating(value);
                          setReviewErrors((current) => ({
                            ...current,
                            rating: undefined,
                          }));
                        }}
                        className="p-0.5 transition-opacity hover:opacity-75"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            value <= reviewRating
                              ? "fill-nordic-terracotta text-nordic-terracotta"
                              : "text-nordic-gray"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                {reviewErrors.rating && (
                  <p className="mt-2 font-sans text-[13px] text-nordic-terracotta">
                    {reviewErrors.rating}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="review-comment"
                  className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal"
                >
                  Comment
                </label>
                <textarea
                  id="review-comment"
                  value={reviewComment}
                  onChange={(event) => {
                    setReviewComment(event.target.value);
                    setReviewErrors((current) => ({
                      ...current,
                      comment: undefined,
                    }));
                  }}
                  placeholder="Tell us what you think..."
                  rows={4}
                  className="w-full resize-y rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
                />
                {reviewErrors.comment && (
                  <p className="mt-2 font-sans text-[13px] text-nordic-terracotta">
                    {reviewErrors.comment}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full border border-nordic-charcoal px-6 py-3 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </section>

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
