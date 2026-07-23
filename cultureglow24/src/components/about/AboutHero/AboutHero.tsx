import styles from "./AboutHero.module.css";

interface AboutHeroProps {
  hero: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
  };
}

export default function AboutHero({ hero }: AboutHeroProps) {
  return (
    <section className={styles.aboutHero} aria-label="About hero">
      <div className="wrap">
        <p className={styles.aboutHeroEyebrow}>{hero.eyebrow}</p>
        <h1 className={styles.aboutHeroH1}>
          {hero.heading_before_em}
          <em>{hero.heading_em}</em>
          {hero.heading_after_em}
        </h1>
      </div>
    </section>
  );
}
