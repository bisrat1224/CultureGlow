import styles from "./HowToOrderSection.module.css";

interface Step {
  number: number;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Browse & Pick",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
  },
  {
    number: 2,
    title: "WhatsApp Us",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
  },
  {
    number: 3,
    title: "Confirm & Pay",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
  },
  {
    number: 4,
    title: "Fast Delivery",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
  },
];

export function HowToOrderSection() {
  return (
    <section className={styles.howToOrder}>
      <p className={styles.sectionLabel}>Simple Process</p>
      <h2 className={styles.sectionTitle}>Lorem ipsum dolor sit amet</h2>
      <p className={styles.howToOrderDesc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
        eiusmod tempor.
      </p>
      <div className={styles.stepsRow}>
        {STEPS.map((step) => (
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
