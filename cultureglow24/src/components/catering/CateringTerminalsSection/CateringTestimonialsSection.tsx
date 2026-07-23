import CateringTestimonialCard from "./CateringTestimonialCard";
import styles from "./CateringTestimonialsSection.module.css";
import shared from "../shared.module.css";

interface CateringTestimonialsSectionProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
  };
  testimonials: any[];
}

export default function CateringTestimonialsSection({ heading, testimonials }: CateringTestimonialsSectionProps) {
  return (
    <section className={shared.sectionOnDark} id="testimonials" aria-labelledby="cat-testimonials-h2">
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="cat-testimonials-h2"
          >
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <CateringTestimonialCard
              key={t.id}
              testimonial={{
                id: t.id,
                quote: t.quote,
                initial: t.initial,
                name: t.name,
                location: t.location,
              }}
              revealDelayClass={`reveal-delay-${Math.min(i + 1, 3)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
