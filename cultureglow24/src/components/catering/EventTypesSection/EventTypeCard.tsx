import styles from "./EventTypeCard.module.css";

export interface EventType {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

interface EventTypeCardProps {
  eventType: EventType;
}

export function EventTypeCard({ eventType }: EventTypeCardProps) {
  const { tag, title, desc, image, alt } = eventType;

  return (
    <article className={`${styles.eventCard} reveal`}>
      <img src={image} alt={alt} className={styles.eventCardImg} />
      <div className={styles.eventCardOverlay}>
        <span className={styles.eventCardTag}>{tag}</span>
        <h3 className={styles.eventCardTitle}>{title}</h3>
        <p className={styles.eventCardDesc}>{desc}</p>
      </div>
    </article>
  );
}
