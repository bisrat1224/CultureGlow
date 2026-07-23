import styles from "./TestimonialsSection.module.css";

interface Testimonial {
  id: string;
  quote: string;
  initial: string;
  name: string;
  location: string;
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className={styles.card}>
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