
import styles from "./MilestonesTimeline.module.css";
import shared from "../../home/shared.module.css";


const MILESTONES = [
  { year: "Year 1", label: "Lorem Ipsum Founded" },
  { year: "Year 2", label: "Lorem Ipsum Expansion" },
  { year: "Year 3", label: "Lorem Ipsum Milestone" },
  { year: "Year 4", label: "Lorem Ipsum Today" },
] as const;

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

export function MilestonesTimeline() {
  return (
    <section className={styles.milestonesSection} aria-labelledby="milestones-h2">
      <div className="wrap">
        <div className={`${styles.milestonesHeader} reveal`}>
          <p className={shared.sectionEyebrow}>Our Journey</p>
          <h2 className={styles.milestonesH2} id="milestones-h2">
            Milestones Along the <em>Way</em>
          </h2>
        </div>

        <div className={styles.timeline}>
          {MILESTONES.map((milestone, i) => (
            <div
              key={milestone.year}
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
