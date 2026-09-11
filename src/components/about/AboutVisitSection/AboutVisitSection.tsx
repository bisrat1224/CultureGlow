import Link from "next/link";
import { BUSINESS_ADDRESS } from "@/lib/constants";
import { aboutContent } from "@/lib/content/content.about";
import { contactContent } from "@/lib/content/content.contact";
import styles from "./AboutVisitSection.module.css";

export function AboutVisitSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, body, addressLabel, hoursLabel, cta } =
    aboutContent.visit;

  return (
    <section className={styles.section} id="visit" aria-labelledby="visit-h2">
      <div className="wrap">
        <div className={`${styles.inner} reveal`}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.heading} id="visit-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={styles.body}>{body}</p>
          <dl className={styles.meta}>
            <div>
              <dt>{addressLabel}</dt>
              <dd>{BUSINESS_ADDRESS}</dd>
            </div>
            <div>
              <dt>{hoursLabel}</dt>
              <dd>
                {contactContent.hours.schedule.map((row) => (
                  <span key={row.days} className={styles.hoursLine}>
                    {row.days}: {row.hours}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <Link href="/contact" className={`${styles.cta} cg-press`}>
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
