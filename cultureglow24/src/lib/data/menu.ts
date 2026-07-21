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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£180",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Sambusa",
    diet: ["veg", "vegan"],
    tag: "Popular",
  },
  {
    id: "kategna",
    name: "Kategna",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£150",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Kategna",
    diet: ["veg", "spicy"],
  },
];

export const MAINS_ITEMS: MainsItem[] = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    price: "£520",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
    alt: "Doro Wat",
    diet: ["spicy"],
  },
  {
    id: "injera-with-tibs-main",
    name: "Injera with Tibs",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    price: "£450",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Injera with Tibs",
    diet: ["spicy"],
  },
  {
    id: "injera-platter-main",
    name: "Injera Platter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    price: "£450",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Injera Platter",
    diet: ["gf", "veg"],
  },
  {
    id: "family-sharing-platter-main",
    name: "Family Sharing Platter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    price: "£460",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Family Sharing Platter",
    diet: ["spicy"],
  },
  {
    id: "habesha-feast-platter-main",
    name: "Habesha Feast Platter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    price: "£3,200",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Habesha Feast Platter",
    diet: ["spicy", "gf"],
    ribbon: "Chef's Special",
  },
];

export const VEG_VEGAN_ITEMS: MenuItem[] = [
  {
    id: "beyaynetu-menu",
    name: "Beyaynetu",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£620",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Beyaynetu",
    diet: ["veg", "vegan", "gf"],
  },
  {
    id: "shiro-wat",
    name: "Shiro Wat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£360",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
    alt: "Shiro Wat",
    diet: ["veg", "vegan", "gf", "spicy"],
    tag: "Popular",
  },
];

export const DESSERTS_ITEMS: MenuItem[] = [
  {
    id: "himbasha",
    name: "Himbasha",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£220",
    image: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
    alt: "Himbasha",
    diet: ["veg"],
  },
  {
    id: "dabo-kolo-sweet-bites",
    name: "Dabo Kolo Sweet Bites",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£160",
    image: "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
    alt: "Dabo Kolo Sweet Bites",
    diet: ["veg", "vegan"],
  },
];

export const DRINKS_ITEMS: MenuItem[] = [
  {
    id: "tej-honey-wine-menu",
    name: "Tej Honey Wine",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£620",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Tej Honey Wine",
  },
  {
    id: "ethiopian-coffee-ceremony",
    name: "Ethiopian Coffee Ceremony",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "£250",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
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
