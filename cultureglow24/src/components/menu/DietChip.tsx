import type { DietFlag } from "@/lib/data/menu";
import styles from "./DietChip.module.css";

interface DietChipProps {
  flag: DietFlag;
  chipLabel: string;
  title: string;
}

const FLAG_CLASS: Record<DietFlag, string> = {
  veg: styles.dietVeg,
  vegan: styles.dietVegan,
  gf: styles.dietGf,
  spicy: styles.dietSpicy,
};

export function DietChip({ flag, chipLabel, title }: DietChipProps) {
  return (
    <span className={`${styles.dietChip} ${FLAG_CLASS[flag]}`} title={title}>
      {chipLabel}
    </span>
  );
}
