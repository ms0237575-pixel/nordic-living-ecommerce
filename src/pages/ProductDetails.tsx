import { useEffect, useState, useMemo } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import { useReviewStore } from "@/store/useReviewStore";
import { toast } from "sonner";
import { ProductCard } from "@/components/product/ProductCard";

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
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const allProducts = useProductStore((state) => state.products);
  const product = allProducts.find((p) => p.slug === slug) ?? null;

  const allReviews = useReviewStore((state) => state.reviews);
  const addReview = useReviewStore((state) => state.addReview);

  const productReviews = useMemo(() => {
    if (!product) return [];
    return allReviews.filter((r) => r.productId === product.id);
  }, [allReviews, product?.id]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewErrors, setReviewErrors] = useState<{
    name?: string;
    rating?: string;
    comment?: string;
  }>({});

  useEffect(() => {
    if (product) {
      setSelectedImage((product.images && product.images[0]) ?? product.image);
      setQuantity(1);
      setAdded(false);
      setReviewName("");
      setReviewRating(0);
      setReviewComment("");
      setReviewErrors({});
    }
  }, [product?.id]);

  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [added]);

  function handleAddToCart() {
    if (!product) return;

    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    for (let count = 0; count < quantity; count += 1) {
      addToCart(product);
    }

    setAdded(true);

    toast.custom((t) => (
      <div className="flex w-full min-w-[320px] max-w-95 items-center gap-4 bg-nordic-charcoal p-4 text-nordic-bg shadow-2xl border border-white/10">
        <img
          src={selectedImage ?? product.image}
          alt={product.name}
          className="h-14 w-14 object-cover shrink-0 bg-white/5"
        />
        <div className="flex-1 min-w-0">
          <p className="font-serif text-[14px] font-medium text-white truncate">
            {product.name}
          </p>
          <p className="font-sans text-[12px] text-white/60">
            Qty: {quantity} · ${(product.price * quantity).toFixed(2)}
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
  }

  function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!product) return;

    const nextErrors: typeof reviewErrors = {};
    if (!reviewName.trim()) nextErrors.name = "Please add your name.";
    if (reviewRating < 1) nextErrors.rating = "Please select a rating.";
    if (!reviewComment.trim()) nextErrors.comment = "Please share a few words.";
    setReviewErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    addReview({
      productId: product.id,
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
    });

    setReviewName("");
    setReviewRating(0);
    setReviewComment("");
    toast.success("Thanks — your review has been published!");
  }

  const totalReviews = productReviews.length;
  const averageRating =
    totalReviews > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews
      : 5;

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 font-sans text-body font-normal text-nordic-sage-dark">
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

  const related = allProducts
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div data-aos="fade-right" data-aos-duration="1000">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-sans text-body font-normal text-nordic-sage-dark transition-colors duration-300 hover:text-nordic-terracotta"
        >
          <ArrowLeft className="size-4 stroke-[1.5]" />
          Back to shop
        </Link>
      </div>

      <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
        <div data-aos="fade-up" data-aos-duration="1200">
          <div className="aspect-square overflow-hidden bg-nordic-gray/10">
            <img
              src={selectedImage ?? product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-2000 hover:scale-105"
            />
          </div>

          <div className="mt-4 flex gap-3">
            {(product.images ?? [product.image]).slice(0, 4).map((img) => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 overflow-hidden bg-nordic-gray/10 border transition-all duration-300 ${
                  selectedImage === img
                    ? "border-nordic-charcoal opacity-100"
                    : "border-transparent opacity-70 hover:opacity-100"
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

        <div
          className="lg:pt-4"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="200"
        >
          <p className="font-sans text-caption font-normal uppercase tracking-[0.14em] text-nordic-sage-dark">
            {product.category} / {product.collection}
          </p>
          <h1 className="mt-4 font-serif text-h1 font-semibold text-nordic-charcoal">
            {product.name}
          </h1>
          <p className="mt-5 font-sans text-subtitle font-semibold text-nordic-terracotta">
            ${product.price}
          </p>
          <p className="mt-8 max-w-xl font-sans text-body font-normal leading-relaxed text-nordic-sage-dark">
            {product.description}
          </p>

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
            className="mt-8 w-full border border-nordic-charcoal px-6 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:bg-nordic-charcoal hover:text-white"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      <section className="mt-20 border-t border-nordic-gray/20 pt-16 lg:mt-24">
        <h2
          className="mb-10 font-serif text-h2 font-medium text-nordic-charcoal"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Customer Reviews
        </h2>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-5">
              <span className="font-serif text-[64px] font-semibold leading-none text-nordic-charcoal">
                {averageRating.toFixed(1)}
              </span>
              <div>
                <StarRating value={averageRating} />
                <p className="mt-2 font-sans text-[14px] text-nordic-sage-dark">
                  / 5.0 · {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-8">
              {productReviews.length === 0 ? (
                <p className="text-nordic-sage-dark font-sans text-[14px] py-4">
                  No reviews yet. Be the first to review this piece.
                </p>
              ) : (
                productReviews.map((review) => (
                  <article
                    key={review.id}
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
                          <p className="font-sans text-[13px] text-nordic-sage-dark">
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
                    <p className="mt-4 font-sans text-body font-normal leading-relaxed text-nordic-sage-dark">
                      {review.comment}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <form
              onSubmit={handleReviewSubmit}
              className="h-fit border border-nordic-gray/20 bg-nordic-charcoal/3 p-6 sm:p-8"
            >
              <h3 className="font-serif text-[24px] font-medium text-nordic-charcoal">
                Write a Review
              </h3>
              <p className="mt-2 font-sans text-[14px] text-nordic-sage-dark">
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
                            className={`h-6 w-6 transition-colors duration-300 ${
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
                  className="w-full border border-nordic-charcoal px-6 py-3 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:bg-nordic-charcoal hover:text-white"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-nordic-charcoal mb-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            You Might Also Like
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {related.map((p, index) => (
              <div
                key={p.id}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={(index % 4) * 100}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
