import {
  CateringTestimonialCard,
  type CateringTestimonial,
} from "./CateringTestimonialCard";
import { cateringContent } from "@/lib/content/content.catering";
import styles from "./CateringTestimonialsSection.module.css";
import shared from "../shared.module.css";

const TESTIMONIALS: CateringTestimonial[] = [
  {
    id: "liya-t",
    quote:
      "CultureGlow24 catered our wedding and every single guest asked where the food was from. The doro wat was better than my grandmother's, and that's saying a lot.",
    initial: "L",
    name: "Liya T.",
    location: "Wedding, Addis Ababa",
  },
  {
    id: "meron-a",
    quote:
      "We booked them for a company retreat and the team handled everything — setup, service, cleanup. Zero stress and the spread was incredible.",
    initial: "M",
    name: "Meron A.",
    location: "Corporate Retreat, Bole",
  },
  {
    id: "dawit-s",
    quote:
      "They understood exactly what our Timkat celebration needed. Authentic, generous portions, and served with real care for the tradition.",
    initial: "D",
    name: "Dawit S.",
    location: "Timkat Celebration, Piassa",
  },
];

export function CateringTestimonialsSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm } = cateringContent.testimonials;

  return (
    <section
      className={shared.sectionOnDark}
      id="testimonials"
      aria-labelledby="cat-testimonials-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="cat-testimonials-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
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