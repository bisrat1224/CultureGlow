import styles from "./ScrollingBanner.module.css";

const BANNER_ITEMS = [
  "CULTUREGLOW24",
  "LOREM IPSUM DOLOR",
  "SIT AMET CONSECTETUR",
  "ADIPISCING ELIT",
];

export function ScrollingBanner() {
  const items = [...BANNER_ITEMS, ...BANNER_ITEMS];

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
