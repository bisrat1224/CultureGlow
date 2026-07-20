import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./CateringHero.module.css";
import shared from "../shared.module.css";


export function CateringHero() {
  return (
    <section className={styles.catHero} aria-label="Catering hero">
      <Image
        src="https://images.pexels.com/photos/3376765/pexels-photo-3376765.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Elegant banquet hall set up for a large catered event"
        fill
        sizes="100vw"
        priority
        className={styles.catHeroImg}
      />

      <div className={`${styles.catHeroBody} wrap`}>
        <p className={styles.catHeroEyebrow}>Catering &amp; Events</p>
        <h1 className={styles.catHeroH1}>
          Bring the <em>Feast</em> to Your Occasion
        </h1>
        <p className={styles.catHeroDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={styles.catHeroActions}>
          <a
            href={buildWhatsAppLink("I'd like to enquire about catering")}
            className={shared.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/img_whatsappicon.svg"
              alt=""
              style={{ width: 16, height: 16 }}
            />
            Enquire on WhatsApp
          </a>
          <a href="#packages" className={shared.btnGhostLight}>
            See Packages
          </a>
        </div>
      </div>
    </section>
  );
}
