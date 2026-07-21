"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import styles from "./CateringEnquirySection.module.css";
import shared from "../shared.module.css";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EVENT_TYPE_OPTIONS = [
  "Wedding",
  "Corporate",
  "Birthday",
  "Cultural / Religious Ceremony",
  "Other",
];


export function CateringEnquirySection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/catering", {
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
      id="enquiry"
      aria-labelledby="enquiry-h2"
    >
      <div className="wrap">
        <div className={styles.enquiryInner}>
          <div>
            <p className={shared.sectionEyebrow}>Plan Your Event</p>
            <h2
              className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
              id="enquiry-h2"
            >
              Send a Catering <em>Enquiry</em>
            </h2>
            <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>

            <div className={styles.enquiryInfoList}>
              <div className={styles.enquiryInfoItem}>
                <span className={styles.enquiryInfoLabel}>Email</span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={styles.enquiryInfoValue}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className={styles.enquiryInfoItem}>
                <span className={styles.enquiryInfoLabel}>Phone</span>
                <a href="tel:+251900000000" className={styles.enquiryInfoValue}>
                  +251 900 000 000
                </a>
              </div>
              <div className={styles.enquiryInfoItem}>
                <span className={styles.enquiryInfoLabel}>
                  Response Time
                </span>
                <span className={styles.enquiryInfoValue}>
                  Lorem ipsum, within 24 hours
                </span>
              </div>
            </div>
          </div>

          <form
            className={styles.enquiryForm}
            aria-label="Catering enquiry form"
            onSubmit={handleSubmit}
          >
            <div className={styles.formRowPair}>
              <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="cat-name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="cat-name"
                  name="name"
                  className={styles.formInput}
                  placeholder="Lorem Ipsum"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="cat-phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="cat-phone"
                  name="phone"
                  className={styles.formInput}
                  placeholder="+251 9XX XXX XXX"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel} htmlFor="cat-email">
                Email
              </label>
              <input
                type="email"
                id="cat-email"
                name="email"
                className={styles.formInput}
                placeholder="lorem@ipsum.com"
                required
              />
            </div>

            <div className={styles.formRowPair}>
              <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="cat-event-type">
                  Event Type
                </label>
                <select
                  id="cat-event-type"
                  name="eventType"
                  className={styles.formSelect}
                >
                  {EVENT_TYPE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="cat-guests">
                  Guest Count
                </label>
                <input
                  type="number"
                  id="cat-guests"
                  name="guests"
                  className={styles.formInput}
                  placeholder="e.g. 50"
                  min={1}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel} htmlFor="cat-date">
                Event Date
              </label>
              <input
                type="date"
                id="cat-date"
                name="eventDate"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel} htmlFor="cat-message">
                Message
              </label>
              <textarea
                id="cat-message"
                name="message"
                className={`${styles.formInput} ${styles.formTextarea}`}
                rows={4}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />
            </div>

            <button
              type="submit"
              className={`${shared.btnPrimary} ${styles.formSubmitBtn}`}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send Enquiry"}
            </button>

            {status === "success" && (
              <p
                className={`${styles.formStatus} ${styles.formStatusSuccess}`}
                role="status"
              >
                Thanks — your enquiry has been sent. We&rsquo;ll be in touch
                soon.
              </p>
            )}
            {status === "error" && (
              <p
                className={`${styles.formStatus} ${styles.formStatusError}`}
                role="alert"
              >
                Something went wrong sending your enquiry. Please try again,
                or reach us directly via WhatsApp or phone.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}