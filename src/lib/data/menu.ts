import menuData from "../../../content/menu.json";

export type DietFlag = "veg" | "vegan" | "gf" | "spicy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  image: string;
  alt: string;
  diet?: DietFlag[];
  allergens?: string[];
  tag?: string;
  visible?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface CategoryMeta {
  id: string;
  navLabel: string;
  eyebrow: string;
  titleBeforeEm: string;
  titleEm: string;
  variant: "cream" | "dark";
  /** Derived at render time from actual item count; Contentful can override if set. */
  countLabel?: string;
}

export interface ComboPriceTier {
  label: string;
  price: string;
  dishes: number;
}

function isVisible(item: MenuItem): boolean {
  return item.visible !== false;
}

/** Loaded from content/menu.json - edit that file to change the menu. */
export const CATEGORIES: CategoryMeta[] = menuData.categories as CategoryMeta[];

const rawStarters = menuData.items.starters as MenuItem[];
const rawMains = menuData.items.mains as MenuItem[];
const rawVegVegan = (menuData.items["veg-vegan"] ?? []) as MenuItem[];
const rawDesserts = menuData.items.desserts as MenuItem[];
const rawDrinks = menuData.items.drinks as MenuItem[];

export const STARTERS_ITEMS: MenuItem[] = rawStarters.filter(isVisible);
export const MAINS_ITEMS: MenuItem[] = rawMains.filter(isVisible);
export const VEG_VEGAN_ITEMS: MenuItem[] = rawVegVegan.filter(isVisible);
export const DESSERTS_ITEMS: MenuItem[] = rawDesserts.filter(isVisible);
export const DRINKS_ITEMS: MenuItem[] = rawDrinks.filter(isVisible);

export const COMBO_PRICING: ComboPriceTier[] =
  (menuData as { comboPricing?: ComboPriceTier[] }).comboPricing ?? [];

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
