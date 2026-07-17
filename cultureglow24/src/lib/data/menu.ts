import type { MenuItem } from "@/components/home/KitchenSection/MenuRow";

/**
 * Full menu catalogue — single source of truth (Chunk 8, Stage 0),
 * mirroring products.ts. First 4 entries are index.html's original
 * dishes, kept verbatim. Entries 5–8 are Lorem Ipsum placeholders,
 * reusing existing image assets, padding the list until real menu
 * items (up to 30, Pending on the Content Checklist) arrive.
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: "injera-tibs",
    name: "Injera with Tibs",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 380",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Injera with stews",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 520",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Doro Wat",
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 340",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Beyaynetu",
  },
  {
    id: "family-sharing-platter",
    name: "Family Sharing Platter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 460",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Family sharing platter",
  },
  // --- Lorem Ipsum placeholders (pad to 8) ---
  {
    id: "menu-item-5",
    name: "Lorem Ipsum Dish 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 000",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
    alt: "Lorem ipsum placeholder dish photo",
  },
  {
    id: "menu-item-6",
    name: "Lorem Ipsum Dish 6",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 000",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Lorem ipsum placeholder dish photo",
  },
  {
    id: "menu-item-7",
    name: "Lorem Ipsum Dish 7",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 000",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Lorem ipsum placeholder dish photo",
  },
  {
    id: "menu-item-8",
    name: "Lorem Ipsum Dish 8",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 000",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Lorem ipsum placeholder dish photo",
  },
];

/** IDs shown in Home's "From the Kitchen" preview — the original 4. */
const FEATURED_MENU_ITEM_IDS = [
  "injera-tibs",
  "doro-wat",
  "beyaynetu",
  "family-sharing-platter",
];

export const FEATURED_MENU_ITEMS = MENU_ITEMS.filter((item) =>
  FEATURED_MENU_ITEM_IDS.includes(item.id)
);