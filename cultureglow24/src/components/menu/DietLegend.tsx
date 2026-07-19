import { DIET_LEGEND } from "@/lib/data/menu";
import { DietChip } from "./DietChip";
import styles from "./DietLegend.module.css";

export function DietLegend() {
  return (
    <div className={styles.dietLegend} aria-label="Dietary icon legend">
      {DIET_LEGEND.map((entry) => (
        <div key={entry.flag} className={styles.dietLegendItem}>
          <DietChip flag={entry.flag} chipLabel={entry.chipLabel} title={entry.label} />
          {entry.label}
        </div>
      ))}
    </div>
  );
}
