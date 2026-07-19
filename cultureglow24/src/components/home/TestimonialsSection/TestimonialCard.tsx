import styles from "./TestimonialsSection.module.css";

export interface Testimonial {
  id: string;
  quote: string;
  initial: string;
  name: string;
  location: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  revealDelayClass?: string;
}

export function TestimonialCard({ testimonial, revealDelayClass }: TestimonialCardProps) {
  const { quote, initial, name, location } = testimonial;

  return (
    <article className={`${styles.tcard} reveal ${revealDelayClass ?? ""}`}>
      <div className={styles.tcardStars} aria-hidden="true">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <p className={styles.tcardQuote}>&quot;{quote}&quot;</p>
      <div className={styles.tcardAuthor}>
        <div className={styles.tcardAvatar} aria-hidden="true">
          {initial}
        </div>
        <div>
          <p className={styles.tcardName}>{name}</p>
          <p className={styles.tcardLoc}>{location}</p>
        </div>
      </div>
    </article>
  );
}