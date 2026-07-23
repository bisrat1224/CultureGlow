import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./CateringSection.module.css";

interface CateringSectionProps {
  catering: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_second_line: string;
    body: string;
    cta: string;
  };
}

export default function CateringSection({ catering }: CateringSectionProps) {
  return (
    <section
      className={styles.cateringSection}
      id="catering"
      aria-labelledby="catering-h2"
    >
      <div className="wrap">
        <div className={styles.cateringInner}>
          <div className={`${styles.cateringText} reveal`}>
            <p className={styles.cateringEyebrow}>{catering.eyebrow}</p>
            <h2 className={styles.cateringH2} id="catering-h2">
              {catering.heading_before_em}
              <em>{catering.heading_em}</em>
              <br />
              {catering.heading_second_line}
            </h2>
            <p className={styles.cateringDesc}>{catering.body}</p>
            <a
              href={buildWhatsAppLink()}
              className={styles.btnGreenCta}
              target="_blank"
              rel="noopener noreferrer"
            >
              {catering.cta}
            </a>
          </div>

          <div className={`${styles.cateringVisual} reveal reveal-delay-2`}>
            <div className={`${styles.cateringImgWrap} ${styles.cateringImgTallWrap}`}>
              <Image
                src="/assets/images/stew-pans.jpg"
                alt="Traditional stews for catering"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.cateringImgEl}
              />
            </div>
            <div className={`${styles.cateringImgWrap} ${styles.cateringImgSqWrap}`}>
              <Image
                src="/assets/images/injera-plate.jpg"
                alt="Injera platter for catering"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.cateringImgEl}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
