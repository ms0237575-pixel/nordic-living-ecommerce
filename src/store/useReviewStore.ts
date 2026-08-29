import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const defaultReviews: Review[] = [
  {
    id: "rev-1",
    productId: 1,
    name: "Anna Mikkelsen",
    rating: 5,
    date: "2026-03-12",
    comment: "Beautifully made and even more stunning in person. The craftsmanship is exceptional and the materials feel truly premium.",
  },
  {
    id: "rev-2",
    productId: 1,
    name: "Jonas Berg",
    rating: 5,
    date: "2026-01-28",
    comment: "Exactly what I hoped for — clean lines, warm wood, and it fits perfectly in our home. Shipping was quick and carefully packaged.",
  },
  {
    id: "rev-3",
    productId: 2,
    name: "Freja Lund",
    rating: 4,
    date: "2025-11-05",
    comment: "Lovely design and very comfortable to live with. Customer care resolved my question right away.",
  },
  {
    id: "rev-4",
    productId: 3,
    name: "Oscar Lindqvist",
    rating: 5,
    date: "2025-09-19",
    comment: "A timeless piece that elevates the whole room. You can tell it was made with care.",
  },
];

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  getReviewsByProductId: (productId: number) => Review[];
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: defaultReviews,

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `rev-${Date.now()}`,
          date: new Date().toISOString(),
        };
        set((state) => ({ reviews: [newReview, ...state.reviews] }));
      },

      getReviewsByProductId: (productId: number) => {
        return get().reviews.filter((r) => r.productId === productId);
      },
    }),
    {
      name: "nordic-living-product-reviews",
    }
  )
);
