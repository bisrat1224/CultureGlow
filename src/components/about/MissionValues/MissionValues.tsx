import { Heart, Users, Sparkles } from "lucide-react";
import { aboutContent } from "@/lib/content/content.about";
import styles from "./MissionValues.module.css";

const ICONS = [Heart, Users, Sparkles] as const;
const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export function MissionValues() {
  const { eyebrow, headingBeforeEm, headingEm, values } = aboutContent.mission;

  return (
    <section className={styles.missionSection} aria-labelledby="mission-h2">
      <div className="wrap">
        <div className={`${styles.missionHeader} reveal`}>
          <p className={styles.missionEyebrow}>{eyebrow}</p>
          <h2 className={styles.missionH2} id="mission-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
          </h2>
        </div>

        <div className={styles.missionGrid}>
          {values.map((value, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={value.title}
                className={`${styles.missionCard} reveal ${REVEAL_DELAYS[i]}`}
              >
                <div className={styles.missionIconWrap}>
                  <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className={styles.missionCardTitle}>{value.title}</h3>
                <p className={styles.missionCardBody}>{value.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}