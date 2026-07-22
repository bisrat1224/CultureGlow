import type { Product } from "@/components/home/ProductsSection/ProductCard";

export type { Product };

export type ProductCategory = "HABESHA FOOD" | "LIFESTYLE" | "BEAUTY";

export const SHOP_FILTERS: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "HABESHA FOOD", label: "Habesha Food" },
  { value: "LIFESTYLE", label: "Lifestyle" },
  { value: "BEAUTY", label: "Beauty" },
];

export const PRODUCTS: Product[] = [
  {
    id: "injera-platter",
    category: "HABESHA FOOD",
    name: "Injera Platter",
    price: "£450",
    image: "/assets/images/injera-place.jpg",
    alt: "Traditional injera platter with assorted stews",
    description: "A generous injera platter with a rotating selection of stews, sized for one or shared as a starter.",
    gallery: [
      "/assets/images/injera-place.jpg",
      "/assets/images/stew-pans.jpg",
    ],
    allergens: ["Contains gluten (teff and wheat blends vary by batch)", "May contain dairy from ghee-based sauces"],
  },
  {
    id: "habesha-kemis",
    category: "LIFESTYLE",
    name: "Habesha Kemis",
    price: "£3,200",
    image: "/assets/images/dress-green.jpg",
    alt: "Traditional Habesha dress with intricate embroidery",
    description: "A handwoven Habesha kemis with traditional tibeb border embroidery, made for weddings and special occasions.",
    gallery: [
      "/assets/images/dress-green.jpg",
      "/assets/images/dress-burgundy.jpg",
    ],
    allergens: ["Not applicable - clothing item"],
  },
  {
    id: "netela-dress",
    category: "BEAUTY",
    name: "Netela Dress",
    price: "£2,850",
    image: "/assets/images/dress-burgundy.jpg",
    alt: "Elegant Habesha cultural dress",
    description: "A lightweight, hand-finished netela with a woven tibeb edge, worn for ceremonies and everyday elegance alike.",
    gallery: [
      "/assets/images/dress-burgundy.jpg",
      "/assets/images/dress-green.jpg",
    ],
    allergens: ["Not applicable - clothing item"],
  },
  {
    id: "beyaynetu-platter",
    category: "HABESHA FOOD",
    name: "Beyaynetu Platter",
    price: "£620",
    image: "/assets/images/platter-big.jpg",
    alt: "Beyaynetu vegetarian platter",
    description: "A vegan combination platter of lentils, split peas, and seasonal vegetables, generously portioned.",
    gallery: [
      "/assets/images/platter-big.jpg",
      "/assets/images/injera-place.jpg",
    ],
    allergens: ["Contains legumes"],
  },
  // --- Layout placeholders (pad to 8) — still awaiting real client SKUs
  // per Developer Brief Section 5 "Products" (Pending). Names/descriptions
  // below are placeholder copy, not real catalogue items — replace once
  // the client supplies the Content Checklist products via the PM. ---
  {
    id: "product-5",
    category: "HABESHA FOOD",
    name: "Spiced Lentil Stew",
    price: "£380",
    image: "/assets/images/stew-pans.jpg",
    alt: "Bowl of spiced red lentil stew with injera",
    description: "A warming stew of red lentils simmered with berbere and garlic, served with injera on the side.",
    gallery: ["/assets/images/stew-pans.jpg"],
    allergens: ["Contains legumes"],
  },
  {
    id: "product-6",
    category: "LIFESTYLE",
    name: "Embroidered Shawl",
    price: "£1,450",
    image: "/assets/images/sharing-hands.jpg",
    alt: "Hand-embroidered shawl with tibeb trim",
    description: "A hand-embroidered shawl with traditional tibeb trim, a versatile layering piece for any occasion.",
    gallery: ["/assets/images/sharing-hands.jpg"],
    allergens: ["Not applicable - clothing item"],
  },
  {
    id: "product-7",
    category: "BEAUTY",
    name: "Shea & Frankincense Body Oil",
    price: "£650",
    image: "/assets/images/sharing-hands.jpg",
    alt: "Bottle of shea and frankincense body oil",
    description: "A nourishing body oil blending shea butter with frankincense, inspired by traditional Habesha skincare.",
    gallery: ["/assets/images/sharing-hands.jpg"],
    allergens: ["May contain nut derivatives", "Patch test recommended"],
  },
  {
    id: "product-8",
    category: "HABESHA FOOD",
    name: "Mixed Stew Sampler",
    price: "£520",
    image: "/assets/images/platter-big.jpg",
    alt: "Sampler platter of three seasonal stews with injera",
    description: "A sampler of three seasonal stews with injera, ideal for trying a bit of everything.",
    gallery: ["/assets/images/platter-big.jpg"],
    allergens: ["Contains legumes"],
  },
];

/** IDs shown in Home's "Featured Products" section - the original 4. */
const FEATURED_PRODUCT_IDS = [
  "injera-platter",
  "habesha-kemis",
  "netela-dress",
  "beyaynetu-platter",
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) =>
  FEATURED_PRODUCT_IDS.includes(p.id)
);

/** Looks up a single product by its id/slug - used by the single-product page. */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === slug);
}

/**
 * Same-category products, excluding the current one, capped to `limit`.
 * Used for the single-product page's "Related Products" section.
 */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}