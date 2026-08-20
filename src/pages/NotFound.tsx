import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl text-center">
        <p className="font-serif text-[80px] font-light text-nordic-charcoal md:text-[120px]">
          404
        </p>

        <h1 className="mb-4 font-serif text-[32px] text-nordic-charcoal md:text-[40px]">
          Page not found
        </h1>

        <p className="mx-auto mb-10 max-w-md font-sans text-[15px] leading-relaxed text-nordic-sage-dark">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="border border-nordic-charcoal bg-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:bg-nordic-charcoal/90"
          >
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="border border-nordic-charcoal px-8 py-4 font-sans text-button font-medium uppercase tracking-widest text-nordic-charcoal transition-colors duration-300 hover:text-nordic-terracotta"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
