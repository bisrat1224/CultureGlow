import styles from "./MilestonesTimeline.module.css";
import shared from "../shared.module.css";

interface MilestonesTimelineProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
  };
  milestones: any[];
}

export default function MilestonesTimeline({ heading, milestones }: MilestonesTimelineProps) {
  return (
    <section className={shared.sectionOnCream} id="milestones" aria-labelledby="milestones-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="milestones-h2"
          >
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
          </h2>
        </div>

        <div className={styles.timeline}>
          {milestones.map((milestone, i) => (
            <div
              key={milestone.id}
              className={`${styles.timelineItem} reveal reveal-delay-${Math.min(i + 1, 3)}`}
            >
              <span className={styles.timelineYear}>{milestone.year}</span>
              <span className={styles.timelineLabel}>{milestone.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
