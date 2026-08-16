import { Link } from "react-router";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/services/products";
import type { Product } from "@/types/product";
import { Leaf, Truck, MapPin } from "lucide-react";

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

      {/* Trust badges */}
      <section className="w-full bg-nordic-gray/10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-1 items-center justify-between max-w-3xl mx-auto">
              <div className="flex items-center gap-4">
                <Leaf className="h-5 w-5 text-nordic-charcoal" />
                <span className="font-sans text-[13px] uppercase tracking-widest text-nordic-charcoal">
                  Sustainable Materials
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Truck className="h-5 w-5 text-nordic-charcoal" />
                <span className="font-sans text-[13px] uppercase tracking-widest text-nordic-charcoal">
                  Free Shipping over $500
                </span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-nordic-charcoal" />
                <span className="font-sans text-[13px] uppercase tracking-widest text-nordic-charcoal">
                  Designed in Copenhagen
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category / Room */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-serif text-h3 mb-6 text-nordic-charcoal">
          Shop by Room
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/shop"
            className="group relative block overflow-hidden rounded-md"
          >
            <div className="aspect-4/5 w-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"
                alt="Living Room"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute left-0 right-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent">
              <div className="font-serif text-[28px] text-white">
                Living Room
              </div>
            </div>
          </Link>

          <Link
            to="/shop"
            className="group relative block overflow-hidden rounded-md"
          >
            <div className="aspect-4/5 w-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Dining"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute left-0 right-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent">
              <div className="font-serif text-[28px] text-white">Dining</div>
            </div>
          </Link>

          <Link
            to="/shop"
            className="group relative block overflow-hidden rounded-md"
          >
            <div className="aspect-4/5 w-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop"
                alt="Workspace"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute left-0 right-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent">
              <div className="font-serif text-[28px] text-white">Workspace</div>
            </div>
          </Link>
        </div>
      </section>

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

      {/* Brand Story / Philosophy */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="w-full h-96 overflow-hidden rounded-md">
            <img
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1400&auto=format&fit=crop"
              alt="Interior"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="px-2 lg:px-12">
            <h2 className="font-serif text-[40px] text-nordic-charcoal mb-6">
              Crafted with nature in mind.
            </h2>
            <p className="font-sans text-[15px] text-nordic-sage leading-relaxed mb-6">
              Our designs embrace Scandinavian simplicity — quiet forms, honest
              materials, and pieces built to last. We focus on sustainable
              sourcing and timeless craftsmanship so every piece becomes part of
              your everyday rituals.
            </p>
            <Link
              to="/about"
              className="border border-nordic-charcoal px-6 py-3 uppercase tracking-widest font-sans hover:bg-nordic-charcoal hover:text-white transition-colors"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
