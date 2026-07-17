import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./CateringSection.module.css";

export function CateringSection() {
  return (
    <section
      className={styles.cateringSection}
      id="catering"
      aria-labelledby="catering-h2"
    >
      <div className="wrap">
        <div className={styles.cateringInner}>
          <div className={`${styles.cateringText} reveal`}>
            <p className={styles.cateringEyebrow}>Catering &amp; Events</p>
            <h2 className={styles.cateringH2} id="catering-h2">
              Bring the <em>Feast</em>
              <br />
              to Your Event
            </h2>
            <p className={styles.cateringDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua ut
              enim ad minim veniam.
            </p>
            <a
              href={buildWhatsAppLink()}
              className={styles.btnGreenCta}
              target="_blank"
              rel="noopener noreferrer"
            >
              Plan Your Event →
            </a>
          </div>

          <div className={`${styles.cateringVisual} reveal reveal-delay-2`}>
            <div className={`${styles.cateringImgWrap} ${styles.cateringImgTallWrap}`}>
              <Image
                src="/assets/images/pexels-berlinerlights-23858842.jpg"
                alt="Traditional stews for catering"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className={styles.cateringImgEl}
              />
            </div>
            <div className={`${styles.cateringImgWrap} ${styles.cateringImgSqWrap}`}>
              <Image
                src="/assets/images/istockphoto-452732099-612x612.jpg"
                alt="Injera platter"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
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