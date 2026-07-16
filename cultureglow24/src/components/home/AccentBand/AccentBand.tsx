import { Fragment } from "react";
import styles from "./AccentBand.module.css";

// Matches index.html's <div class="accent-band" aria-hidden="true"> exactly —
// a second, red-colored marquee (distinct from the charcoal MarqueeBand in
// Chunk 4). Same duplicate-the-list technique as MarqueeBand so the
// translateX(-50%) loop has no visible seam.
//
// Text and separator spans must stay as flat, direct siblings inside
// .accentBandInner (not wrapped in an extra element) because that container
// uses a flex `gap` to space every child evenly — wrapping each
// text+separator pair would apply the gap only between wrappers, not
// between the separator and its neighboring text, breaking the even
// spacing index.html actually renders.
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