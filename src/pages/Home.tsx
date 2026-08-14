import { Link } from "react-router";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/services/products";
import type { Product } from "@/types/product";

export function Home() {
  const [featured, setFeatured] = useState<Product[] | null>(null);

  useEffect(() => {
    let mounted = true;
    getFeaturedProducts().then((res) => {
      if (mounted) setFeatured(res);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
            Featured Collection
          </h2>

          <Link
            to="/shop"
            className="font-sans text-button font-medium uppercase tracking-widest text-nordic-terracotta transition-colors duration-300 hover:text-nordic-terracotta"
          >
            View All
          </Link>
        </div>

        {featured === null ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
