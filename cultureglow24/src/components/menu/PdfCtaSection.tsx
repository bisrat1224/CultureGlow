import { menuContent } from "@/lib/content/content.menu";
import styles from "./PdfCtaSection.module.css";

export function PdfCtaSection() {
  const { eyebrow, title, desc, cta } = menuContent.pdfCta;

  return (
    <section className={styles.pdfCta}>
      <div className={`wrap ${styles.pdfCtaInner}`}>
        <p className={styles.pdfCtaEyebrow}>{eyebrow}</p>
        <h2 className={styles.pdfCtaH2}>{title}</h2>
        <p className={styles.pdfCtaDesc}>{desc}</p>
        <a
          href="#"
          className={styles.btnPdf}
          aria-label="Download menu PDF (placeholder link)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
          </svg>
          {cta}
        </a>
      </div>
    </section>
  );
}