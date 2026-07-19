import {
  CateringTestimonialCard,
  type CateringTestimonial,
} from "./CateringTestimonialCard";
import styles from "./CateringTestimonialsSection.module.css";
import shared from "../shared.module.css";

const TESTIMONIALS: CateringTestimonial[] = [
  {
    id: "liya-t",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    initial: "L",
    name: "Liya T.",
    location: "Wedding, Addis Ababa",
  },
  {
    id: "meron-a",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    initial: "M",
    name: "Meron A.",
    location: "Corporate Retreat, Bole",
  },
  {
    id: "dawit-s",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    initial: "D",
    name: "Dawit S.",
    location: "Timkat Celebration, Piassa",
  },
];

export function CateringTestimonialsSection() {
  return (
    <section
      className={shared.sectionOnDark}
      id="testimonials"
      aria-labelledby="cat-testimonials-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>Kind Words</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="cat-testimonials-h2"
          >
            What Our <em>Clients</em> Say
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t) => (
            <CateringTestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
