import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative -mt-30 h-[calc(100vh+120px)] w-full overflow-hidden bg-nordic-charcoal">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .floating-content {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <img
        alt="Nordic Living Interior"
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/images/products/hero-section.webp"
        width={1920}
        height={1080}
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-30 pb-12 text-center text-white floating-content">
        <h1
          className="mb-6 font-serif text-2xl font-normal leading-tight tracking-tight sm:text-4xl md:text-7xl lg:text-8xl drop-shadow-lg"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Quiet living
        </h1>

        <p
          className="mb-10 max-w-lg font-sans text-sm font-medium uppercase tracking-widest text-white/90 sm:text-sm md:text-base drop-shadow-md"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          Curated furniture for the modern home.
        </p>

        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <Link
            to="/shop"
            className="inline-block border border-white bg-white/10 px-6 py-3 font-sans text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-nordic-charcoal sm:px-10 sm:py-4 sm:text-sm"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
