import Image from "next/image";
import styles from "./MainsCard.module.css";

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image?: { url?: string } | null;
  alt: string;
  ribbon?: string | null;
}

export default function MainsCard({
  item,
  revealDelayClass,
}: {
  item: MenuItem;
  revealDelayClass?: string;
}) {
  return (
    <div className={`${styles.card} reveal ${revealDelayClass ?? ""}`.trim()}>
      <div className={styles.imageWrapper}>
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.alt}
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
        {item.ribbon && <span className={styles.ribbon}>{item.ribbon}</span>}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        <span className={styles.price}>{item.price}</span>
      </div>
    </div>
  );
}