import styles from "./HowToOrderSection.module.css";

interface HowToOrderSectionProps {
  section: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
    steps: { number: number; title: string; desc: string }[];
  };
}

export default function HowToOrderSection({ section }: HowToOrderSectionProps) {
  return (
    <section className={styles.howToOrder} id="how-to-order" aria-labelledby="how-to-order-h2">
      <div className="wrap">
        <div className={`${styles.howToOrderHeader} reveal`}>
          <p className={styles.sectionEyebrow}>{section.eyebrow}</p>
          <h2 className={styles.sectionH2} id="how-to-order-h2">
            {section.heading_before_em}
            <em>{section.heading_em}</em>
            {section.heading_after_em}
          </h2>
          <p className={styles.howToOrderDesc}>{section.desc}</p>
        </div>

        <div className={styles.stepsGrid}>
          {section.steps.map((step, i) => (
            <div
              key={step.number}
              className={`${styles.stepCard} reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
