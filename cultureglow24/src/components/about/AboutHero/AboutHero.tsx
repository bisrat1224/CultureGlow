import Image from "next/image";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  return (
    <section className={styles.aboutHero} aria-label="About hero">
      <Image
        src="/assets/images/habesha-sefed.webp"
        alt="Habesha cultural heritage and identity"
        fill
        sizes="100vw"
        quality={85}
        priority
        className={styles.aboutHeroImg}
      />
      <div className={styles.aboutHeroOverlay} />
      <div className={`${styles.aboutHeroBody} wrap`}>
        <p className={styles.aboutHeroEyebrow}>About Us</p>
        <h1 className={styles.aboutHeroH1}>
          Our <em>Story</em>
        </h1>
        <p className={styles.aboutHeroDesc}>
          Habesha food, beauty, and lifestyle delivered with care.
        </p>
      </div>
    </section>
  );
}