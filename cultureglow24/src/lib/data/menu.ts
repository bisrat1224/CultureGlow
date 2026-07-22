export type DietFlag = "veg" | "vegan" | "gf" | "spicy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  diet?: DietFlag[];
  tag?: string; // e.g. "Popular" - the small green corner tag on menu-row
}

export interface MainsItem extends MenuItem {
  ribbon?: string; 
}

export interface CategoryMeta {
  id: string; // anchor id, matches category-nav-btn's data-cat
  navLabel: string;
  eyebrow: string;
  titleBeforeEm: string;
  titleEm: string;
  variant: "cream" | "dark";
  countLabel: string;
}


export const CATEGORIES: CategoryMeta[] = [
  {
    id: "starters",
    navLabel: "Starters",
    eyebrow: "Begin the Meal",
    titleBeforeEm: "Start",
    titleEm: "ers",
    variant: "cream",
    countLabel: "2 dishes",
  },
  {
    id: "mains",
    navLabel: "Mains",
    eyebrow: "The Signature Selection",
    titleBeforeEm: "Main ",
    titleEm: "Dishes",
    variant: "dark",
    countLabel: "5 dishes",
  },
  {
    id: "veg-vegan",
    navLabel: "Veg & Vegan",
    eyebrow: "Plant-Forward Favourites",
    titleBeforeEm: "Veg & ",
    titleEm: "Vegan",
    variant: "cream",
    countLabel: "2 dishes",
  },
  {
    id: "desserts",
    navLabel: "Desserts",
    eyebrow: "Something Sweet",
    titleBeforeEm: "",
    titleEm: "Desserts",
    variant: "dark",
    countLabel: "2 dishes",
  },
  {
    id: "drinks",
    navLabel: "Drinks",
    eyebrow: "To Sip & Savour",
    titleBeforeEm: "",
    titleEm: "Drinks",
    variant: "cream",
    countLabel: "2 drinks",
  },
];

export const STARTERS_ITEMS: MenuItem[] = [
  {
    id: "sambusa",
    name: "Sambusa",
    description: "Crisp pastry parcels filled with spiced lentils, onion, and jalapeño, fried until golden and served with a tangy dipping sauce.",
    price: "£180",
    image: "/assets/images/injera-place.jpg",
    alt: "Sambusa",
    diet: ["veg", "vegan"],
    tag: "Popular",
  },
  {
    id: "kategna",
    name: "Kategna",
    description: "Toasted injera brushed with berbere-spiced niter kibbeh, a smoky, buttery starter with a gentle chili kick.",
    price: "£150",
    image: "/assets/images/platter-big.jpg",
    alt: "Kategna",
    diet: ["veg", "spicy"],
  },
];

export const MAINS_ITEMS: MainsItem[] = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Slow-simmered chicken in a rich berbere sauce with hard-boiled egg, our most requested dish for a reason.",
    price: "£520",
    image: "/assets/images/stew-pans.jpg",
    alt: "Doro Wat",
    diet: ["spicy"],
  },
  {
    id: "injera-with-tibs-main",
    name: "Injera with Tibs",
    description: "Pan-seared beef tibs tossed with onion, garlic, and rosemary, served over fresh injera.",
    price: "£450",
    image: "/assets/images/injera-place.jpg",
    alt: "Injera with Tibs",
    diet: ["spicy"],
  },
  {
    id: "injera-platter-main",
    name: "Injera Platter",
    description: "A generous platter of injera paired with a rotating selection of vegetable and lentil sides.",
    price: "£450",
    image: "/assets/images/injera-place.jpg",
    alt: "Injera Platter",
    diet: ["gf", "veg"],
  },
  {
    id: "family-sharing-platter-main",
    name: "Family Sharing Platter",
    description: "Our signature spread of stews, injera, and sides, built for sharing around the table.",
    price: "£460",
    image: "/assets/images/sharing-hands.jpg",
    alt: "Family Sharing Platter",
    diet: ["spicy"],
  },
  {
    id: "habesha-feast-platter-main",
    name: "Habesha Feast Platter",
    description: "The full CultureGlow24 experience, doro wat, tibs, and a full round of traditional sides on one platter.",
    price: "£3,200",
    image: "/assets/images/sharing-hands.jpg",
    alt: "Habesha Feast Platter",
    diet: ["spicy", "gf"],
    ribbon: "Chef's Special",
  },
];

export const VEG_VEGAN_ITEMS: MenuItem[] = [
  {
    id: "beyaynetu-menu",
    name: "Beyaynetu",
    description: "A colourful vegan combination platter of lentils, split peas, and seasonal vegetables served on injera.",
    price: "£620",
    image: "/assets/images/platter-big.jpg",
    alt: "Beyaynetu",
    diet: ["veg", "vegan", "gf"],
  },
  {
    id: "shiro-wat",
    name: "Shiro Wat",
    description: "Ground chickpea stew simmered with garlic, onion, and berbere, warm, hearty, and naturally vegan.",
    price: "£360",
    image: "/assets/images/stew-pans.jpg",
    alt: "Shiro Wat",
    diet: ["veg", "vegan", "gf", "spicy"],
    tag: "Popular",
  },
];

export const DESSERTS_ITEMS: MenuItem[] = [
  {
    id: "himbasha",
    name: "Himbasha",
    description: "Lightly sweetened Ethiopian celebration bread, scented with cardamom and a touch of honey.",
    price: "£220",
    image: "/assets/images/dress-green.jpg",
    alt: "Himbasha",
    diet: ["veg"],
  },
  {
    id: "dabo-kolo-sweet-bites",
    name: "Dabo Kolo Sweet Bites",
    description: "Bite-sized roasted barley snacks with a hint of sugar and spice, perfect alongside coffee.",
    price: "£160",
    image: "/assets/images/dress-burgundy.jpg",
    alt: "Dabo Kolo Sweet Bites",
    diet: ["veg", "vegan"],
  },
];

export const DRINKS_ITEMS: MenuItem[] = [
  {
    id: "tej-honey-wine-menu",
    name: "Tej Honey Wine",
    description: "Traditional Ethiopian honey wine, fermented with gesho leaves for a naturally tart finish.",
    price: "£620",
    image: "/assets/images/platter-big.jpg",
    alt: "Tej Honey Wine",
  },
  {
    id: "ethiopian-coffee-ceremony",
    name: "Ethiopian Coffee Ceremony",
    description: "Freshly roasted beans brewed the traditional way and served in three rounds, Abol, Tona, and Baraka.",
    price: "£250",
    image: "/assets/images/stew-pans.jpg",
    alt: "Ethiopian Coffee Ceremony",
    diet: ["veg", "vegan"],
    tag: "Popular",
  },
];


export const DIET_LEGEND: { flag: DietFlag; label: string; chipLabel: string }[] = [
  { flag: "veg", label: "Vegetarian", chipLabel: "V" },
  { flag: "vegan", label: "Vegan", chipLabel: "VG" },
  { flag: "gf", label: "Gluten-Free", chipLabel: "GF" },
  { flag: "spicy", label: "Spicy", chipLabel: "🌶" },
];

/** Home's "Signature Dishes" preview - 4 picks from the full menu. */
export const FEATURED_MENU_ITEMS: MenuItem[] = [
  STARTERS_ITEMS[0],   // Sambusa
  MAINS_ITEMS[0],      // Doro Wat
  MAINS_ITEMS[2],      // Injera Platter
  VEG_VEGAN_ITEMS[0],  // Beyaynetu
];