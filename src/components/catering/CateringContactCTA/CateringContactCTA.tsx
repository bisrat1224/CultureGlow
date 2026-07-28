import Link from "next/link";
import { cateringContent } from "@/lib/content/content.catering";
import styles from "./CateringContactCTA.module.css";
import shared from "../shared.module.css";

export function CateringContactCTA() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } =
    cateringContent.contactCta;

  return (
    <section
      className={shared.sectionOnCream}
      id="contact-cta"
      aria-labelledby="contact-cta-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="contact-cta-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>{desc}</p>

          <div className={styles.ctaActions}>
            <Link href="/contact" className={shared.btnPrimary}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
