import { MessageCircle, Phone, Mail } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_EMAIL, buildWhatsAppLink } from "@/lib/constants";
import styles from "./ContactSection.module.css";
import shared from "../shared.module.css";

// Per explicit direction: Contact is a hub of ways to reach the business,
// not a form to fill out. Supersedes the earlier /api/contact-backed
// ContactForm approach (Chunk 9 / Open Decision D1) for this page
// specifically — Catering's enquiry form (CateringEnquirySection.tsx,
// still posting to /api/catering) is unaffected and unchanged.
//
// Only four contact methods are shown, per instruction: WhatsApp, a UK
// phone number, email, and social links. No map, no form, nothing else.
//
// UK_PHONE uses Ofcom's officially reserved fictitious-number block for
// London (020 7946 0000-0999) — these numbers are permanently set aside
// by the regulator and guaranteed to never be allocated to a real
// subscriber, unlike an arbitrary-looking placeholder such as
// "020 7123 4567" which could coincidentally be, or become, a real
// number. Swap for the client's real number once supplied via the PM.
// Email now reads from the centralized CONTACT_EMAIL constant
// (lib/constants.ts) instead of a local duplicate literal.
const UK_PHONE_DISPLAY = "+44 20 7946 0321";
const UK_PHONE_TEL = "+442079460321";

export function ContactSection() {
  return (
    <section
      className={shared.sectionOnCream}
      id="contact-hub"
      aria-labelledby="contact-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>Get in Touch</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="contact-h2"
          >
            Ways to <em>Reach Us</em>
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>
            No forms to fill out — pick whichever way suits you best.
          </p>
        </div>

        <div className={styles.methodsGrid}>
          <a
            href={buildWhatsAppLink()}
            className={styles.methodCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.methodIcon} aria-hidden="true">
              <MessageCircle size={22} strokeWidth={1.75} />
            </span>
            <span className={styles.methodLabel}>WhatsApp</span>
            <span className={styles.methodValue}>Chat with us instantly</span>
          </a>

          <a href={`tel:${UK_PHONE_TEL}`} className={styles.methodCard}>
            <span className={styles.methodIcon} aria-hidden="true">
              <Phone size={22} strokeWidth={1.75} />
            </span>
            <span className={styles.methodLabel}>Phone</span>
            <span className={styles.methodValue}>{UK_PHONE_DISPLAY}</span>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={styles.methodCard}
          >
            <span className={styles.methodIcon} aria-hidden="true">
              <Mail size={22} strokeWidth={1.75} />
            </span>
            <span className={styles.methodLabel}>Email</span>
            <span className={styles.methodValue}>{CONTACT_EMAIL}</span>
          </a>

          <div className={styles.methodCard}>
            <span className={styles.methodLabel}>Follow Us</span>
            <ul className={styles.socialList}>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}