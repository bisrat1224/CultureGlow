import styles from "./ShopHero.module.css";

export function ShopHero() {
  return (
    <section className={styles.shopHero} aria-label="Shop hero">
      <p className={styles.shopHeroLabel}>Habesha Food · Beauty · Lifestyle</p>
      <h1 className={styles.shopHeroTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing
      </h1>
      <p className={styles.shopHeroDesc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
      </p>
    </section>
  );
}
