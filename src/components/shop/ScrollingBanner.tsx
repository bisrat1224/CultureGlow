import { shopContent } from "@/lib/content/content.shop";
import styles from "./ScrollingBanner.module.css";

export function ScrollingBanner() {
  const items = [...shopContent.scrollingBanner.items, ...shopContent.scrollingBanner.items];

  return (
    <div className={styles.scrollingBanner} aria-hidden="true">
      <div className={styles.bannerContent}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.bannerText}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}