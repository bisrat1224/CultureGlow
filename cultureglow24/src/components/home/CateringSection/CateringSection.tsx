import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import { homeContent } from "@/lib/content/content.home";
import styles from "./CateringSection.module.css";

export function CateringSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingSecondLine, body, cta } = homeContent.catering;

  return (
    <section
      className={styles.cateringSection}
      id="catering"
      aria-labelledby="catering-h2"
    >
      <div className="wrap">
        <div className={styles.cateringInner}>
          <div className={`${styles.cateringText} reveal`}>
            <p className={styles.cateringEyebrow}>{eyebrow}</p>
            <h2 className={styles.cateringH2} id="catering-h2">
              {headingBeforeEm}
              <em>{headingEm}</em>
              <br />
              {headingSecondLine}
            </h2>
            <p className={styles.cateringDesc}>{body}</p>
            <a
              href={buildWhatsAppLink()}
              className={styles.btnGreenCta}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta}
            </a>
          </div>

          <div className={`${styles.cateringVisual} reveal reveal-delay-2`}>
            <div className={`${styles.cateringImgWrap} ${styles.cateringImgTallWrap}`}>
              <Image
                src="/assets/images/pexels-berlinerlights-23858842.jpg"
                alt="Traditional stews for catering"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.cateringImgEl}
              />
            </div>
            <div className={`${styles.cateringImgWrap} ${styles.cateringImgSqWrap}`}>
              <Image
                src="/assets/images/pexels-dbaler-17486836.jpg"
                alt="Injera platter for catering"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.cateringImgEl}
              />
            </div>
            <div className={`${styles.cateringImgWrap} ${styles.cateringImgSqWrap}`}>
              <Image
                src="/assets/images/istockphoto-908729848-612x612.jpg"
                alt="Family sharing"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className={styles.cateringImgEl}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}