import { EventTypeCard, type EventType } from "./EventTypeCard";
import styles from "./EventTypesSection.module.css";
import shared from "../shared.module.css";

const EVENT_TYPES: EventType[] = [
  {
    id: "weddings",
    tag: "Weddings",
    title: "Weddings",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    image:
      "https://images.pexels.com/photos/35976293/pexels-photo-35976293.png?auto=compress&cs=tinysrgb&w=800",
    alt: "Ethiopian wedding celebration at night",
  },
  {
    id: "corporate",
    tag: "Corporate",
    title: "Corporate",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    image:
      "https://images.pexels.com/photos/6405661/pexels-photo-6405661.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Colleagues celebrating together at a corporate event",
  },
  {
    id: "birthdays",
    tag: "Birthdays",
    title: "Birthdays",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    image:
      "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Elegant birthday celebration with balloons and cake",
  },
  {
    id: "ceremonies",
    tag: "Cultural & Religious",
    title: "Ceremonies",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    image:
      "https://images.pexels.com/photos/20865956/pexels-photo-20865956.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Women in traditional dress celebrating a cultural festival in Addis Ababa",
  },
];

export function EventTypesSection() {
  return (
    <section
      className={shared.sectionOnCream}
      id="events"
      aria-labelledby="events-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>Occasions We Cater</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="events-h2"
          >
            Every <em>Celebration</em>, Covered
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>

        <div className={styles.eventGrid}>
          {EVENT_TYPES.map((eventType) => (
            <EventTypeCard key={eventType.id} eventType={eventType} />
          ))}
        </div>
      </div>
    </section>
  );
}
