import { TestimonialCard, type Testimonial } from "./TestimonialCard";
import styles from "./TestimonialsSection.module.css";
import shared from "../shared.module.css";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "liya-t",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    initial: "L",
    name: "Liya T.",
    location: "Wedding, Ethiopia",
  },
  {
    id: "meron-a",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    initial: "M",
    name: "Meron A.",
    location: "Graduation, Bole",
  },
  {
    id: "dawit-s",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    initial: "D",
    name: "Dawit S.",
    location: "Family Reunion, Piassa",
  },
];

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export function TestimonialsSection() {
  return (
    <section
      className={styles.testimonialsSection}
      id="testimonials"
      aria-labelledby="testimonials-h2"
    >
      <div className="wrap">
        <div className={`${styles.testimonialsHeader} reveal`}>
          <p className={shared.sectionEyebrow}>Kind Words</p>
          <h2 className={styles.testimonialsH2} id="testimonials-h2">
            What Our <em>Guests</em> Say
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