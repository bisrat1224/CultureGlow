import MainsCard from "./MainsCard";
import styles from "./MainsCard.module.css";

interface MainsGridProps {
  items: any[];
}

export default function MainsGrid({ items }: MainsGridProps) {
  return (
    <div className={styles.mainsGrid}>
      {items.map((item, i) => (
        <MainsCard
          key={item.id}
          item={{
            id: item.id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            price: item.price,
            image: item.image,
            alt: item.alt,
            ribbon: item.ribbon || undefined,
          }}
          revealDelayClass={`reveal-delay-${Math.min(i + 1, 4)}`}
        />
      ))}
    </div>
  );
}
