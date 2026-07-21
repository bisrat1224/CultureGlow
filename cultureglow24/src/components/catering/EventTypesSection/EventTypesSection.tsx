import { EventTypeCard, type EventType } from "./EventTypeCard";
import { cateringContent } from "@/lib/content/content.catering";
import styles from "./EventTypesSection.module.css";
import shared from "../shared.module.css";

const EVENT_TYPES: EventType[] = [
  {
    id: "weddings",
    tag: "Weddings",
    title: "Weddings",
    desc: "Full-service catering for your big day - from intimate ceremonies to large receptions, plated or buffet-style.",
    image:
      "https://images.pexels.com/photos/35976293/pexels-photo-35976293.png?auto=compress&cs=tinysrgb&w=800",
    alt: "Ethiopian wedding celebration at night",
  },
  {
    id: "corporate",
    tag: "Corporate",
    title: "Corporate",
    desc: "Team lunches, client dinners, and company celebrations - professional service with authentic Habesha flavor.",
    image:
      "https://images.pexels.com/photos/6405661/pexels-photo-6405661.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Colleagues celebrating together at a corporate event",
  },
  {
    id: "birthdays",
    tag: "Birthdays",
    title: "Birthdays",
    desc: "From milestone birthdays to intimate family gatherings, we tailor the menu and portions to your celebration.",
    image:
      "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Elegant birthday celebration with balloons and cake",
  },
  {
    id: "ceremonies",
    tag: "Cultural & Religious",
    title: "Ceremonies",
    desc: "Timkat, weddings, holidays, and other cultural or religious ceremonies - catered with the respect and detail they deserve.",
    image:
      "https://images.pexels.com/photos/20865956/pexels-photo-20865956.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Women in traditional dress celebrating a cultural festival in Addis Ababa",
  },
];

export function EventTypesSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } = cateringContent.eventTypes;

  return (
    <section
      className={shared.sectionOnCream}
      id="events"
      aria-labelledby="events-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="events-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>{desc}</p>
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
