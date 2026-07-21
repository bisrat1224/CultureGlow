import Image from "next/image";
import { galleryContent } from "@/lib/content/content.gallery";
import styles from "./GalleryHero.module.css";

export function GalleryHero() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } = galleryContent.hero;

  return (
    <section className={styles.galleryHero} aria-label="Gallery hero">
      <Image
        src="/assets/images/platter-big.jpg"
        alt="Colourful injera platter with many stews"
        fill
        loading="lazy"
        sizes="100vw"
        priority
        className={styles.galleryHeroImg}
      />

      <div className={`${styles.galleryHeroBody} wrap`}>
        <p className={styles.galleryHeroEyebrow}>{eyebrow}</p>
        <h1 className={styles.galleryHeroH1}>
          {headingBeforeEm}
          <em>{headingEm}</em>
          {headingAfterEm}
        </h1>
        <p className={styles.galleryHeroDesc}>{desc}</p>
      </div>
    </section>
  );
}