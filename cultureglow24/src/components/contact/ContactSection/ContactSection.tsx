"use client";

import { useState, type FormEvent } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { MapEmbed } from "../MapEmbed/MapEmbed";
import styles from "./ContactSection.module.css";
import shared from "../shared.module.css";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// Fields (Name, Email, Message), copy, and the two-column layout (form on
// the left, business info + map on the right) are ported one-for-one from
// the Kimi Agent reference build's ContactPage.tsx. Two deliberate
// deviations from that reference, both matching decisions this project
// already made elsewhere:
//
//   1. The reference hands off to WhatsApp with a pre-filled message
//      (`buildWhatsAppLink(text)` + `window.open`) instead of calling a
//      backend. This project already resolved Open Decision D1 the other
//      way for Catering — `CateringEnquirySection.tsx` posts JSON to
//      `/api/catering` — so Contact follows that same precedent and posts
//      to the already-built `/api/contact` route (Chunk 9) instead, for
//      one consistent form-submission strategy sitewide rather than
//      mixing a WhatsApp hand-off with an API-backed one.
//   2. The reference's WhatsApp glyph is an inline `<WhatsAppIcon />` SVG
//      component; this project already renders that glyph as a static
//      asset (`/assets/images/img_whatsappicon.svg`) everywhere else, so
//      the submit button doesn't carry one at all — it mirrors
//      CateringEnquirySection's plain "Send Enquiry" button instead of
//      the reference's "Send via WhatsApp" + icon.
//
// The business-info values below (email, hours, delivery area) match
// Footer.tsx's existing copy exactly rather than the reference's own
// lorem-ipsum BUSINESS constant, since Footer is this project's existing
// single source for that content. Phone is still a placeholder — derived
// from the same WHATSAPP_NUMBER placeholder used everywhere else — since
// a real business phone number is still Pending on the Content Checklist.
export function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={shared.sectionOnCream}
      id="contact-form"
      aria-labelledby="contact-h2"
    >
      <div className="wrap">
        <div className={styles.contactGrid}>
          <form
            className={`${styles.contactForm} reveal`}
            aria-label="Contact form"
            onSubmit={handleSubmit}
          >
            <p className={shared.sectionEyebrow}>Send a Message</p>
            <h2
              className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
              id="contact-h2"
              style={{ marginBottom: 24 }}
            >
              Send Us a <em>Message</em>
            </h2>

            <div className={styles.formRow}>
              <label className={styles.formLabel} htmlFor="contact-name">
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                className={styles.formInput}
                placeholder="Lorem Ipsum"
                required
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel} htmlFor="contact-email">
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                className={styles.formInput}
                placeholder="lorem@ipsum.com"
                required
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={`${styles.formInput} ${styles.formTextarea}`}
                rows={5}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                required
              />
            </div>

            <button
              type="submit"
              className={shared.btnPrimary}
              style={{ display: "inline-flex" }}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <p className={styles.formStatusSuccess} role="status">
                Thanks — your message has been sent. We&rsquo;ll be in touch
                soon.
              </p>
            )}
            {status === "error" && (
              <p className={styles.formStatusError} role="alert">
                Something went wrong sending your message. Please try
                again, or reach us directly via WhatsApp.
              </p>
            )}
          </form>

          <div className={`${styles.contactAside} reveal reveal-delay-2`}>
            <div className={styles.contactInfoBlock}>
              <div className={styles.contactInfoList}>
                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoLabel}>Email</span>
                  <a
                    href="mailto:hello@cultureglow24.com"
                    className={styles.contactInfoValue}
                  >
                    hello@cultureglow24.com
                  </a>
                </div>
                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoLabel}>Phone</span>
                  <a
                    href="tel:+251900000000"
                    className={styles.contactInfoValue}
                  >
                    +251 900 000 000
                  </a>
                </div>
                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoLabel}>Hours</span>
                  <span className={styles.contactInfoValue}>
                    Mon–Sat, 9am–7pm
                  </span>
                </div>
                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoLabel}>
                    Delivery Area
                  </span>
                  <span className={styles.contactInfoValue}>
                    Delivering across Addis Ababa
                  </span>
                </div>
                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoLabel}>Social</span>
                  <ul className={styles.contactSocialList}>
                    {SOCIAL_LINKS.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.contactInfoValue}
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
