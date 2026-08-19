import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Fjord Sofa",
    slug: "fjord-sofa",
    price: 1299,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A low, modular sofa designed for cozy gatherings and effortless Scandinavian living, upholstered in a soft oatmeal bouclé.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 2,
    name: "Rico Lounge Chair",
    slug: "rico-lounge-chair",
    price: 799,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A sculptural lounge chair with soft upholstery and warm walnut legs, crafted for relaxed everyday reading and conversation.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 3,
    name: "Eira Coffee Table",
    slug: "eira-coffee-table",
    price: 490,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A slim travertine coffee table with rounded corners and a quiet, monolithic presence for layered living room styling.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 4,
    name: "Ingrid Bookcase",
    slug: "ingrid-bookcase",
    price: 780,
    category: "Furniture",
    collection: "Workspace",
    description:
      "An open oak shelving unit with a clean vertical profile, perfect for curating books, ceramics, and quiet desk-side storage.",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 5,
    name: "Maja Desk",
    slug: "maja-desk",
    price: 890,
    category: "Furniture",
    collection: "Workspace",
    description:
      "A spacious light-oak desk with a clean silhouette and hidden cable routing, designed to keep the working day calm and ordered.",
    image:
      "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 6,
    name: "Luma Floor Lamp",
    slug: "luma-floor-lamp",
    price: 380,
    category: "Lighting",
    collection: "Workspace",
    description:
      "A slim floor lamp with a brushed brass finish and soft diffused light, adding a warm glow to desks and reading corners.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 7,
    name: "Vega Dining Table",
    slug: "vega-dining-table",
    price: 1490,
    category: "Furniture",
    collection: "Dining Room",
    description:
      "Solid oak dining table with soft edges and a clean silhouette, made for long, slow dinners with family and friends.",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 8,
    name: "Aurora Pendant",
    slug: "aurora-pendant",
    price: 420,
    category: "Lighting",
    collection: "Dining Room",
    description:
      "A hand-blown glass pendant that casts a warm, calm glow over dining tables, entryways, and morning coffee corners.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 9,
    name: "Kora Tray",
    slug: "kora-tray",
    price: 120,
    category: "Accessories",
    collection: "Dining Room",
    description:
      "A tactile woven tray for coffee rituals, bread service, and everyday tabletop styling in a quiet neutral weave.",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 10,
    name: "Svan Bed",
    slug: "svan-bed",
    price: 1690,
    category: "Furniture",
    collection: "Bedroom",
    description:
      "A low-profile oak bed with a gently curved headboard, inviting slow mornings and quiet evenings in soft linen.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 11,
    name: "Lino Throw",
    slug: "lino-throw",
    price: 180,
    category: "Textiles",
    collection: "Bedroom",
    description:
      "A wool-blend throw in a quiet neutral palette for layered comfort, tactile warmth, and effortless bed and sofa styling.",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 12,
    name: "Nia Bedside",
    slug: "nia-bedside",
    price: 260,
    category: "Furniture",
    collection: "Bedroom",
    description:
      "A compact oak bedside table with a recessed drawer and soft rounded edges, keeping the essentials within easy reach.",
    image:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 13,
    name: "Björk Dining Chair",
    slug: "bjork-dining-chair",
    price: 420,
    category: "Furniture",
    collection: "Dining Room",
    description:
      "A solid ash dining chair with a gently curved backrest and woven paper-cord seat, light enough to pull close or tuck away.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 14,
    name: "Sol Pendant",
    slug: "sol-pendant",
    price: 310,
    category: "Lighting",
    collection: "Bedroom",
    description:
      "A petite spun-copper pendant with a warm patina, casting a focused pool of light over bedside tables and reading nooks.",
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 15,
    name: "Vinter Rug",
    slug: "vinter-rug",
    price: 540,
    category: "Textiles",
    collection: "Living Room",
    description:
      "A hand-tufted wool rug in muted earth tones, grounding living spaces with quiet texture and a soft, dense pile.",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 16,
    name: "Kiln Bowl Set",
    slug: "kiln-bowl-set",
    price: 95,
    category: "Kitchen",
    collection: "Dining Room",
    description:
      "A set of four stoneware bowls with a matte off-white glaze, hand-finished for subtle variation in every piece.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 17,
    name: "Hem Linen Napkins",
    slug: "hem-linen-napkins",
    price: 65,
    category: "Kitchen",
    collection: "Dining Room",
    description:
      "Stonewashed linen napkins in a soft flax tone, sold as a set of four — designed to soften further with every wash.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 18,
    name: "Halo Side Table",
    slug: "halo-side-table",
    price: 340,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A round ash side table with a slim turned leg and chamfered edge, sized for a lamp, a book, and a cup of coffee.",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 19,
    name: "Roux Sofa",
    slug: "roux-sofa",
    price: 1650,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A relaxed three-seater sofa in warm terracotta boucle, with slim tubular legs for a light, modern silhouette. Equally at home indoors or on a covered terrace.",
    image: "/images/products/terracotta-sofa-1.webp",
    images: [
      "/images/products/terracotta-sofa-1.webp",
      "/images/products/terracotta-sofa-2.webp",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 20,
    name: "Alba Wardrobe",
    slug: "alba-wardrobe",
    price: 1890,
    category: "Furniture",
    collection: "Bedroom",
    description:
      "A tall two-door wardrobe in solid light oak, with vertical panel detailing and soft-close hinges. Generous storage with a quiet, architectural presence.",
    image: "/images/products/oak-wardrobe-1.webp",
    images: [
      "/images/products/oak-wardrobe-1.webp",
      "/images/products/oak-wardrobe-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 21,
    name: "Nyla Cabinet",
    slug: "nyla-cabinet",
    price: 1420,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A dark stained cabinet raised on slender tapered legs, offering concealed storage with a sculptural, freestanding feel for any living space.",
    image: "/images/products/dark-cabinet-1.webp",
    images: [
      "/images/products/dark-cabinet-1.webp",
      "/images/products/dark-cabinet-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 22,
    name: "Mira Side Table",
    slug: "mira-side-table",
    price: 340,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A round pedestal side table in a rich burgundy finish, sized perfectly for a lamp, a cup of coffee, or an evening glass of wine beside the sofa.",
    image: "/images/products/burgundy-side-table-1.webp",
    images: [
      "/images/products/burgundy-side-table-1.webp",
      "/images/products/burgundy-side-table-2.webp",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 23,
    name: "Boule Pouf — Cream",
    slug: "boule-pouf-cream",
    price: 280,
    category: "Furniture",
    collection: "Living Room",
    description:
      "A stacked, sculptural pouf in soft cream boucle. Doubles as extra seating or a side table, bringing a playful softness to any corner.",
    image: "/images/products/cream-pouf-1.webp",
    images: [
      "/images/products/cream-pouf-1.webp",
      "/images/products/cream-pouf-2.webp",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 24,
    name: "Boule Pouf — Grey",
    slug: "boule-pouf-grey",
    price: 280,
    category: "Furniture",
    collection: "Living Room",
    description:
      "The same stacked silhouette as the Boule Pouf, in a quiet warm grey. A versatile companion piece for layered, textural seating arrangements.",
    image: "/images/products/grey-pouf-1.webp",
    images: [
      "/images/products/grey-pouf-1.webp",
      "/images/products/grey-pouf-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 25,
    name: "Solstad Dining Table",
    slug: "solstad-dining-table",
    price: 1980,
    category: "Furniture",
    collection: "Dining Room",
    description:
      "A generous dining table in solid light oak with a clean rectangular top and sturdy trestle legs, built to gather family and friends for years to come.",
    image: "/images/products/oak-dining-table-1.webp",
    images: [
      "/images/products/oak-dining-table-1.webp",
      "/images/products/oak-dining-table-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 26,
    name: "Filo Desk Lamp",
    slug: "filo-desk-lamp",
    price: 240,
    category: "Lighting",
    collection: "Workspace",
    description:
      "A sculptural wire-frame desk lamp with a slender profile, casting a focused, warm glow over any workspace without taking up visual space.",
    image: "/images/products/wire-desk-lamp-1.webp",
    images: [
      "/images/products/wire-desk-lamp-1.webp",
      "/images/products/wire-desk-lamp-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 27,
    name: "Dorma Table Lamp",
    slug: "dorma-table-lamp",
    price: 195,
    category: "Lighting",
    collection: "Living Room",
    description:
      "A classic domed table lamp in soft white, bringing gentle, diffused light to a console or side table with quiet, timeless charm.",
    image: "/images/products/dome-table-lamp-1.webp",
    images: [
      "/images/products/dome-table-lamp-1.webp",
      "/images/products/dome-table-lamp-2.jpg",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 28,
    name: "Washi Pendant",
    slug: "washi-pendant",
    price: 165,
    category: "Lighting",
    collection: "Dining Room",
    description:
      "A round paper pendant that diffuses light into a warm, even glow — a soft focal point for dining tables and reading corners alike.",
    image: "/images/products/paper-pendant-1.webp",
    images: [
      "/images/products/paper-pendant-1.webp",
      "/images/products/paper-pendant-2.webp",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 29,
    name: "Tela Wall Sconce",
    slug: "tela-wall-sconce",
    price: 145,
    category: "Lighting",
    collection: "Hallway",
    description:
      "A linen-shaded wall sconce on a slim black arm, adding soft ambient light and a tactile, textile warmth to any wall.",
    image: "/images/products/linen-wall-sconce-1.webp",
    images: [
      "/images/products/linen-wall-sconce-1.webp",
      "/images/products/linen-wall-sconce-2.jpg",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 30,
    name: "Salvia Desk Lamp",
    slug: "salvia-desk-lamp",
    price: 260,
    category: "Lighting",
    collection: "Workspace",
    description:
      "An articulated desk lamp in a muted sage green, combining an adjustable arm with a confident, architectural silhouette.",
    image: "/images/products/green-desk-lamp-1.webp",
    images: [
      "/images/products/green-desk-lamp-1.webp",
      "/images/products/green-desk-lamp-2.webp",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 31,
    name: "Cava Pendant",
    slug: "cava-pendant",
    price: 320,
    category: "Lighting",
    collection: "Living Room",
    description:
      "A cylindrical pendant in a deep charcoal finish with a brushed brass rim, suspended low for an intimate, sculptural glow.",
    image: "/images/products/cylinder-pendant-1.webp",
    images: [
      "/images/products/cylinder-pendant-1.webp",
      "/images/products/cylinder-pendant-2.webp",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 32,
    name: "Fungi Table Lamp",
    slug: "fungi-table-lamp",
    price: 175,
    category: "Lighting",
    collection: "Bedroom",
    description:
      "A gently ribbed, mushroom-shaped table lamp in warm off-white, radiating soft, cozy light — equally at home indoors or on a covered porch.",
    image: "/images/products/mushroom-lamp-1.webp",
    images: [
      "/images/products/mushroom-lamp-1.webp",
      "/images/products/mushroom-lamp-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 33,
    name: "Colonna Floor Lamp",
    slug: "colonna-floor-lamp",
    price: 410,
    category: "Lighting",
    collection: "Living Room",
    description:
      "A tall, softly fluted floor lamp in white, acting as a quiet sculptural column of light for corners and reading nooks.",
    image: "/images/products/tall-floor-lamp-1.webp",
    images: [
      "/images/products/tall-floor-lamp-1.webp",
      "/images/products/tall-floor-lamp-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 34,
    name: "Junco Rattan Pendant",
    slug: "junco-rattan-pendant",
    price: 210,
    category: "Lighting",
    collection: "Dining Room",
    description:
      "A woven rattan pendant with a low, wide silhouette, filtering light into warm dappled patterns — a natural, textural statement piece.",
    image: "/images/products/rattan-pendant-1.webp",
    images: [
      "/images/products/rattan-pendant-1.webp",
      "/images/products/rattan-pendant-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 35,
    name: "Nomad Portable Lamp",
    slug: "nomad-portable-lamp",
    price: 130,
    category: "Lighting",
    collection: "Accessories",
    description:
      "A cordless, rechargeable table lamp in warm beige metal, designed to move freely from desk to dining table to bedside.",
    image: "/images/products/portable-lamp-1.webp",
    images: [
      "/images/products/portable-lamp-1.webp",
      "/images/products/portable-lamp-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 36,
    name: "Tula Braided Baskets",
    slug: "tula-braided-baskets",
    price: 85,
    category: "Accessories",
    collection: "Living Room",
    description:
      "A set of hand-braided natural fiber baskets featuring earthy terracotta accent stripes. Ideal for holding throws, cushions, or everyday essentials.",
    image: "/images/products/braided-baskets-1.webp",
    images: [
      "/images/products/braided-baskets-1.webp",
      "/images/products/braided-baskets-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 37,
    name: "Aalto Fluted Bowl",
    slug: "aalto-fluted-bowl",
    price: 65,
    category: "Accessories",
    collection: "Dining Room",
    description:
      "A sculptural stoneware pedestal bowl with clean vertical fluting. Makes a striking centerpiece on a dining table or kitchen console.",
    image: "/images/products/fluted-pedestal-bowl-1.webp",
    images: [
      "/images/products/fluted-pedestal-bowl-1.webp",
      "/images/products/fluted-pedestal-bowl-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 38,
    name: "Facet Tall Vase",
    slug: "facet-tall-vase",
    price: 110,
    category: "Accessories",
    collection: "Living Room",
    description:
      "An architectural ceramic vase defined by sharp geometric facets and an off-white matte glaze. Designed to elevate tall floral branches.",
    image: "/images/products/geometric-tall-vase-1.webp",
    images: [
      "/images/products/geometric-tall-vase-1.webp",
      "/images/products/geometric-tall-vase-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 39,
    name: "Klay Terracotta Urn",
    slug: "klay-terracotta-urn",
    price: 95,
    category: "Accessories",
    collection: "Hallway",
    description:
      "Crafted from raw, unglazed terracotta, this wide-lip urn celebrates organic imperfections and artisanal warmth.",
    image: "/images/products/clay-urn-vase-1.webp",
    images: [
      "/images/products/clay-urn-vase-1.webp",
      "/images/products/clay-urn-vase-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 40,
    name: "Pond Organic Mirror",
    slug: "pond-organic-mirror",
    price: 180,
    category: "Accessories",
    collection: "Bedroom",
    description:
      "An open, fluid wall mirror inspired by the gentle curves of water. Adds reflective depth and modern sculptural beauty to any room.",
    image: "/images/products/organic-wall-mirror-1.webp",
    images: [
      "/images/products/organic-wall-mirror-1.webp",
      "/images/products/organic-wall-mirror-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 41,
    name: "Sinu Wire Candelabra",
    slug: "sinu-wire-candelabra",
    price: 55,
    category: "Accessories",
    collection: "Dining Room",
    description:
      "A continuous curved metal wire candleholder in a warm off-white finish. Holds taper candles with light, expressive elegance.",
    image: "/images/products/curved-wire-candelabra-1.webp",
    images: [
      "/images/products/curved-wire-candelabra-1.webp",
      "/images/products/curved-wire-candelabra-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 42,
    name: "Petra Low Stone Dish",
    slug: "petra-low-stone-dish",
    price: 75,
    category: "Accessories",
    collection: "Living Room",
    description:
      "A low-profile dish sculpted from dark basalt-finish stoneware, offering a grounded, serene accent for coffee tables or shelving units.",
    image: "/images/products/sculptural-stone-dish-1.webp",
    images: [
      "/images/products/sculptural-stone-dish-1.webp",
      "/images/products/sculptural-stone-dish-2.webp",
    ],
    featured: false,
    newArrival: false,
  },
  {
    id: 43,
    name: "Brass Shield Sconce",
    slug: "brass-shield-sconce",
    price: 85,
    category: "Accessories",
    collection: "Hallway",
    description:
      "A wall-mounted brass candle holder with an elongated reflective oval backplate that catches and magnifies soft candlelight.",
    image: "/images/products/brass-wall-sconce-holder-1.webp",
    images: [
      "/images/products/brass-wall-sconce-holder-1.webp",
      "/images/products/brass-wall-sconce-holder-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
  {
    id: 44,
    name: "Linen Laundry Basket",
    slug: "linen-laundry-basket",
    price: 90,
    category: "Accessories",
    collection: "Bathroom",
    description:
      "A structured wire-frame storage basket with an unbleached linen fabric insert, combining utility with minimalist aesthetics.",
    image: "/images/products/linen-wire-basket-1.webp",
    images: [
      "/images/products/linen-wire-basket-1.webp",
      "/images/products/linen-wire-basket-2.webp",
    ],
    featured: false,
    newArrival: true,
  },
  {
    id: 45,
    name: "Wave Ceramic Vessel",
    slug: "wave-ceramic-vessel",
    price: 125,
    category: "Accessories",
    collection: "Living Room",
    description:
      "A dramatic fluted ceramic vessel with flowing, rhythmic ridges. Designed as a standalone artistic statement piece.",
    image: "/images/products/wavy-ceramic-planter-1.webp",
    images: [
      "/images/products/wavy-ceramic-planter-1.webp",
      "/images/products/wavy-ceramic-planter-2.webp",
    ],
    featured: true,
    newArrival: false,
  },
];
