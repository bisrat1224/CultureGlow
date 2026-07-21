import { menuContent } from "@/lib/content/content.menu";
import styles from "./HowToOrderSection.module.css";

export function HowToOrderSection() {
  const { label, title, desc, steps } = menuContent.howToOrder;

  return (
    <section className={styles.howToOrder}>
      <p className={styles.sectionLabel}>{label}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.howToOrderDesc}>{desc}</p>
      <div className={styles.stepsRow}>
        {steps.map((step) => (
          <div key={step.number} className={styles.stepItem}>
            <div className={styles.stepNumber}>{step.number}</div>
            <p className={styles.stepTitle}>{step.title}</p>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}