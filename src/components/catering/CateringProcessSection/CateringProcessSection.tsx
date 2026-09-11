import { cateringContent } from "@/lib/content/content.catering";
import styles from "./CateringProcessSection.module.css";
import shared from "../shared.module.css";

export function CateringProcessSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, body, steps } =
    cateringContent.process;

  return (
    <section
      className={shared.sectionOnCream}
      id="catering-process"
      aria-labelledby="process-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="process-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>
            {body}
          </p>
        </div>
        <ol className={`${styles.steps} reveal`}>
          {steps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
