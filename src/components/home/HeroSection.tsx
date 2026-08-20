import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col justify-center space-y-8 lg:col-span-5">
          <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
            Quiet comfort for modern living.
          </h1>

          <p className="max-w-md font-sans text-body font-normal text-nordic-sage">
            Discover our new collection of Scandinavian-inspired furniture.
            Designed with purpose, crafted with nature, and built to last.
          </p>

          <div>
            <Link
              to="/shop"
              className="inline-block border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:text-nordic-terracotta"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4 lg:col-span-7">
          <div className="col-span-1 h-100 w-full overflow-hidden bg-nordic-gray/10 sm:h-150">
            <img
              src="/images/products/cozy-reading-nook.jpg"
              alt="Cozy reading nook with warm sunlight"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-100 w-full overflow-hidden bg-nordic-gray/10 sm:mt-24">
            <img
              src="/images/products/warm-vinyl-setup.jpg"
              alt="Warm vinyl record player setup"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
