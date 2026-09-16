import Image from "next/image";
import { aboutContent } from "@/lib/content/content.about";
import styles from "./CoffeeHeritage.module.css";

export function CoffeeHeritage() {
  const { headingBeforeEm, headingEm, headingAfterEm, intro, points } =
    aboutContent.coffeeHeritage;

  return (
    <section
      className={styles.heritageSection}
      id="coffee-heritage"
      aria-labelledby="about-heritage-h2"
    >
      <Image
        src="/assets/images/about/kaldi-kaffa-heritage-sketch.webp"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        aria-hidden="true"
        className={styles.heritageBg}
      />
      <div className={styles.heritageOverlay} />
      <div className={styles.heritageGrain} aria-hidden="true" />

      <div className={`wrap ${styles.heritageContent}`}>
        <div className={`${styles.heritageHead} reveal`}>
          <p className={styles.heritageEyebrow}>Heritage and Origins</p>
          <h2 className={styles.heritageH2} id="about-heritage-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={styles.heritageIntro}>{intro}</p>
        </div>

        <div className={styles.placardGrid}>
          {points.map((point, index) => (
            <article
              key={point.number}
              className={`${styles.placardCard} reveal reveal-delay-${(index % 3) + 1}`}
            >
              <div className={styles.placardHeader}>
                <span className={styles.placardNumber}>{point.number}</span>
                <span className={styles.placardDivider} aria-hidden="true" />
                <h3 className={styles.placardTitle}>{point.title}</h3>
              </div>
              <p className={styles.placardText}>{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
