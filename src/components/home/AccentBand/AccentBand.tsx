import { Fragment } from "react";
import { homeContent } from "@/lib/content/content.home";
import styles from "./AccentBand.module.css";

export function AccentBand() {
  const items = [...homeContent.accentBand.items, ...homeContent.accentBand.items];

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