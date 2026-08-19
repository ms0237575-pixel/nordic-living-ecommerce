import { Link } from "react-router";

const sections = [
  {
    eyebrow: "Sustainability",
    title: "Rooted in Nature",
    body: "Our journey begins in the forest. We source our materials responsibly, ensuring that every piece of wood we use respects the natural ecosystem. By prioritizing sustainability, we create furniture that doesn't just sit in your home, but carries the quiet strength of the outdoors.",
    image: "/images/products/about-nature-chair.jpg",
    alt: "Natural wooden chair in a forest setting",
    reversed: false,
  },
  {
    eyebrow: "Philosophy",
    title: "Designing for Warmth",
    body: "We believe that a home should be a sanctuary. Our designs are crafted to capture natural light and create inviting, tranquil corners. Through soft textures and timeless silhouettes, we bring the warmth of Scandinavian minimalism into your everyday life.",
    image: "/images/products/about-cozy-corner.jpg",
    alt: "Cozy Scandinavian interior corner",
    reversed: true,
  },
  {
    eyebrow: "Inspiration",
    title: "Coastal Serenity",
    body: "Inspired by the calming rhythm of the coast, we pay attention to the smallest details. Our accessories and shelving solutions are designed to help you curate a space that feels personal, breathable, and infinitely peaceful.",
    image: "/images/products/about-coastal-details.jpg",
    alt: "Coastal-inspired home details",
    reversed: false,
  },
];

export function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Hero */}
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-sans text-caption font-normal uppercase tracking-[0.18em] text-nordic-terracotta">
          Nordic Living
        </p>
        <h1 className="mt-4 font-serif text-h1 font-semibold text-nordic-charcoal">
          Our Philosophy
        </h1>
        <p className="mt-6 font-sans text-body font-normal leading-relaxed text-nordic-sage">
          We believe a home should feel like a deep breath. For over a decade we
          have crafted furniture that celebrates the Scandinavian ideals of
          simplicity, sustainability, and craftsmanship — pieces designed for
          slow, meaningful everyday living.
        </p>
      </header>

      {/* 50/50 image-text sections */}
      <div className="mt-24 space-y-24 lg:mt-32 lg:space-y-32">
        {sections.map((section) => (
          <section
            key={section.title}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
          >
            <div
              className={
                section.reversed
                  ? "lg:order-2 relative w-full h-[400px] md:h-[500px] overflow-hidden bg-nordic-light"
                  : "relative w-full h-[400px] md:h-[500px] overflow-hidden bg-nordic-light"
              }
            >
              <img
                src={section.image}
                alt={section.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div
              className={
                section.reversed ? "lg:order-1 px-2 lg:px-6" : "px-2 lg:px-6"
              }
            >
              <p className="font-sans text-caption font-normal uppercase tracking-[0.18em] text-nordic-terracotta">
                {section.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-h2 font-medium text-nordic-charcoal">
                {section.title}
              </h2>
              <p className="mt-6 font-sans text-body font-normal leading-relaxed text-nordic-sage">
                {section.body}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Closing statement */}
      <section className="mt-24 border-t border-nordic-gray/20 pt-16 text-center lg:mt-32">
        <h2 className="font-serif text-h2 font-medium text-nordic-charcoal">
          Designed in Copenhagen. Made to be lived with.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-body font-normal leading-relaxed text-nordic-sage">
          Explore our collection and bring a little of the Nordic calm into your
          own home.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-block border border-nordic-charcoal bg-nordic-charcoal px-10 py-4 font-sans text-button font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:bg-nordic-charcoal/90"
        >
          Shop the Collection
        </Link>
      </section>
    </div>
  );
}
