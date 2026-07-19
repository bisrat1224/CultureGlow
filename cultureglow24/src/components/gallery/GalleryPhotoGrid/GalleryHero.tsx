import styles from "./GalleryHero.module.css";

// Content/copy (eyebrow, headline, description, hero image choice) is
// carried over from the Kimi Agent reference build's GalleryPage.tsx /
// PageHero. The visual shell (56vh, gradient stops, bottom-anchored body)
// intentionally matches CateringHero rather than that reference's own
// .page-hero values — the two references used slightly different numbers
// for what's meant to be the same "inner page hero" pattern, and matching
// our own already-shipped CateringHero keeps Catering and Gallery visually
// consistent with each other rather than introducing a third variant.
export function GalleryHero() {
  return (
    <section className={styles.galleryHero} aria-label="Gallery hero">
      <img
        src="/assets/images/platter-big.jpg"
        alt="Colourful injera platter with many stews"
        className={styles.galleryHeroImg}
      />

      <div className={`${styles.galleryHeroBody} wrap`}>
        <p className={styles.galleryHeroEyebrow}>The Gallery</p>
        <h1 className={styles.galleryHeroH1}>
          Moments in <em>Frame</em>
        </h1>
        <p className={styles.galleryHeroDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
}
