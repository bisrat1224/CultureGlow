import { aboutContent } from "@/lib/content/content.about";
import styles from "./MilestonesTimeline.module.css";
import shared from "../../home/shared.module.css";

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

export function MilestonesTimeline() {
  const { eyebrow, headingBeforeEm, headingEm, items } = aboutContent.milestones;

  return (
    <section className={styles.milestonesSection} aria-labelledby="milestones-h2">
      <div className="wrap">
        <div className={`${styles.milestonesHeader} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.milestonesH2} id="milestones-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
          </h2>
        </div>

        <div className={styles.timeline}>
          {items.map((milestone, i) => (
            <div
              key={`${milestone.year}-${milestone.label}`}
              className={`${styles.timelineItem} reveal ${REVEAL_DELAYS[i]}`}
            >
              <p className={styles.timelineYear}>{milestone.year}</p>
              <p className={styles.timelineLabel}>{milestone.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}