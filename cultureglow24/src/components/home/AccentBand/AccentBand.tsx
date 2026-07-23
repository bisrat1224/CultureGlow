import { Fragment } from "react";
import styles from "./AccentBand.module.css";

interface AccentBandProps {
  items?: { text: string }[];
}

export default function AccentBand({ items }: AccentBandProps) {
  const defaultItems = [
    "CULTUREGLOW24",
    "AUTHENTIC HABESHA",
    "TRADITIONAL FLAVORS",
    "MADE WITH LOVE",
  ];

  const texts = items?.map((i) => i.text) || defaultItems;
  const doubled = [...texts, ...texts];

  return (
    <div className={styles.accentBand} aria-hidden="true">
      <div className={styles.accentBandInner}>
        {doubled.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span className={styles.accentBandText}>{item}</span>
            <span className={styles.accentBandSep}>✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
