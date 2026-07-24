import Image from "next/image";
import styles from "./EventTypeCard.module.css";

interface EventType {
  id: string;
  title: string;
  tag: string;
  description: string;
  image?: { url?: string } | null;
  alt: string;
}

export default function EventTypeCard({
  eventType,
  revealDelayClass,
}: {
  eventType: EventType;
  revealDelayClass?: string;
}) {
  return (
    <div className={`${styles.card} reveal ${revealDelayClass ?? ""}`.trim()}>
      <div className={styles.imageWrapper}>
        {eventType.image?.url ? (
          <Image
            src={eventType.image.url}
            alt={eventType.alt}
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
        <span className={styles.tag}>{eventType.tag}</span>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{eventType.title}</h3>
        <p className={styles.description}>{eventType.description}</p>
      </div>
    </div>
  );
}