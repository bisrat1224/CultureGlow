import styles from "./MarqueeBand.module.css";

interface MarqueeBandProps {
  items?: { text: string }[];
}

export default function MarqueeBand({ items }: MarqueeBandProps) {
  const defaultItems = [
    "CultureGlow24",
    "Authentic Habesha Cuisine",
    "Traditional Clothing",
    "Cultural Events",
    "Catering Services",
  ];

  const texts = items?.map((i) => i.text) || defaultItems;
  const doubled = [...texts, ...texts];

  return (
    <div className={styles.marqueeBand} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.marqueeItem}>
            {item} <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
