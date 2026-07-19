import styles from "./PdfCtaSection.module.css";


export function PdfCtaSection() {
  return (
    <section className={styles.pdfCta}>
      <div className={`wrap ${styles.pdfCtaInner}`}>
        <p className={styles.pdfCtaEyebrow}>Take It With You</p>
        <h2 className={styles.pdfCtaH2}>Download the Full Menu</h2>
        <p className={styles.pdfCtaDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
          eiusmod tempor incididunt ut labore.
        </p>
        <a
          href="#"
          className={styles.btnPdf}
          aria-label="Download menu PDF (placeholder link)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
          </svg>
          Download Menu (PDF)
        </a>
      </div>
    </section>
  );
}
