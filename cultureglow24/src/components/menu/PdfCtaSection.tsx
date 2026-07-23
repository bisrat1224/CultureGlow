import styles from "./PdfCtaSection.module.css";

interface PdfCtaSectionProps {
  cta: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
    button_text: string;
  };
}

export default function PdfCtaSection({ cta }: PdfCtaSectionProps) {
  return (
    <section className={styles.pdfCta} aria-label="PDF download">
      <div className="wrap">
        <div className={`${styles.pdfCtaInner} reveal`}>
          <p className={styles.pdfCtaEyebrow}>{cta.eyebrow}</p>
          <h2 className={styles.pdfCtaH2}>
            {cta.heading_before_em}
            <em>{cta.heading_em}</em>
            {cta.heading_after_em}
          </h2>
          <p className={styles.pdfCtaDesc}>{cta.desc}</p>
          <button className={styles.pdfCtaBtn} disabled>
            {cta.button_text}
          </button>
          <p className={styles.pdfCtaNote}>Coming soon</p>
        </div>
      </div>
    </section>
  );
}
