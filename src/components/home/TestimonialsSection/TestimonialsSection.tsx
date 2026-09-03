"use client";

import { useState, useEffect } from "react";
import { homeContent } from "@/lib/content/content.home";
import { GOOGLE_REVIEW_URL } from "@/lib/constants";
import styles from "./TestimonialsSection.module.css";
import shared from "../shared.module.css";

function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.reviewBtnIcon}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.reviewBtnExternal}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

export function TestimonialsSection() {
  const {
    eyebrow,
    headingBeforeEm,
    headingEm,
    headingAfterEm,
    items,
    reviewCta,
  } = homeContent.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section
      className={styles.testimonialsSection}
      id="testimonials"
      aria-labelledby="testimonials-h2"
    >
      <div className="wrap">
        <div className={`${styles.testimonialsHeader} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.testimonialsH2} id="testimonials-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
        </div>

        <div className={`${styles.sliderContainer} reveal reveal-delay-1`}>
          <div className={styles.slidesWrapper}>
            {items.map((item, index) => (
              <div
                key={index}
                className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : styles.inactiveSlide}`}
                aria-hidden={index !== activeIndex}
              >
                <div className={styles.quoteWrapper}>
                  <span className={styles.quoteMark} aria-hidden="true">
                    “
                  </span>
                  <p className={styles.quoteText}>{item.quote}</p>
                </div>

                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{item.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.dots}>
            {items.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <aside
          className={`${styles.reviewBanner} reveal reveal-delay-2`}
          aria-label={reviewCta.heading}
        >
          <div className={styles.reviewBannerText}>
            <h3 className={styles.reviewBannerHeading}>{reviewCta.heading}</h3>
            <p className={styles.reviewBannerBody}>{reviewCta.body}</p>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.reviewBtn} cg-press`}
          >
            <PencilIcon />
            {reviewCta.button}
            <ExternalLinkIcon />
          </a>
        </aside>
      </div>
    </section>
  );
}
