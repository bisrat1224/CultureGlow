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
    price: "ETB 450",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Traditional injera platter with assorted stews",
    description: "A generous injera platter with a rotating selection of stews, sized for one or shared as a starter.",
    gallery: [
      "/assets/images/pexels-dbaler-17486836.jpg",
      "/assets/images/pexels-berlinerlights-23858842.jpg",
    ],
    allergens: ["Contains gluten (teff and wheat blends vary by batch)", "May contain dairy from ghee-based sauces"],
  },
  {
    id: "habesha-kemis",
    category: "LIFESTYLE",
    name: "Habesha Kemis",
    price: "ETB 3,200",
    image: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
    alt: "Traditional Habesha dress with intricate embroidery",
    description: "A handwoven Habesha kemis with traditional tibeb border embroidery, made for weddings and special occasions.",
    gallery: [
      "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
      "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
    ],
    allergens: ["Not applicable - clothing item"],
  },
  {
    id: "netela-dress",
    category: "BEAUTY",
    name: "Netela Dress",
    price: "ETB 2,850",
    image: "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
    alt: "Elegant Habesha cultural dress",
    description: "A lightweight, hand-finished netela with a woven tibeb edge, worn for ceremonies and everyday elegance alike.",
    gallery: [
      "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
      "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
    ],
    allergens: ["Not applicable - clothing item"],
  },
  {
    id: "beyaynetu-platter",
    category: "HABESHA FOOD",
    name: "Beyaynetu Platter",
    price: "ETB 620",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Beyaynetu vegetarian platter",
    description: "A vegan combination platter of lentils, split peas, and seasonal vegetables, generously portioned.",
    gallery: [
      "/assets/images/istockphoto-452732099-612x612.jpg",
      "/assets/images/pexels-dbaler-17486836.jpg",
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
    price: "ETB 380",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
    alt: "Bowl of spiced red lentil stew with injera",
    description: "A warming stew of red lentils simmered with berbere and garlic, served with injera on the side.",
    gallery: ["/assets/images/pexels-berlinerlights-23858842.jpg"],
    allergens: ["Contains legumes"],
  },
  {
    id: "product-6",
    category: "LIFESTYLE",
    name: "Embroidered Shawl",
    price: "ETB 1,450",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Hand-embroidered shawl with tibeb trim",
    description: "A hand-embroidered shawl with traditional tibeb trim, a versatile layering piece for any occasion.",
    gallery: ["/assets/images/istockphoto-908729848-612x612.jpg"],
    allergens: ["Not applicable - clothing item"],
  },
  {
    id: "product-7",
    category: "BEAUTY",
    name: "Shea & Frankincense Body Oil",
    price: "ETB 650",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Bottle of shea and frankincense body oil",
    description: "A nourishing body oil blending shea butter with frankincense, inspired by traditional Habesha skincare.",
    gallery: ["/assets/images/istockphoto-908729848-612x612.jpg"],
    allergens: ["May contain nut derivatives", "Patch test recommended"],
  },
  {
    id: "product-8",
    category: "HABESHA FOOD",
    name: "Mixed Stew Sampler",
    price: "ETB 520",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Sampler platter of three seasonal stews with injera",
    description: "A sampler of three seasonal stews with injera, ideal for trying a bit of everything.",
    gallery: ["/assets/images/istockphoto-452732099-612x612.jpg"],
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