import type { Product } from "@/components/home/ProductsSection/ProductCard";

export const PRODUCTS: Product[] = [
  {
    id: "injera-platter",
    category: "HABESHA FOOD",
    name: "Injera Platter",
    price: "ETB 450",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Traditional injera platter with assorted stews",
  },
  {
    id: "habesha-kemis",
    category: "LIFESTYLE",
    name: "Habesha Kemis",
    price: "ETB 3,200",
    image: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
    alt: "Traditional Habesha dress with intricate embroidery",
  },
  {
    id: "netela-dress",
    category: "BEAUTY",
    name: "Netela Dress",
    price: "ETB 2,850",
    image: "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
    alt: "Elegant Habesha cultural dress",
  },
  {
    id: "beyaynetu-platter",
    category: "HABESHA FOOD",
    name: "Beyaynetu Platter",
    price: "ETB 620",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Beyaynetu vegetarian platter",
  },
  // --- Lorem Ipsum placeholders (pad to 8) ---
  {
    id: "product-5",
    category: "HABESHA FOOD",
    name: "Lorem Ipsum Dish",
    price: "ETB 000",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
    alt: "Lorem ipsum placeholder dish photo",
  },
  {
    id: "product-6",
    category: "LIFESTYLE",
    name: "Lorem Ipsum Garment",
    price: "ETB 000",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Lorem ipsum placeholder garment photo",
  },
  {
    id: "product-7",
    category: "BEAUTY",
    name: "Lorem Ipsum Beauty Product",
    price: "ETB 000",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Lorem ipsum placeholder beauty product photo",
  },
  {
    id: "product-8",
    category: "HABESHA FOOD",
    name: "Lorem Ipsum Platter",
    price: "ETB 000",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Lorem ipsum placeholder platter photo",
  },
];

/** IDs shown in Home's "Featured Products" section — the original 4. */
const FEATURED_PRODUCT_IDS = [
  "injera-platter",
  "habesha-kemis",
  "netela-dress",
  "beyaynetu-platter",
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) =>
  FEATURED_PRODUCT_IDS.includes(p.id)
);