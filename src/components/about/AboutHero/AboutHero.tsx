import Image from "next/image";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  return (
    <header className={styles.hero} aria-label="About CultureGlow24">
      <Image
        src="/assets/images/hero-bg-images/hero-bg-image-1.jpeg"
        alt="Habesha culinary gathering and craftsmanship"
        fill
        sizes="100vw"
        quality={90}
        priority
        className={styles.heroImg}
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroGrain} aria-hidden="true" />

      <div className={`${styles.heroBody} wrap`}>
        <h1 className={styles.heroH1}>
          A Heritage of Flavor, <br />
          <em>Crafted with Reverence</em>
        </h1>
        <p className={styles.heroLead}>
          CultureGlow24 is a living homage to Ethiopian and Eritrean culinary
          heritage, sacred rituals, and the quiet dignity of artisanal craft.
        </p>
      </div>

      <div className={styles.heroScroll} aria-hidden="true">
        <div className={styles.heroScrollLine} />
        <span>Scroll</span>
      </div>
    </header>
  );
}