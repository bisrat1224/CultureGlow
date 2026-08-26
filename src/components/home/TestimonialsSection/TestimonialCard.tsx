import styles from "./TestimonialsSection.module.css";

export interface Testimonial {
  id: string;
  quote: string;
  rating: number; 
  name: string;
  source: string; // e.g. "Google"
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  revealDelayClass?: string;
}

export function TestimonialCard({ testimonial, revealDelayClass }: TestimonialCardProps) {
  const { quote, rating, name, source } = testimonial;
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <article className={`${styles.tcard} reveal ${revealDelayClass ?? ""}`}>
      <span className={styles.tcardQuoteIcon} aria-hidden="true">“</span>
      <div className={styles.tcardStars} aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < rating ? styles.tcardStarFilled : styles.tcardStarEmpty}>
            ★
          </span>
        ))}
      </div>
      <p className={styles.tcardQuote}>&quot;{quote}&quot;</p>
      <div className={styles.tcardAuthor}>
        <div className={styles.tcardAvatar} aria-hidden="true">
          {initial}
        </div>
        <div>
          <p className={styles.tcardName}>{name}</p>
          <p className={styles.tcardLoc}>Verified {source} Review</p>
        </div>
      </div>
    </article>
  );
}