import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import { cateringContent } from "@/lib/content/content.catering";
import styles from "./CateringContactCTA.module.css";
import shared from "../shared.module.css";

/**
 * Replaces the old CateringEnquirySection form (P0-2 / CR-002 - client no
 * longer wants a catering enquiry form on the public site). Points people
 * to the Contact page and, since every other catering CTA on this page
 * already links to WhatsApp, offers that as a direct second option too.
 * No client-side state needed here (no form to submit), so this stays a
 * plain Server Component - matches the "use client only when needed"
 * convention in Developer Brief Section 7.
 */
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
            <a
              href={buildWhatsAppLink("I would like to enquire about catering")}
              className={shared.btnGhostLight}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}