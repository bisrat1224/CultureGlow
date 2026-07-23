import styles from "./MissionValues.module.css";
import shared from "../shared.module.css";

interface MissionValuesProps {
  mission: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
  };
  values: any[];
}

export default function MissionValues({ mission, values }: MissionValuesProps) {
  return (
    <section className={shared.sectionOnDark} id="mission" aria-labelledby="mission-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{mission.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="mission-h2"
          >
            {mission.heading_before_em}
            <em>{mission.heading_em}</em>
          </h2>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value, i) => (
            <div
              key={value.id}
              className={`${styles.valueCard} reveal reveal-delay-${Math.min(i + 1, 3)}`}
            >
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueBody}>{value.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
