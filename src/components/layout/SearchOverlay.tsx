import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [mounted, setMounted] = useState(isOpen);
  const prevBodyOverflow = useRef<string>("");

  const matches = query.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  const displayedProducts = matches.slice(0, visibleCount);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setQuery("");
      setVisibleCount(8);
      prevBodyOverflow.current = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";

      setTimeout(() => inputRef.current?.focus(), 50);

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
      };
    }

    document.body.style.overflow = prevBodyOverflow.current;
    const t = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(t);
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = prevBodyOverflow.current;
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-100 bg-nordic-bg transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } overflow-y-auto overflow-x-hidden`}
    >
      <div className="absolute right-4 top-4 md:right-8 md:top-8 z-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="h-12 w-12 flex items-center justify-center text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
        >
          <X className="h-8 w-8 stroke-[1.5]" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(8);
            }}
            placeholder="Search products..."
            className="w-full bg-transparent outline-none font-serif text-2xl md:text-[64px] text-nordic-charcoal placeholder:text-nordic-gray border-b border-transparent focus:border-nordic-gray/30 pb-4"
          />
        </form>

        {query.trim().length > 0 && (
          <div className="mt-8">
            <div className="mb-6 font-sans text-[14px] uppercase tracking-widest text-nordic-sage-dark flex justify-between items-center">
              <span>
                {matches.length === 0
                  ? "No results found"
                  : `${matches.length} result${matches.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {displayedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {visibleCount < matches.length && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="font-sans text-[14px] font-semibold text-nordic-charcoal underline underline-offset-4 hover:text-nordic-terracotta transition-colors"
                >
                  View more results
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
