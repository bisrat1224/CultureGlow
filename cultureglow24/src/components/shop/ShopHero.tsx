import { shopContent } from "@/lib/content/content.shop";
import styles from "./ShopHero.module.css";

export function ShopHero() {
  const { label, title, desc } = shopContent.hero;

  return (
    <section className={styles.shopHero} aria-label="Shop hero">
      <p className={styles.shopHeroLabel}>{label}</p>
      <h1 className={styles.shopHeroTitle}>{title}</h1>
      <p className={styles.shopHeroDesc}>{desc}</p>
    </section>
  );
}