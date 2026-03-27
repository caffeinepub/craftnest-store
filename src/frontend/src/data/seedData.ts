import type { Category, Product, Review } from "../types";

export const SEED_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Jewelry",
    description: "Handcrafted rings, necklaces, bracelets and earrings",
    imageUrl: "/assets/generated/cat-jewelry.dim_400x300.jpg",
    icon: "💎",
    color: "bg-craftnest-blush",
  },
  {
    id: 2,
    name: "Pottery",
    description: "Artisan ceramics, bowls, mugs, and vases",
    imageUrl: "/assets/generated/cat-pottery.dim_400x300.jpg",
    icon: "🏺",
    color: "bg-craftnest-beige",
  },
  {
    id: 3,
    name: "Paintings",
    description: "Original watercolors, oils, and prints",
    imageUrl: "/assets/generated/cat-paintings.dim_400x300.jpg",
    icon: "🎨",
    color: "bg-craftnest-lavender",
  },
  {
    id: 4,
    name: "Home Decor",
    description: "Handmade wall art, candles, and woven accents",
    imageUrl: "/assets/generated/cat-homedecor.dim_400x300.jpg",
    icon: "🕯️",
    color: "bg-craftnest-sage",
  },
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Moonstone Pendant Necklace",
    categoryId: 1,
    price: 48,
    description:
      'Delicate handcrafted silver necklace with a genuine moonstone pendant set in a twisted wire frame. Adjustable 18" chain.',
    imageUrl: "/assets/generated/prod-moonstone-necklace.dim_400x400.jpg",
    featured: true,
    stock: 12,
  },
  {
    id: 2,
    name: "Crystal Beaded Bracelet Set",
    categoryId: 1,
    price: 32,
    description:
      "Set of three handstrung bracelets with amethyst, rose quartz, and labradorite beads. Each bracelet is uniquely made.",
    imageUrl: "/assets/generated/prod-crystal-bracelet.dim_400x400.jpg",
    featured: true,
    stock: 20,
  },
  {
    id: 3,
    name: "Gold Leaf Turquoise Earrings",
    categoryId: 1,
    price: 38,
    description:
      "Lightweight hammered gold-filled earrings with genuine turquoise stone drops. Hypoallergenic hooks.",
    imageUrl: "/assets/generated/prod-gold-earrings.dim_400x400.jpg",
    featured: false,
    stock: 8,
  },
  {
    id: 4,
    name: "Terracotta Floral Pot",
    categoryId: 2,
    price: 55,
    description:
      "Hand-thrown terracotta clay pot with hand-painted indigo floral motifs. Food safe glaze, perfect for plants or as a decorative piece.",
    imageUrl: "/assets/generated/prod-terracotta-pot.dim_400x400.jpg",
    featured: true,
    stock: 6,
  },
  {
    id: 5,
    name: "Speckled Ceramic Mug Set",
    categoryId: 2,
    price: 68,
    description:
      "Set of three hand-thrown ceramic mugs with a natural speckled glaze in sage, dusty rose, and cream. Dishwasher safe.",
    imageUrl: "/assets/generated/prod-ceramic-mugs.dim_400x400.jpg",
    featured: false,
    stock: 9,
  },
  {
    id: 6,
    name: "Botanical Watercolor Print",
    categoryId: 3,
    price: 75,
    description:
      "Original hand-painted watercolor botanical study of garden roses. 8×10 inches, archival paper, unframed. Ships with protective sleeve.",
    imageUrl: "/assets/generated/prod-botanical-painting.dim_400x400.jpg",
    featured: true,
    stock: 4,
  },
  {
    id: 7,
    name: "Sunset Abstract Canvas",
    categoryId: 3,
    price: 120,
    description:
      "Expressive oil painting in warm sunset tones — peach, amber, and gold. 12×16 inches on stretched canvas, ready to hang.",
    imageUrl: "/assets/generated/prod-abstract-painting.dim_400x400.jpg",
    featured: false,
    stock: 3,
  },
  {
    id: 8,
    name: "Knotted Cotton Wall Hanging",
    categoryId: 4,
    price: 89,
    description:
      'Handwoven cotton rope wall hanging with geometric knot patterns on a driftwood dowel. Measures 18" wide × 32" long.',
    imageUrl: "/assets/generated/prod-wall-hanging.dim_400x400.jpg",
    featured: false,
    stock: 7,
  },
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Sophie Laurent",
    rating: 5,
    comment:
      "Absolutely in love with my moonstone necklace! The craftsmanship is exquisite — it arrived beautifully packaged and looked even better in person. CraftNest is my new favourite shop.",
    productId: 1,
    approved: true,
  },
  {
    id: 2,
    author: "Marcus Webb",
    rating: 5,
    comment:
      "Ordered the ceramic mug set as a gift and it was a huge hit. The quality is outstanding — thick walls, perfect glaze, and they feel wonderful to hold. Highly recommend!",
    productId: 5,
    approved: true,
  },
  {
    id: 3,
    author: "Priya Sharma",
    rating: 4,
    comment:
      "The botanical watercolor print is stunning — I've had three people ask about it since I hung it up. Shipping was fast and the packaging was very careful. Will definitely order again.",
    productId: 6,
    approved: true,
  },
  {
    id: 4,
    author: "Ella Johansson",
    rating: 5,
    comment:
      "The crystal bracelet set is pure magic. Each one has such unique energy and the beads are gorgeous. I wear at least one every day. Thank you for creating something so special!",
    productId: 2,
    approved: true,
  },
  {
    id: 5,
    author: "Tomás Rivera",
    rating: 5,
    comment:
      "Bought the terracotta pot for my wife and she cried happy tears — it's that beautiful. You can tell every piece is made with genuine care and skill. 10/10, will order more.",
    productId: 4,
    approved: true,
  },
];
