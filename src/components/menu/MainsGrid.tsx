import { MAINS_ITEMS } from "@/lib/data/menu";
import { MainsCard } from "./MainsCard";
import styles from "./MainsCard.module.css";

// Thin wrapper so page.tsx doesn't need to know about the grid class name
// - mirrors how ShopFilterBar owns its own .productsGrid internally.
export function MainsGrid() {
  return (
    <div className={styles.mainsGrid}>
      {MAINS_ITEMS.map((item) => (
        <MainsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
