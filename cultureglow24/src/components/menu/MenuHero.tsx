import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import { menuContent } from "@/lib/content/content.menu";
import styles from "./MenuHero.module.css";

export function MenuHero() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc, primaryCta, secondaryCta } =
    menuContent.hero;

  return (
    <section className={styles.menuHero} aria-label="Menu hero">
      <Image
        src="/assets/images/pexels-dbaler-17486836.jpg"
        alt="Injera platter with assorted stews"
        fill
        sizes="100vw"
        priority
        className={styles.menuHeroImg}
      />
      <div className={`${styles.menuHeroBody} wrap`}>
        <p className={styles.menuHeroEyebrow}>{eyebrow}</p>
        <h1 className={styles.menuHeroH1}>
          {headingBeforeEm}
          <em>{headingEm}</em>
          {headingAfterEm}
        </h1>
        <p className={styles.menuHeroDesc}>{desc}</p>
        <div className={styles.menuHeroActions}>
          <a
            href={buildWhatsAppLink()}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {primaryCta}
          </a>
          <a href="#mains" className={styles.btnGhostLight}>
            {secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}