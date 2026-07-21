import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import { cateringContent } from "@/lib/content/content.catering";
import styles from "./CateringHero.module.css";
import shared from "../shared.module.css";

export function CateringHero() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc, primaryCta, secondaryCta } =
    cateringContent.hero;

  return (
    <section className={styles.catHero} aria-label="Catering hero">
      <Image
        src="https://images.pexels.com/photos/3376765/pexels-photo-3376765.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Elegant banquet hall set up for a large catered event"
        fill
        sizes="100vw"
        quality={70}
        priority
        className={styles.catHeroImg}
      />

      <div className={`${styles.catHeroBody} wrap`}>
        <p className={styles.catHeroEyebrow}>{eyebrow}</p>
        <h1 className={styles.catHeroH1}>
          {headingBeforeEm}
          <em>{headingEm}</em>
          {headingAfterEm}
        </h1>
        <p className={styles.catHeroDesc}>{desc}</p>
        <div className={styles.catHeroActions}>
          <a
            href={buildWhatsAppLink("I would like to enquire about catering")}
            className={shared.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/img_whatsappicon.svg"
              alt=""
              style={{ width: 16, height: 16 }}
            />
            {primaryCta}
          </a>
          <a href="#packages" className={shared.btnGhostLight}>
            {secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}