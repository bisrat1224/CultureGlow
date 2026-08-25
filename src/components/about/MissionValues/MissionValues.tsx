import Image from "next/image";
import { aboutContent } from "@/lib/content/content.about";
import styles from "./MissionValuesOriginal.module.css";

export function MissionValuesOriginal() {
  const { eyebrow, headingBeforeEm, headingEm, values } = aboutContent.mission;

  return (
    <section className={styles.missionSection} aria-labelledby="mission-h2">
      <div className="wrap">
        <div className={styles.missionGrid}>
          <div className={`${styles.missionTextCol} reveal`}>
            <p className={styles.missionEyebrow}>{eyebrow}</p>
            <h2 className={styles.missionH2} id="mission-h2">
              {headingBeforeEm}
              <em>{headingEm}</em>
            </h2>

            <div className={styles.valuesList}>
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className={`${styles.valuePlacard} reveal reveal-delay-${i + 1}`}
                >
                  <div className={styles.placardHeader}>
                    <span className={styles.valueNumber}>0{i + 1}</span>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                  </div>
                  <p className={styles.valueBody}>{value.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.missionVisual} reveal reveal-delay-2`}>
            <div className={styles.pedestalCard}>
              <div className={styles.imageWrap}>
                <Image
                  src="/assets/images/logo.png"
                  alt="Habesha wedding banqueting and cultural celebration"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className={styles.imageEl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}