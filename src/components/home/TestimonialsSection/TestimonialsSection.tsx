import { TestimonialCard } from "./TestimonialCard";
import { homeContent } from "@/lib/content/content.home";
import styles from "./TestimonialsSection.module.css";
import shared from "../shared.module.css";

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4", "reveal-delay-5"];

export function TestimonialsSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, items } = homeContent.testimonials;

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

        <div className={styles.testimonialsGrid}>
          {items.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              revealDelayClass={REVEAL_DELAYS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}