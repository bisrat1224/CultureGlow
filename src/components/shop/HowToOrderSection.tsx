import styles from "./HowToOrderSection.module.css";

interface HowToOrderProps {
  label: string;
  title: string;
  desc: string;
  steps: { number: number; title: string; desc: string }[];
}

function EtsyLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.etsyLogoSvg}>
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#F56400" />
      <path d="M8.5 7.5h7v1.5h-5v2.5h4v1.5h-4v3h5v1.5h-7v-10z" fill="#FFFFFF" />
    </svg>
  );
}

export function HowToOrderSection({ label, title, desc, steps }: HowToOrderProps) {

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

      <div className={styles.etsyOption}>
        <p>Prefer to shop directly? Browse our full catalogue on Etsy.</p>
        <EtsyLogo />
        <a href="https://www.etsy.com/shop/cultureglow24" target="_blank" rel="noopener noreferrer" className={styles.etsyLink}>Visit our Etsy Shop</a>
      </div>
    </section>
  );
}