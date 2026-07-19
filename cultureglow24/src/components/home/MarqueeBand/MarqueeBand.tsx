import styles from "./MarqueeBand.module.css";

const MARQUEE_ITEMS = [
  "CultureGlow24",
  "Authentic Habesha Cuisine",
  "Traditional Clothing",
  "Cultural Events",
  "Catering Services",
];

export function MarqueeBand() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={styles.marqueeBand} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.marqueeItem}>
            {item} <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}