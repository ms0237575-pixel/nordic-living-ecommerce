import { Link } from "react-router";
import { ArrowRight, Trees, Sparkles, Hammer, ShieldCheck } from "lucide-react";

const stats = [
  { value: "100%", label: "Sustainable FSC Certified Wood", icon: Trees },
  { value: "10+", label: "Years of Design Heritage", icon: Sparkles },
  { value: "100%", label: "Handcrafted by Master Artisans", icon: Hammer },
  {
    value: "Lifetime",
    label: "Structural Integrity Promise",
    icon: ShieldCheck,
  },
];

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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="mx-auto max-w-3xl text-center px-2">
        <p
          className="font-sans text-caption font-medium uppercase tracking-[0.22em] text-nordic-terracotta"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Nordic Living Copenhagen
        </p>
        <h1
          className="mt-4 font-serif text-2xl font-semibold text-nordic-charcoal sm:text-[42px] md:text-[54px]"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          Our Philosophy
        </h1>
        <p
          className="mt-6 font-sans text-body font-normal leading-relaxed text-nordic-sage-dark"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          We believe a home should feel like a deep breath. For over a decade we
          have crafted furniture that celebrates the Scandinavian ideals of
          simplicity, sustainability, and craftsmanship — pieces designed for
          slow, meaningful everyday living.
        </p>
      </header>

      <section className="mt-20 border-y border-nordic-gray/20 py-12 lg:mt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center px-4"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={i * 100}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-nordic-gray/10 text-nordic-charcoal">
                  <Icon className="h-5 w-5 stroke-[1.8]" />
                </div>
                <span className="font-serif text-2xl md:text-[32px] font-semibold text-nordic-charcoal">
                  {stat.value}
                </span>
                <span className="mt-2 font-sans text-[13px] text-nordic-sage-dark">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-24 space-y-24 lg:mt-32 lg:space-y-32">
        {sections.map((section) => (
          <section
            key={section.title}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
          >
            <div
              className={`group relative h-100 md:h-125 w-full overflow-hidden bg-nordic-gray/10 shadow-sm ${
                section.reversed ? "lg:order-2" : ""
              }`}
              data-aos={section.reversed ? "fade-left" : "fade-right"}
              data-aos-duration="1200"
            >
              <img
                src={section.image}
                alt={section.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-2500 ease-out group-hover:scale-105"
              />
            </div>

            <div
              className={`px-2 lg:px-6 ${section.reversed ? "lg:order-1" : ""}`}
            >
              <p
                className="font-sans text-caption font-medium uppercase tracking-[0.18em] text-nordic-terracotta"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {section.eyebrow}
              </p>
              <h2
                className="mt-4 font-serif text-xl md:text-[34px] font-medium text-nordic-charcoal"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="100"
              >
                {section.title}
              </h2>
              <p
                className="mt-6 font-sans text-body font-normal leading-relaxed text-nordic-sage-dark"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                {section.body}
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-24 border-t border-nordic-gray/20 pt-16 text-center lg:mt-32">
        <h2
          className="font-serif text-2xl md:text-[32px] font-semibold text-nordic-charcoal sm:text-[40px]"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Designed in Copenhagen. Made to be lived with.
        </h2>
        <p
          className="mx-auto mt-6 max-w-2xl font-sans text-body font-normal leading-relaxed text-nordic-sage-dark"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          Explore our collection and bring a little of the Nordic calm into your
          own home.
        </p>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <Link
            to="/shop"
            className="group mt-10 inline-flex items-center gap-3 border border-nordic-charcoal bg-nordic-charcoal px-9 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
          >
            <span>Shop the Collection</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
