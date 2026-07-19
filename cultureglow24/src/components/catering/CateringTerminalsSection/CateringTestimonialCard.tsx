import styles from "./CateringTestimonialCard.module.css";

export interface CateringTestimonial {
  id: string;
  quote: string;
  initial: string;
  name: string;
  location: string;
}

interface CateringTestimonialCardProps {
  testimonial: CateringTestimonial;
}


export function CateringTestimonialCard({
  testimonial,
}: CateringTestimonialCardProps) {
  const { quote, initial, name, location } = testimonial;

  return (
    <article className={`${styles.tcard} reveal`}>
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
