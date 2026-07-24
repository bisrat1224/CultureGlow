import MenuRow from "./MenuRow";
import styles from "./MenuRow.module.css";

interface MenuRowListProps {
  items: any[];
}

export default function MenuRowList({ items }: MenuRowListProps) {
  return (
    <div className={styles.menuRowList}>
      {items.map((item, i) => (
        <MenuRow
          key={item.id}
          item={{
            id: item.id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            price: item.price,
            image: item.image,
            alt: item.alt,
            diet_flags: item.diet_flags || [],
            tag: item.tag || undefined,
          }}
          revealDelayClass={`reveal-delay-${Math.min(i + 1, 4)}`}
        />
      ))}
    </div>
  );
}
