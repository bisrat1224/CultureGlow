import EventTypeCard from "./EventTypeCard";
import styles from "./EventTypesSection.module.css";
import shared from "../shared.module.css";

interface EventTypesSectionProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
  };
  eventTypes: any[];
}

export default function EventTypesSection({ heading, eventTypes }: EventTypesSectionProps) {
  return (
    <section className={shared.sectionOnCream} id="events" aria-labelledby="events-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="events-h2"
          >
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
          <p className={shared.sectionDesc}>{heading.desc}</p>
        </div>

        <div className={styles.eventTypesGrid}>
          {eventTypes.map((et, i) => (
            <EventTypeCard
              key={et.id}
              eventType={{
                id: et.id,
                tag: et.tag,
                title: et.title,
                desc: et.description,
                image: et.image,
                alt: et.alt,
              }}
              revealDelayClass={`reveal-delay-${Math.min(i + 1, 4)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
