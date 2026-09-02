import { useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import type { Product } from "@/types/product";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  RotateCcw,
  Package,
  X,
} from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = ["Furniture", "Lighting", "Accessories", "Decor"];
const COLLECTIONS = ["Living Room", "Dining Room", "Bedroom", "Workspace"];

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } =
    useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState(CATEGORIES[0]);
  const [formCollection, setFormCollection] = useState(COLLECTIONS[0]);
  const [formPrice, setFormPrice] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formNewArrival, setFormNewArrival] = useState(false);

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory(CATEGORIES[0]);
    setFormCollection(COLLECTIONS[0]);
    setFormPrice("");
    setFormImage("/images/products/home-striped-sofa.jpg");
    setFormDescription("");
    setFormFeatured(false);
    setFormNewArrival(true);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormCollection(product.collection);
    setFormPrice(product.price.toString());
    setFormImage(product.image);
    setFormDescription(product.description || "");
    setFormFeatured(Boolean(product.featured));
    setFormNewArrival(Boolean(product.newArrival));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim() || !formPrice || isNaN(Number(formPrice))) {
      toast.error("Please provide a valid product name and price");
      return;
    }

    const payload: Omit<Product, "id"> = {
      name: formName.trim(),
      slug: formName.trim().toLowerCase().replace(/\s+/g, "-"),
      category: formCategory,
      collection: formCollection,
      price: parseFloat(formPrice),
      image: formImage.trim() || "/images/products/home-striped-sofa.jpg",
      description:
        formDescription.trim() || "Minimalist Scandinavian design piece.",
      featured: formFeatured,
      newArrival: formNewArrival,
      images: [formImage.trim() || "/images/products/home-striped-sofa.jpg"],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      toast.success("Product updated successfully");
    } else {
      addProduct(payload);
      toast.success("New product added to catalog");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      toast.success("Product removed");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-nordic-gray/20 pb-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-nordic-terracotta" />
            <span className="font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-sage-dark">
              Admin Portal
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl md:text-[32px] font-semibold text-nordic-charcoal">
            Product Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm("Reset catalog to default seed products?")) {
                resetToDefault();
                toast.info("Catalog reset to defaults");
              }
            }}
            className="inline-flex items-center gap-2 border border-nordic-gray/30 px-4 py-3 font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal hover:bg-nordic-gray/10 transition-colors"
            title="Reset to default items"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 border border-nordic-charcoal bg-nordic-charcoal px-5 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-nordic-terracotta hover:border-nordic-terracotta transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nordic-sage-dark" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or category..."
            className="w-full border border-nordic-gray/30 bg-transparent py-2 pl-9 pr-3 font-sans text-[13px] text-nordic-charcoal outline-none focus:border-nordic-charcoal"
          />
        </div>

        <span className="font-sans text-[13px] text-nordic-sage-dark">
          Showing{" "}
          <strong className="text-nordic-charcoal">
            {filteredProducts.length}
          </strong>{" "}
          items
        </span>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto border border-nordic-gray/20 bg-white shadow-sm">
        <table className="w-full text-left font-sans text-[13px]">
          <thead className="border-b border-nordic-gray/20 bg-[#fbf9f5] font-semibold uppercase tracking-wider text-nordic-sage-dark text-[11px]">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Collection</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nordic-gray/10 text-nordic-charcoal">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-nordic-gray/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-sm object-cover bg-nordic-gray/10"
                    />
                    <div>
                      <span className="font-medium text-nordic-charcoal block">
                        {product.name}
                      </span>
                      <span className="font-mono text-[11px] text-nordic-sage-dark">
                        #{product.id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block rounded-full bg-nordic-gray/15 px-2.5 py-0.5 text-[11px] font-medium text-nordic-charcoal">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-nordic-sage-dark">
                  {product.collection}
                </td>
                <td className="px-6 py-4 font-semibold text-nordic-charcoal">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-1.5 text-nordic-sage-dark hover:text-nordic-charcoal transition-colors"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-1.5 text-nordic-sage-dark hover:text-nordic-terracotta transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-nordic-gray/20 bg-white p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-nordic-gray/15 pb-4">
              <h2 className="font-serif text-[22px] font-semibold text-nordic-charcoal">
                {editingProduct
                  ? "Edit Product"
                  : "Add New Scandinavian Object"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-nordic-sage-dark hover:text-nordic-charcoal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 font-sans text-[13px]"
            >
              <div>
                <label className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px] mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Artek Armchair 406"
                  className="w-full border border-nordic-gray/30 p-2.5 outline-none focus:border-nordic-charcoal"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px] mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full border border-nordic-gray/30 p-2.5 outline-none focus:border-nordic-charcoal bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px] mb-1">
                    Collection
                  </label>
                  <select
                    value={formCollection}
                    onChange={(e) => setFormCollection(e.target.value)}
                    className="w-full border border-nordic-gray/30 p-2.5 outline-none focus:border-nordic-charcoal bg-white"
                  >
                    {COLLECTIONS.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px] mb-1">
                    Price (USD $)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="450.00"
                    className="w-full border border-nordic-gray/30 p-2.5 outline-none focus:border-nordic-charcoal"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px] mb-1">
                    Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="/images/products/..."
                    className="w-full border border-nordic-gray/30 p-2.5 outline-none focus:border-nordic-charcoal"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="accent-nordic-terracotta h-4 w-4"
                  />
                  <span className="text-[12px] text-nordic-charcoal">
                    Featured Product
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formNewArrival}
                    onChange={(e) => setFormNewArrival(e.target.checked)}
                    className="accent-nordic-terracotta h-4 w-4"
                  />
                  <span className="text-[12px] text-nordic-charcoal">
                    New Arrival
                  </span>
                </label>
              </div>

              <div>
                <label className="block font-medium uppercase tracking-wider text-nordic-sage-dark text-[11px] mb-1">
                  Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  placeholder="Design story, materials, and origin..."
                  className="w-full border border-nordic-gray/30 p-2.5 outline-none focus:border-nordic-charcoal"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-nordic-gray/15">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-nordic-gray/30 px-5 py-2.5 uppercase tracking-wider text-[11px] font-medium text-nordic-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border border-nordic-charcoal bg-nordic-charcoal px-6 py-2.5 uppercase tracking-wider text-[11px] font-semibold text-white hover:bg-nordic-terracotta hover:border-nordic-terracotta transition-colors"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
