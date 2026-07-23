import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./MenuHero.module.css";

interface MenuHeroProps {
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

export default function MenuHero({ hero }: MenuHeroProps) {
  return (
    <section className={styles.menuHero} aria-label="Menu hero">
      <Image
        src="/assets/images/injera-plate.jpg"
        alt="Injera platter with assorted stews"
        fill
        sizes="100vw"
        quality={70}
        priority
        className={styles.menuHeroImg}
      />
      <div className={styles.menuHeroBody}>
        <div className="wrap">
          <p className={styles.menuHeroEyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.menuHeroH1}>
            {hero.heading_before_em}
            <em>{hero.heading_em}</em>
            {hero.heading_after_em}
          </h1>
          <p className={styles.menuHeroDesc}>{hero.desc}</p>
          <div className={styles.menuHeroActions}>
            <a
              href={buildWhatsAppLink()}
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/images/img_whatsappicon.svg" alt="" />
              {hero.primary_cta}
            </a>
            <a href="#mains" className={styles.btnGhostLight}>
              {hero.secondary_cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
