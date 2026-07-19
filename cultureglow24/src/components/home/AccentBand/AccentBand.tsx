import { Fragment } from "react";
import styles from "./AccentBand.module.css";

const ACCENT_ITEMS = [
  "CULTUREGLOW24",
  "AUTHENTIC HABESHA EXPERIENCE",
  "FOOD · FASHION · CULTURE",
];

export function AccentBand() {
  const items = [...ACCENT_ITEMS, ...ACCENT_ITEMS];

  return (
    <div className={styles.accentBand} aria-hidden="true">
      <div className={styles.accentBandInner}>
        {items.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span className={styles.accentBandText}>{item}</span>
            <span className={styles.accentBandSep}>✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}