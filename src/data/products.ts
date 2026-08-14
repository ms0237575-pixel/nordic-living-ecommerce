import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Rico Lounge Chair",
    slug: "rico-lounge-chair",
    price: 799,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A sculptural lounge chair with soft upholstery and warm walnut legs for relaxed everyday comfort.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549187774-b4e9f0456aab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-3b8b2f6f9c17?q=80&w=1200&auto=format&fit=crop",
    ],

    featured: true,
    newArrival: true,
  },
  {
    id: 2,
    name: "Fjord Sofa",
    slug: "fjord-sofa",
    price: 1299,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A low, modular sofa designed for cozy gatherings and effortless Scandinavian living.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567016432779-6f3f7d3f2f9a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],

    featured: true,
    newArrival: false,
  },
  {
    id: 3,
    name: "Vega Dining Table",
    slug: "vega-dining-table",
    price: 1490,
    category: "Furniture",
    collection: "Dining Room",
    description:
      "Solid oak dining table with soft edges and a clean silhouette for everyday hosting.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 4,
    name: "Aurora Pendant",
    slug: "aurora-pendant",
    price: 420,
    category: "Lighting",
    collection: "Dining Room",
    description:
      "A warm glass pendant that creates a calm glow for dining spaces and entryways.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 5,
    name: "Luma Floor Lamp",
    slug: "luma-floor-lamp",
    price: 380,
    category: "Lighting",
    collection: "Reading Nook",
    description:
      "A slim floor lamp with a brushed brass finish and soft diffused light for evening rituals.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 6,
    name: "Tidal Wall Sconce",
    slug: "tidal-wall-sconce",
    price: 295,
    category: "Lighting",
    collection: "Hallway",
    description:
      "A compact wall light with a softly brushed metal profile and ambient glow.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 7,
    name: "Kora Tray",
    slug: "kora-tray",
    price: 120,
    category: "Accessories",
    collection: "Tabletop",
    description:
      "A tactile woven tray for coffee rituals, entryway organization, and everyday styling.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 8,
    name: "Lino Throw",
    slug: "lino-throw",
    price: 180,
    category: "Accessories",
    collection: "Textiles",
    description:
      "A wool-blend throw in a quiet neutral palette for layered comfort and texture.",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: false,
  },
];
