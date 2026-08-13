import type { ComboPriceTier } from "@/lib/data/menu";
import styles from "./PricingStrip.module.css";

interface PricingStripProps {
  tiers: ComboPriceTier[];
  /** Match the parent CategoryBlock variant for contrast. */
  variant?: "cream" | "dark";
}

export function PricingStrip({ tiers, variant = "dark" }: PricingStripProps) {
  if (!tiers.length) return null;

  return (
    <div
      className={`${styles.strip} ${
        variant === "dark" ? styles.onDark : styles.onCream
      }`}
      role="group"
      aria-label="Combo pricing"
    >
      {tiers.map((tier) => (
        <div key={tier.dishes} className={styles.tier}>
          <span className={styles.tierLabel}>{tier.label}</span>
          <span className={styles.tierPrice}>{tier.price}</span>
        </div>
      ))}
    </div>
  );
}