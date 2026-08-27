import { Link } from "react-router";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCarousel } from "@/components/product/ProductCarousel";
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

      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
        data-aos="fade-up"
      >
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
            Featured Collection
          </h2>

          <Link
            to="/shop"
            className="inline-block border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
          >
            View All
          </Link>
        </div>

        {featured === null ? (
          <div>Loading...</div>
        ) : (
          <ProductCarousel products={featured} />
        )}
      </section>

      {/* Brand Story / Philosophy */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-100 md:h-150 overflow-hidden bg-nordic-light group">
            <img
              src="/images/products/story-crafted-chairs.jpg"
              alt="Crafted chairs"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-2000 ease-out group-hover:scale-105"
            />
          </div>

          <div className="px-2 lg:px-12">
            <h2 className="font-serif text-[40px] text-nordic-charcoal mb-6">
              Crafted with nature in mind.
            </h2>
            <p className="font-sans text-[15px] text-nordic-sage-dark leading-relaxed mb-6">
              Our designs embrace Scandinavian simplicity — quiet forms, honest
              materials, and pieces built to last. We focus on sustainable
              sourcing and timeless craftsmanship so every piece becomes part of
              your everyday rituals.
            </p>
            <Link
              to="/about"
              className="inline-block border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section 1 — Timeless Comfort */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-100 md:h-125 overflow-hidden bg-nordic-light group">
            <img
              src="/images/products/home-striped-sofa.jpg"
              alt="Striped sofa in a living room"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-2000 ease-out group-hover:scale-105"
            />
          </div>

          <div className="px-2 lg:px-12">
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-nordic-sage-dark mb-4">
              Timeless Comfort
            </p>
            <h2 className="font-serif text-[36px] text-nordic-charcoal mb-6">
              Redefining the Living Space
            </h2>
            <p className="font-sans text-[15px] text-nordic-sage-dark leading-relaxed mb-6">
              Embrace the art of slow living. Our seating collections combine
              striking organic curves with unmatched comfort, featuring tactile
              fabrics that invite you to sink in and stay a while.
            </p>
            <Link
              to="/shop?category=Furniture"
              className="inline-block border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
            >
              Shop Seating
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section 2 — Gather Around */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 px-2 lg:px-12">
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-nordic-sage-dark mb-4">
              Gather Around
            </p>
            <h2 className="font-serif text-[36px] text-nordic-charcoal mb-6">
              Spaces for Connection
            </h2>
            <p className="font-sans text-[15px] text-nordic-sage-dark leading-relaxed mb-6">
              Whether it's a quiet morning coffee or a bustling dinner party,
              our dining pieces are crafted from raw, honest materials to ground
              your most meaningful moments.
            </p>
            <Link
              to="/shop?category=Furniture"
              className="inline-block border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
            >
              Shop Dining
            </Link>
          </div>

          <div className="order-1 lg:order-2 relative w-full h-100 md:h-150 overflow-hidden bg-nordic-light group">
            <img
              src="/images/products/home-dining-cafe.webp"
              alt="Dining area in a café setting"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Feature Section 3 — Everyday Rituals */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-100 md:h-150 overflow-hidden bg-nordic-light group">
            <img
              src="/images/products/home-coffee-ritual.webp"
              alt="Coffee ritual with Nordic ceramics"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 ease-out group-hover:scale-105"
            />
          </div>

          <div className="px-2 lg:px-12">
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-nordic-sage-dark mb-4">
              Everyday Rituals
            </p>
            <h2 className="font-serif text-[36px] text-nordic-charcoal mb-6">
              The Beauty in Details
            </h2>
            <p className="font-sans text-[15px] text-nordic-sage-dark leading-relaxed mb-6">
              Scandinavian design is more than an aesthetic; it's a lifestyle.
              We celebrate the small, intentional choices — from the cup you
              hold to the light that fills your room.
            </p>
            <Link
              to="/shop?category=Accessories"
              className="inline-block border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
            >
              Shop Accessories
            </Link>
          </div>
        </div>
      </section>

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
    </div>
  );
}
