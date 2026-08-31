"use client";

import { useState, useEffect } from "react";
import { homeContent } from "@/lib/content/content.home";
import styles from "./TestimonialsSection.module.css";
import shared from "../shared.module.css";

export function TestimonialsSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, items } = homeContent.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play the slider every 5 seconds
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
                  <span className={styles.quoteMark} aria-hidden="true">“</span>
                  <p className={styles.quoteText}>{item.quote}</p>
                </div>
                
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{item.name}</p>
                  <a 
                    href={(item as any).link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.authorSource}
                  >
                    Read on {item.source}
                  </a>
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
      </div>
    </section>
  );
}