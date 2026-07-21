import Image from "next/image";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  return (
    <section className={styles.aboutHero} aria-label="About hero">
      <Image
        src="/assets/images/platter-big.jpg"
        alt="Colourful injera platter with many stews"
        fill
        sizes="100vw"
        quality={70}
        priority
        className={styles.aboutHeroImg}
      />
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