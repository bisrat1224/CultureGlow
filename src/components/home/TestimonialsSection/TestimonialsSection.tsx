import { TestimonialCard, type Testimonial } from "./TestimonialCard";
import { homeContent } from "@/lib/content/content.home";
import styles from "./TestimonialsSection.module.css";
import shared from "../shared.module.css";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "liya-t",
    quote:
      "I ordered a family platter for a small get-together and it disappeared in minutes, the doro wat tasted just like my grandmother's.",
    initial: "L",
    name: "Liya T.",
    location: "Wedding, Ethiopia",
  },
  {
    id: "meron-a",
    quote:
      "WhatsApp ordering made it so easy. I messaged, confirmed, and had authentic Habesha food at my door within the hour.",
    initial: "M",
    name: "Meron A.",
    location: "Graduation, Bole",
  },
  {
    id: "dawit-s",
    quote:
      "Every dish felt homemade. The injera was fresh and the portions were generous enough for the whole family.",
    initial: "D",
    name: "Dawit S.",
    location: "Family Reunion, Piassa",
  },
];

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export function TestimonialsSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm } = homeContent.testimonials;

  return (
    <section
      className={styles.testimonialsSection}
      id="testimonials"
      aria-labelledby="testimonials-h2"
    >
      <div className="wrap">
        <div className={`${styles.testimonialsHeader} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.testimonialsH2} id="testimonials-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              revealDelayClass={REVEAL_DELAYS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}