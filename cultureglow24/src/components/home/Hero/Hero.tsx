import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./Hero.module.css";

// Matches index.html's <section class="hero"> exactly. Note: the original
// markup only ever uses the static fallback image (no <video> element is
// present, even though a .hero-video CSS rule exists in the source file) —
// so we replicate that as-is: image + grain overlay, no video.
export function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <img
        src="/assets/images/pexels-berlinerlights-23858842.jpg"
        alt="Traditional Habesha stews"
        className={styles.heroImgFallback}
      />
      <div className={styles.heroGrain} />

      <div className={`${styles.heroBody} wrap`}>
        <p className={styles.heroEyebrow}>Habesha Food · Beauty · Lifestyle</p>
        <h1 className={styles.heroH1}>
          Taste the <em>Soul</em>
          <br />
          of Ethiopia
        </h1>
        <p className={styles.heroSub}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
        </p>
        <div className={styles.heroActions}>
          <a
            href={buildWhatsAppLink()}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            Order
          </a>
          {/* index.html points this at the in-page #menu anchor; per the
              Chunk 3b decision, internal nav now goes to real routes, so
              this goes to /menu instead. */}
          <Link href="/menu" className={styles.btnGhost}>
            Explore the Menu
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