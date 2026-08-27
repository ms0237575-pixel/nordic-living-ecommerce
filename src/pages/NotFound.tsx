import { Link } from "react-router";
import { ArrowLeft, Compass, ShoppingBag } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-nordic-gray/10 text-nordic-sage-dark">
          <Compass className="h-7 w-7 stroke-[1.5]" />
        </div>

        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-nordic-terracotta">
          Error 404
        </p>

        <h1 className="mt-3 font-serif text-[42px] font-semibold text-nordic-charcoal sm:text-[52px]">
          Lost in the Calm
        </h1>

        <p className="mx-auto mt-4 max-w-md font-sans text-body text-nordic-sage-dark leading-relaxed">
          The page or piece you are searching for might have found a new home or
          is currently unavailable.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-nordic-charcoal bg-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-all duration-300 hover:bg-nordic-charcoal hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
