import { Search, ChevronDown, X, Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductStore } from "@/store/useProductStore";

type PriceFilterValue = "all" | "under500" | "500to1000" | "over1000";

const categories = [
  "Furniture",
  "Lighting",
  "Accessories",
  "Textiles",
  "Kitchen",
] as const;

/**
 * Shop page — renders product listing with client-side filters and sorting.
 *
 * Note: URLSearchParams are used to keep filter state in the URL so results
 * can be shared/bookmarked. Filtering and sorting are performed in-memory
 * from the product store to preserve a snappy client-side experience.
 */
export function Shop() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = useProductStore((state) => state.products);

  const initialSearch = searchParams.get("search") ?? "";
  const initialSort = searchParams.get("sort") ?? "default";
  const initialPrice = (searchParams.get("price") as PriceFilterValue) ?? "all";
  const initialCategories = searchParams.get("categories")
    ? searchParams.get("categories")!.split(",").filter(Boolean)
    : searchParams.get("category")
      ? [searchParams.get("category")!]
      : [];

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedPrice, setSelectedPrice] =
    useState<PriceFilterValue>(initialPrice);
  const [sortBy, setSortBy] = useState(initialSort);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) setSearchQuery(q);

    const cats = searchParams.get("categories")
      ? searchParams.get("categories")!.split(",").filter(Boolean)
      : searchParams.get("category")
        ? [searchParams.get("category")!]
        : [];
    setSelectedCategories(cats);
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  // Derive a filtered list from the product catalog based on active UI state.
  // This is intentionally kept synchronous and in-memory for responsiveness.
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesPrice = (() => {
      if (selectedPrice === "all") return true;
      if (selectedPrice === "under500") return product.price < 500;
      if (selectedPrice === "500to1000")
        return product.price >= 500 && product.price <= 1000;
      return product.price > 1000;
    })();

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort the filtered results according to the selected sort option.
  // We operate on a copy to avoid mutating the original product array in the store.
  const sortedProducts = (() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return copy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return copy.sort((a, b) => b.price - a.price);
      case "name-asc":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return copy
          .map((p, i) => ({ p, i }))
          .sort((x, y) => {
            if (x.p.newArrival === y.p.newArrival) return x.i - y.i;
            return x.p.newArrival ? -1 : 1;
          })
          .map((x) => x.p);
      default:
        return copy;
    }
  })();

  const activeSortLabel =
    sortBy === "default"
      ? "Default"
      : sortBy === "price-asc"
        ? "Price: Low to High"
        : sortBy === "price-desc"
          ? "Price: High to Low"
          : sortBy === "name-asc"
            ? "Name: A to Z"
            : "Newest Arrivals";

  const activeFilterChips = [
    ...selectedCategories.map((category) => ({
      key: `category:${category}`,
      label: `Category: ${category}`,
      onRemove: () =>
        setSelectedCategories((current) =>
          current.filter((item) => item !== category),
        ),
    })),
    ...(selectedPrice !== "all"
      ? [
          {
            key: `price:${selectedPrice}`,
            label:
              selectedPrice === "under500"
                ? "Price: Under $500"
                : selectedPrice === "500to1000"
                  ? "Price: $500 - $1000"
                  : "Price: $1000+",
            onRemove: () => setSelectedPrice("all"),
          },
        ]
      : []),
    ...(searchQuery.trim()
      ? [
          {
            key: `search:${searchQuery.trim()}`,
            label: `Search: '${searchQuery.trim()}'`,
            onRemove: () => setSearchQuery(""),
          },
        ]
      : []),
  ];

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice("all");
    setSearchQuery("");
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim() !== "") params.set("search", searchQuery);
    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (selectedPrice !== "all") params.set("price", selectedPrice);
    if (sortBy && sortBy !== "default") params.set("sort", sortBy);

    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategories, selectedPrice, sortBy, setSearchParams]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const filterContent = (
    <div className="flex flex-col space-y-10">
      <div className="relative">
        <Search className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-nordic-sage-dark stroke-[1.5]" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full border-b border-nordic-gray/30 bg-transparent py-3 pl-8 pr-3 font-sans text-[14px] font-normal text-nordic-charcoal placeholder:text-nordic-sage-dark transition-colors focus:border-nordic-charcoal focus:outline-none"
        />
      </div>

      <div>
        <h3 className="mb-5 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal">
          Categories
        </h3>
        <div className="space-y-4">
          {categories.map((category) => (
            <label
              key={category}
              className="group flex cursor-pointer items-center gap-3"
            >
              <div className="relative flex h-5 w-5 items-center justify-center border border-nordic-gray/40 transition-colors group-hover:border-nordic-terracotta">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="peer sr-only"
                />
                <div className="absolute inset-0 bg-nordic-terracotta opacity-0 transition-opacity peer-checked:opacity-100" />
                <svg
                  className="absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-sans text-[15px] text-nordic-charcoal transition-colors group-hover:text-nordic-terracotta">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-5 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal">
          Price Range
        </h3>
        <div className="space-y-4">
          {[
            { value: "all", label: "All prices" },
            { value: "under500", label: "Under $500" },
            { value: "500to1000", label: "$500 - $1000" },
            { value: "over1000", label: "$1000+" },
          ].map((option) => (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-3"
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-nordic-gray/40 transition-colors group-hover:border-nordic-terracotta">
                <input
                  type="radio"
                  name="price"
                  value={option.value}
                  checked={selectedPrice === option.value}
                  onChange={() =>
                    setSelectedPrice(option.value as PriceFilterValue)
                  }
                  className="peer sr-only"
                />
                <div className="h-2.5 w-2.5 rounded-full bg-nordic-terracotta opacity-0 transition-opacity peer-checked:opacity-100" />
              </div>
              <span className="font-sans text-[15px] text-nordic-charcoal transition-colors group-hover:text-nordic-terracotta">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 py-16 lg:py-24">
      <div className="mb-10 flex items-center justify-between">
        <h1
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-nordic-charcoal"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          All Products
        </h1>

        <div className="lg:hidden" data-aos="fade-left" data-aos-duration="800">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 border border-nordic-charcoal/30 px-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-nordic-charcoal transition-colors hover:border-nordic-charcoal"
          >
            <Filter className="h-3.5 w-3.5 stroke-[1.5]" />
            Filters
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-100 flex lg:hidden">
          <div
            className="fixed inset-0 bg-nordic-charcoal/40 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />

          <aside className="fixed right-0 top-0 z-101 h-full w-[85vw] max-w-90 bg-nordic-bg shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="flex items-center justify-between border-b border-nordic-gray/10 px-6 py-5">
              <span className="font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-charcoal">
                Filters & Sorting
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-nordic-charcoal hover:text-nordic-terracotta transition-colors"
              >
                <X className="h-5 w-5 stroke-[1.5]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">
              {filterContent}
            </div>
            <div className="border-t border-nordic-gray/10 p-6">
              <button
                onClick={() => setOpen(false)}
                className="w-full border border-nordic-charcoal bg-nordic-charcoal py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </aside>
        </div>
      )}

      <style>{`
        @keyframes chipFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="grid lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside
          className="hidden lg:block sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar pr-4 pb-12"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          {filterContent}
        </aside>

        <div>
          <div
            className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-nordic-gray/10 pb-6"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="font-sans text-[14px] font-normal text-nordic-sage-dark">
              Showing{" "}
              <span className="text-nordic-charcoal font-medium">
                {filteredProducts.length}
              </span>{" "}
              products
            </div>

            <div className="relative inline-flex items-center group">
              <span className="mr-3 font-sans text-[13px] font-medium uppercase tracking-widest text-nordic-sage-dark">
                Sort by
              </span>
              <select
                ref={selectRef}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent pb-1 pr-6 font-sans text-[14px] font-medium text-nordic-charcoal focus:outline-none cursor-pointer appearance-none group-hover:text-nordic-terracotta transition-colors border-b border-transparent hover:border-nordic-terracotta"
                aria-label="Sort products"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-nordic-charcoal pointer-events-none group-hover:text-nordic-terracotta transition-colors" />
            </div>
          </div>

          <div aria-live="polite" className="sr-only">
            Active sort: {activeSortLabel}
          </div>

          {activeFilterChips.length > 0 && (
            <div
              className="mb-8 flex flex-wrap items-center gap-2"
              style={{ animation: "chipFadeIn 300ms ease-out" }}
            >
              {activeFilterChips.map((chip) => (
                <div
                  key={chip.key}
                  className="inline-flex items-center gap-2 border border-nordic-gray/20 bg-white px-4 py-1.5 font-sans text-[13px] text-nordic-charcoal rounded-full shadow-sm"
                >
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${chip.label}`}
                    onClick={chip.onRemove}
                    className="text-nordic-sage-dark transition-colors hover:text-nordic-terracotta"
                  >
                    <X className="h-3 w-3 stroke-[2.5]" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={clearAllFilters}
                className="ml-2 font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-sage-dark transition-colors hover:text-nordic-terracotta underline underline-offset-4"
              >
                Clear all
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div
              className="flex min-h-[40vh] items-center justify-center text-center font-sans text-[15px] text-nordic-charcoal bg-nordic-gray/5 border border-nordic-gray/10 py-12"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              No products found matching your criteria. Try clearing some
              filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={(index % 3) * 100}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
