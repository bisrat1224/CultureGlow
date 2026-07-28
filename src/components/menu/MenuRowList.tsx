import type { MenuItem } from "@/lib/data/menu";
import { MenuRow } from "./MenuRow";
import styles from "./MenuRow.module.css";

interface MenuRowListProps {
  items: MenuItem[];
}

export function MenuRowList({ items }: MenuRowListProps) {
  return (
    <div className={styles.menuList}>
      {items.map((item) => (
        <MenuRow key={item.id} item={item} />
      ))}
    </div>
  );
}
