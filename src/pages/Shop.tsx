import { Search } from "lucide-react";
import { useState } from "react";
import Sheet, { SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/product/ProductCard";
import { products as allProducts } from "@/data/products";

type PriceFilterValue = "all" | "under500" | "500to1000" | "over1000";

const categories = ["Furniture", "Lighting", "Accessories"] as const;

export default function Shop() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<PriceFilterValue>("all");

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

  const filterSidebar = (
    <div className="rounded-sm border border-nordic-gray/20 bg-nordic-charcoal/[0.03] p-4">
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nordic-sage stroke-[1.5]" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="w-full border border-nordic-gray/20 bg-white/60 py-2 pl-9 pr-3 font-sans text-body font-normal text-nordic-charcoal placeholder:text-nordic-sage focus:outline-none focus:ring-1 focus:ring-nordic-terracotta"
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

      <div className="grid lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden lg:block">{filterSidebar}</aside>

        <div>
          <div className="mb-4 font-sans text-body font-normal text-nordic-sage">
            Showing {filteredProducts.length} products
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex min-h-[180px] items-center justify-center text-center font-sans text-[14px] text-nordic-sage">
              No products found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
