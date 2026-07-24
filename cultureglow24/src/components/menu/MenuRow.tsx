import Image from "next/image";
import styles from "./MenuRow.module.css";

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image?: { url?: string } | null;
  alt: string;
  diet_flags?: string[];
  tag?: string | null;
}

export default function MenuRow({
  item,
  revealDelayClass,
}: {
  item: MenuItem;
  revealDelayClass?: string;
}) {
  return (
    <div className={`${styles.row} reveal ${revealDelayClass ?? ""}`.trim()}>
      <div className={styles.imageWrapper}>
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.alt}
            width={80}
            height={80}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.name}>{item.name}</h3>
          <span className={styles.price}>{item.price}</span>
        </div>
        <p className={styles.description}>{item.description}</p>
        {item.diet_flags && item.diet_flags.length > 0 && (
          <div className={styles.dietFlags}>
            {item.diet_flags.map((flag) => (
              <span key={flag} className={styles.flag}>{flag}</span>
            ))}
          </div>
        )}
        {item.tag && <span className={styles.tag}>{item.tag}</span>}
      </div>
    </div>
  );
}