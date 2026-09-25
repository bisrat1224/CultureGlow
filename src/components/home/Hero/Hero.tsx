import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import { homeContent } from "@/lib/content/content.home";
import styles from "./Hero.module.css";
import shared from "../shared.module.css";

export function Hero() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, body, primaryCta, secondaryCta } =
    homeContent.hero;

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.heroBgWrapper}>
        <Image
          src="/assets/images/multiple-plates.webp"
          alt="Traditional Habesha plates"
          fill
          sizes="100vw"
          quality={90}
          priority
          className={styles.heroImgFallback}
        />
        <div className={styles.heroGrain} />
      </div>

      <div className={`${styles.heroBody} wrap`}>
        <p className={styles.heroEyebrow}>{eyebrow}</p>
        <h1 className={styles.heroH1}>
          {headingBeforeEm}
          <em>{headingEm}</em>
          {headingAfterEm}
        </h1>
        <p className={styles.heroSub}>{body}</p>
        <div className={styles.heroActions}>
          <a
            href={buildWhatsAppLink()}
            className={`${shared.btnPrimary} cg-press`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" width={24} height={24} />
            {primaryCta}
          </a>

          <Link href="/menu" className={`${shared.btnGhost} cg-press`}>
            {secondaryCta}
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