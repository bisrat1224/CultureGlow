import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./Hero.module.css";
import shared from "../shared.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <Image
        src="/assets/images/pexels-berlinerlights-23858842.jpg"
        alt="Traditional Habesha stews"
        fill
        sizes="100vw"
        priority
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
            className={shared.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            Order
          </a>
          
          <Link href="/menu" className={shared.btnGhost}>
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