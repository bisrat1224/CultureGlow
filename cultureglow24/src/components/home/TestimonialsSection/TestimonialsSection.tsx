import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialsSection.module.css";
import shared from "../shared.module.css";

interface TestimonialsSectionProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
  };
  testimonials: any[];
}

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export default function TestimonialsSection({ heading, testimonials }: TestimonialsSectionProps) {
  return (
    <section
      className={styles.testimonialsSection}
      id="testimonials"
      aria-labelledby="testimonials-h2"
    >
      <div className="wrap">
        <div className={`${styles.testimonialsHeader} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2 className={styles.testimonialsH2} id="testimonials-h2">
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={{
                id: t.id,
                quote: t.quote,
                initial: t.initial,
                name: t.name,
                location: t.location,
              }}
              revealDelayClass={REVEAL_DELAYS[i % REVEAL_DELAYS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
