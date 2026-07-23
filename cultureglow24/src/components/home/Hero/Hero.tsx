import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./Hero.module.css";
import shared from "../shared.module.css";

interface HeroProps {
  hero: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    body: string;
    primary_cta: string;
    secondary_cta: string;
    hero_image?: any;
  };
}

export default function Hero({ hero }: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Hero">
      <Image
        src={hero.hero_image?.url || "/assets/images/stew-pans.jpg"}
        alt="Traditional Habesha stews"
        fill
        sizes="100vw"
        quality={70}
        priority
        className={styles.heroImgFallback}
      />
      <div className={styles.heroGrain} />

      <div className={`${styles.heroBody} wrap`}>
        <p className={styles.heroEyebrow}>{hero.eyebrow}</p>
        <h1 className={styles.heroH1}>
          {hero.heading_before_em}
          <em>{hero.heading_em}</em>
          {hero.heading_after_em}
        </h1>
        <p className={styles.heroSub}>{hero.body}</p>
        <div className={styles.heroActions}>
          <a
            href={buildWhatsAppLink()}
            className={shared.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {hero.primary_cta}
          </a>
          <Link href="/menu" className={shared.btnGhost}>
            {hero.secondary_cta}
          </Link>
        </div>
      </div>

      <div className={styles.heroScroll} aria-hidden="true">
        <div className={styles.heroScrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
