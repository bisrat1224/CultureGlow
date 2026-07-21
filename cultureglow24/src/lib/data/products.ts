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
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Traditional injera platter with assorted stews",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    gallery: [
      "/assets/images/pexels-dbaler-17486836.jpg",
      "/assets/images/pexels-berlinerlights-23858842.jpg",
    ],
    allergens: ["Lorem ipsum allergen A", "Lorem ipsum allergen B"],
  },
  {
    id: "habesha-kemis",
    category: "LIFESTYLE",
    name: "Habesha Kemis",
    price: "£3,200",
    image: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
    alt: "Traditional Habesha dress with intricate embroidery",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
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
    price: "£2,850",
    image: "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
    alt: "Elegant Habesha cultural dress",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
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
    price: "£620",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Beyaynetu vegetarian platter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    gallery: [
      "/assets/images/istockphoto-452732099-612x612.jpg",
      "/assets/images/pexels-dbaler-17486836.jpg",
    ],
    allergens: ["Lorem ipsum allergen C"],
  },
  // --- Lorem Ipsum placeholders (pad to 8) ---
  {
    id: "product-5",
    category: "HABESHA FOOD",
    name: "Lorem Ipsum Dish",
    price: "£000",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
    alt: "Lorem ipsum placeholder dish photo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    gallery: ["/assets/images/pexels-berlinerlights-23858842.jpg"],
    allergens: ["Lorem ipsum allergen A"],
  },
  {
    id: "product-6",
    category: "LIFESTYLE",
    name: "Lorem Ipsum Garment",
    price: "£000",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Lorem ipsum placeholder garment photo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    gallery: ["/assets/images/istockphoto-908729848-612x612.jpg"],
    allergens: ["Not applicable - clothing item"],
  },
  {
    id: "product-7",
    category: "BEAUTY",
    name: "Lorem Ipsum Beauty Product",
    price: "£000",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Lorem ipsum placeholder beauty product photo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    gallery: ["/assets/images/istockphoto-908729848-612x612.jpg"],
    allergens: ["Lorem ipsum allergen D"],
  },
  {
    id: "product-8",
    category: "HABESHA FOOD",
    name: "Lorem Ipsum Platter",
    price: "£000",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Lorem ipsum placeholder platter photo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    gallery: ["/assets/images/istockphoto-452732099-612x612.jpg"],
    allergens: ["Lorem ipsum allergen B"],
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
