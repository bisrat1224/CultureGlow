
import { Heart, Users, Sparkles } from "lucide-react";
import styles from "./MissionValues.module.css";


const VALUES = [
  {
    icon: Heart,
    title: "Authenticity",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: Sparkles,
    title: "Craftsmanship",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
] as const;

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export function MissionValues() {
  return (
    <section className={styles.missionSection} aria-labelledby="mission-h2">
      <div className="wrap">
        <div className={`${styles.missionHeader} reveal`}>
          <p className={styles.missionEyebrow}>Mission &amp; Values</p>
          <h2 className={styles.missionH2} id="mission-h2">
            What We <em>Stand For</em>
          </h2>
        </div>

        <div className={styles.missionGrid}>
          {VALUES.map((value, i) => {
            const Icon = value.icon;
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
