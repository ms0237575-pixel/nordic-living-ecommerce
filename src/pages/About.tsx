import { Link } from "react-router";

const sections = [
  {
    eyebrow: "Simplicity",
    title: "Scandinavian Minimalism",
    body: "We design with restraint — quiet forms, honest materials, and nothing extraneous. Each piece earns its place in the home by being useful, beautiful, and calm. Our minimalism is warm, never cold: soft proportions, natural textures, and light that moves through every room.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop",
    alt: "Minimalist Scandinavian living room",
    reversed: false,
  },
  {
    eyebrow: "Materiality",
    title: "Sustainability First",
    body: "Every material is chosen with its next life in mind. We source FSC-certified oak and responsibly grown wool, use low-impact finishes, and design for repair rather than replacement. A Nordic Living piece is meant to be passed on — not thrown away.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
    alt: "Natural oak furniture in a light interior",
    reversed: true,
  },
  {
    eyebrow: "Process",
    title: "Craftsmanship",
    body: "Our makers have spent decades perfecting joinery, upholstery, and finishing by hand. We favor small workshops over assembly lines, and slow production over speed. The result is furniture with soul — pieces that reveal their care in every detail, year after year.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop",
    alt: "Handcrafted wooden furniture detail",
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
                  ? "lg:order-2 overflow-hidden bg-nordic-gray/10"
                  : "overflow-hidden bg-nordic-gray/10"
              }
            >
              <img
                src={section.image}
                alt={section.alt}
                className="aspect-4/5 w-full object-cover object-center"
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
