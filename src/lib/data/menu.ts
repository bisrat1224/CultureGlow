import menuData from "../../../content/menu.json";

export type DietFlag = "veg" | "vegan" | "gf" | "spicy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  diet?: DietFlag[];
  tag?: string;
}

export interface CategoryMeta {
  id: string;
  navLabel: string;
  eyebrow: string;
  titleBeforeEm: string;
  titleEm: string;
  variant: "cream" | "dark";
  countLabel: string;
}

/** Loaded from content/menu.json — edit that file to change the menu. */
export const CATEGORIES: CategoryMeta[] = menuData.categories as CategoryMeta[];

export const STARTERS_ITEMS: MenuItem[] = menuData.items.starters as MenuItem[];
export const MAINS_ITEMS: MenuItem[] = menuData.items.mains as MenuItem[];
export const VEG_VEGAN_ITEMS: MenuItem[] = menuData.items[
  "veg-vegan"
] as MenuItem[];
export const DESSERTS_ITEMS: MenuItem[] = menuData.items.desserts as MenuItem[];
export const DRINKS_ITEMS: MenuItem[] = menuData.items.drinks as MenuItem[];

export const DIET_LEGEND: {
  flag: DietFlag;
  label: string;
  chipLabel: string;
}[] = menuData.dietLegend as {
  flag: DietFlag;
  label: string;
  chipLabel: string;
}[];

const ALL_ITEMS: MenuItem[] = [
  ...STARTERS_ITEMS,
  ...MAINS_ITEMS,
  ...VEG_VEGAN_ITEMS,
  ...DESSERTS_ITEMS,
  ...DRINKS_ITEMS,
];

export const FEATURED_MENU_ITEMS: MenuItem[] = menuData.featuredItemIds
  .map((id) => ALL_ITEMS.find((i) => i.id === id))
  .filter(Boolean) as MenuItem[];
