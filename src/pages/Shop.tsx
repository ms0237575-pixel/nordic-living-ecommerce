import { Search, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import Sheet, { SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";
import { getAllProducts } from "@/services/products";

type PriceFilterValue = "all" | "under500" | "500to1000" | "over1000";

const categories = [
  "Furniture",
  "Lighting",
  "Accessories",
  "Textiles",
  "Kitchen",
] as const;

export function Shop() {
  const [open, setOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
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
    // synchronize when the URL param changes (do not fight local typing)
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllProducts()
      .then((res) => {
        if (mounted) setAllProducts(res);
      })
      .catch(() => {
        /* keep localProducts as fallback */
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

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
    // persist filters and sort in URL (remove defaults)
    const params = new URLSearchParams();
    if (searchQuery.trim() !== "") params.set("search", searchQuery);
    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (selectedPrice !== "all") params.set("price", selectedPrice);
    if (sortBy && sortBy !== "default") params.set("sort", sortBy);

    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategories, selectedPrice, sortBy]);

  const filterSidebar = (
    <div className="rounded-sm border border-nordic-gray/20 bg-nordic-charcoal/3 p-4">
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nordic-sage-dark stroke-[1.5]" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="w-full border border-nordic-gray/20 bg-white/60 py-2 pl-9 pr-3 font-sans text-body font-normal text-nordic-charcoal placeholder:text-nordic-sage-dark focus:outline-none focus:ring-1 focus:ring-nordic-terracotta"
        />
      </div>

      <div>
        <h3 className="mb-3 font-sans text-body font-normal">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 rounded-none border border-nordic-gray/20"
              />
              <span className="font-sans text-body font-normal">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-sans text-body font-normal">Price</h3>
        <div className="space-y-2">
          {[
            { value: "all", label: "All prices" },
            { value: "under500", label: "Under $500" },
            { value: "500to1000", label: "$500 - $1000" },
            { value: "over1000", label: "$1000+" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3">
              <input
                type="radio"
                name="price"
                value={option.value}
                checked={selectedPrice === option.value}
                onChange={() =>
                  setSelectedPrice(option.value as PriceFilterValue)
                }
                className="h-4 w-4 rounded-full border border-nordic-gray/20"
              />
              <span className="font-sans text-body font-normal">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          All Products
        </h1>

        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <button className="inline-flex h-11 w-11 items-center justify-center p-2 font-sans text-button font-medium text-nordic-charcoal transition-colors duration-300 hover:text-nordic-terracotta">
                Filters
              </button>
            </SheetTrigger>
            <SheetContent className="bg-nordic-bg">
              <aside className="p-6">{filterSidebar}</aside>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <style>{`
        @keyframes chipFadeIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="grid lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden lg:block">{filterSidebar}</aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="font-sans text-body font-normal text-nordic-sage-dark">
              Showing {filteredProducts.length} products
            </div>

            <div className="relative">
              <select
                ref={selectRef}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-b border-nordic-gray/30 pb-1 pr-6 font-sans text-[12px] uppercase tracking-widest text-nordic-charcoal focus:outline-none focus:border-nordic-charcoal cursor-pointer appearance-none"
                aria-label="Sort products"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="newest">Newest Arrivals</option>
              </select>

              <button
                type="button"
                aria-label="Open sort options"
                onClick={() => {
                  if (selectRef.current) {
                    selectRef.current.focus();
                    (selectRef.current as HTMLElement).click?.();
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-nordic-charcoal"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div aria-live="polite" className="sr-only">
            Active sort: {activeSortLabel}
          </div>

          {activeFilterChips.length > 0 && (
            <div
              className="mb-6 flex flex-wrap items-center gap-3"
              style={{ animation: "chipFadeIn 260ms ease-out" }}
            >
              {activeFilterChips.map((chip) => (
                <div
                  key={chip.key}
                  className="inline-flex items-center gap-2 border border-nordic-gray/30 bg-nordic-gray/5 px-3 py-1 font-sans text-[12px] text-nordic-charcoal rounded-full"
                >
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${chip.label}`}
                    onClick={chip.onRemove}
                    className="text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={clearAllFilters}
                className="font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
              >
                Clear all
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex min-h-45 items-center justify-center text-center font-sans text-[14px] text-nordic-sage-dark">
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex min-h-45 items-center justify-center text-center font-sans text-[14px] text-nordic-sage-dark">
              No products found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
