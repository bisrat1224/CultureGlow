import styles from "./HowToOrderSection.module.css";

interface HowToOrderProps {
  label: string;
  title: string;
  desc: string;
  steps: { number: number; title: string; desc: string }[];
}

export function HowToOrderSection({ label, title, desc, steps }: HowToOrderProps) {

  return (
    <section className={styles.howToOrder}>
      <p className={styles.sectionLabel}>{label}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.howToOrderDesc}>{desc}</p>
      
      <div className={styles.etsyOption}>
        <p>Prefer to shop directly? Browse our full catalogue on Etsy.</p>
        <a href="https://www.etsy.com/shop/Etsycultureglow24" target="_blank" rel="noopener noreferrer" className={styles.etsyLink}>Visit our Etsy Shop</a>
      </div>

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