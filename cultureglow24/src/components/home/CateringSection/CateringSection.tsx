import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./CateringSection.module.css";

// Matches index.html's <section class="catering-section" id="catering"> exactly —
// green band, eyebrow/h2/desc/CTA on one side, a 3-image bento visual (one tall
// image spanning 2 rows + two square images) on the other. This is the site-wide
// nav's "Catering" anchor target on Home — the future standalone /catering page
// (currently a PageStub) is separate scope per the Chunk 3b decision.
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
            <img
              src="/assets/images/pexels-berlinerlights-23858842.jpg"
              alt="Traditional stews for catering"
              className={`${styles.cateringImg} ${styles.cateringImgTall}`}
            />
            <img
              src="/assets/images/istockphoto-452732099-612x612.jpg"
              alt="Injera platter"
              className={`${styles.cateringImg} ${styles.cateringImgSq}`}
            />
            <img
              src="/assets/images/istockphoto-908729848-612x612.jpg"
              alt="Family sharing"
              className={`${styles.cateringImg} ${styles.cateringImgSq}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}