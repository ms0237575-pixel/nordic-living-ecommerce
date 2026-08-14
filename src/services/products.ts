import { products } from "@/data/products";
import type { Product } from "@/types/product";

// Replace the mock implementation inside each function with a real fetch()
// call to the backend API once available. Keep these function signatures
// unchanged so no other file needs to be modified when the API is ready.

const MOCK_DELAY = 300;

export async function getAllProducts(): Promise<Product[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(products), MOCK_DELAY),
  );
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(products.find((p) => p.slug === slug)),
      MOCK_DELAY,
    ),
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(products.filter((p) => p.featured)), MOCK_DELAY),
  );
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(products.filter((p) => p.category === category)),
      MOCK_DELAY,
    ),
  );
}
