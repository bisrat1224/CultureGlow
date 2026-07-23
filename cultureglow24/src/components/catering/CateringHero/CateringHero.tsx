import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./CateringHero.module.css";

interface CateringHeroProps {
  hero: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
    primary_cta: string;
    secondary_cta: string;
  };
}

export default function CateringHero({ hero }: CateringHeroProps) {
  return (
    <section className={styles.cateringHero} aria-label="Catering hero">
      <div className="wrap">
        <p className={styles.cateringHeroEyebrow}>{hero.eyebrow}</p>
        <h1 className={styles.cateringHeroH1}>
          {hero.heading_before_em}
          <em>{hero.heading_em}</em>
          {hero.heading_after_em}
        </h1>
        <p className={styles.cateringHeroDesc}>{hero.desc}</p>
        <div className={styles.cateringHeroActions}>
          <a
            href={buildWhatsAppLink("I would like to enquire about catering")}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {hero.primary_cta}
          </a>
          <a href="#packages" className={styles.btnGhost}>
            {hero.secondary_cta}
          </a>
        </div>
      </div>
    </section>
  );
}
