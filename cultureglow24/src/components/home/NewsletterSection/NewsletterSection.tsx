"use client";

import { homeContent } from "@/lib/content/content.home";
import styles from "./NewsletterSection.module.css";
import shared from "../shared.module.css";

export function NewsletterSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, body, inputPlaceholder, submitCta, note } =
    homeContent.newsletter;

  return (
    <section
      className={styles.newsletterSection}
      id="newsletter"
      aria-labelledby="newsletter-h2"
    >
      <div className={`${styles.newsletterInner} wrap reveal`}>
        <div className={styles.newsletterText}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.newsletterH2} id="newsletter-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={styles.newsletterDesc}>{body}</p>
        </div>

        <form
          className={styles.newsletterForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder={inputPlaceholder}
            required
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterBtn}>
            {submitCta}
          </button>
        </form>

        <p className={styles.newsletterNote}>{note}</p>
      </div>
    </section>
  );
}