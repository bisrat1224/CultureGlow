"use client";

import styles from "./NewsletterSection.module.css";
import shared from "../shared.module.css";


export function NewsletterSection() {
  return (
    <section
      className={styles.newsletterSection}
      id="newsletter"
      aria-labelledby="newsletter-h2"
    >
      <div className={`${styles.newsletterInner} wrap reveal`}>
        <div className={styles.newsletterText}>
          <p className={shared.sectionEyebrow}>Stay in Touch</p>
          <h2 className={styles.newsletterH2} id="newsletter-h2">
            Join the <em>Table</em>
          </h2>
          <p className={styles.newsletterDesc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. New
            dishes, catering offers, and cultural events — straight to your
            inbox.
          </p>
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
            placeholder="Your email address"
            required
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterBtn}>
            Subscribe
          </button>
        </form>

        <p className={styles.newsletterNote}>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}