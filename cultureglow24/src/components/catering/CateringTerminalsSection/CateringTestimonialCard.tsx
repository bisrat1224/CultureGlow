import styles from "./CateringTestimonialCard.module.css";

interface Testimonial {
  id: string;
  quote: string;
  initial: string;
  name: string;
  location: string;
}

export default function CateringTestimonialCard({
  testimonial,
  revealDelayClass,
}: {
  testimonial: Testimonial;
  revealDelayClass?: string;
}) {
  return (
    <div className={`${styles.card} reveal ${revealDelayClass ?? ""}`.trim()}>
      <div className={styles.avatar}>
        <span>{testimonial.initial}</span>
      </div>
      <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
      <div className={styles.author}>
        <span className={styles.name}>{testimonial.name}</span>
        <span className={styles.location}>{testimonial.location}</span>
      </div>
    </div>
  );
}
