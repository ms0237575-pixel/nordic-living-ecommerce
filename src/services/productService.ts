import type { Product } from "@/types/product";
import { products as localProducts } from "@/data/products";

const API_BASE = "https://dummyjson.com";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapApiProductToProduct(api: any): Product {
  const title = api.title ?? api.name ?? `Product ${api.id}`;
  const categoryRaw = api.category ?? "general";

  // map dummyjson categories to the project's category naming when possible
  let category = categoryRaw;
  if (typeof categoryRaw === "string") {
    if (categoryRaw.includes("furniture")) category = "Furniture";
    else if (categoryRaw.includes("home-decoration")) category = "Accessories";
    else
      category = categoryRaw
        .split("-")
        .map((s: string) => s[0].toUpperCase() + s.slice(1))
        .join(" ");
  }

  const id = 100000 + Number(api.id || 0);

  const images: string[] =
    Array.isArray(api.images) && api.images.length > 0
      ? api.images
      : api.thumbnail
        ? [api.thumbnail]
        : [];

  return {
    id,
    name: title,
    slug: `api-${slugify(title)}-${api.id}`,
    price: Number(api.price ?? 0),
    category,
    collection: category,
    description: api.description ?? "",
    image: images[0] ?? "",
    images,
    featured: false,
    newArrival: false,
  };
}

async function fetchCategory(category: string) {
  const url = `${API_BASE}/products/category/${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${category}`);
  const json = await res.json();
  return Array.isArray(json.products) ? json.products : [];
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const [furniture, homeDecoration] = await Promise.all([
      fetchCategory("furniture"),
      fetchCategory("home-decoration"),
    ]);

    const apiProducts = [...furniture, ...homeDecoration].map(
      mapApiProductToProduct,
    );

    // merge local products first so curated featured/newArrival remain available
    const merged: Product[] = [...localProducts];

    // avoid slug collisions
    const existingSlugs = new Set(merged.map((p) => p.slug));
    for (const p of apiProducts) {
      if (!existingSlugs.has(p.slug)) merged.push(p);
    }

    return merged;
  } catch (err) {
    // fallback to local products on any network or mapping failure
    // eslint-disable-next-line no-console
    console.warn("productService:getAllProducts fallback to local data", err);
    return localProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug);
}

export default { getAllProducts, getFeaturedProducts, getProductBySlug };
