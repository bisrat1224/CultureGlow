import { homeContent } from "@/lib/content/content.home";
import styles from "./MarqueeBand.module.css";

export function MarqueeBand() {
  const items = [...homeContent.marquee.items, ...homeContent.marquee.items];

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