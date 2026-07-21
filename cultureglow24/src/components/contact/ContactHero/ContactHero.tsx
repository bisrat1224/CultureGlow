import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import { contactContent } from "@/lib/content/content.contact";
import styles from "./ContactHero.module.css";
import shared from "../shared.module.css";

// Copy, eyebrow ("Get in Touch"), headline ("Let's Talk"), and hero image
// choice (hands sharing an injera platter) are ported one-for-one from the
// Kimi Agent reference build's ContactPage.tsx, which builds its hero via
// a shared <PageHero> component. This project doesn't have a shared
// PageHero - CateringHero, GalleryHero, and MenuHero each already
// established the precedent of "one hero component per page" instead
// (see GalleryHero.tsx's own note on this same convention) - so this
// follows suit rather than introducing a cross-page shared component.
// Real asset already migrated into this project at the same path the
// reference used (src/assets/images/sharing-hands.jpg → this project's
// public/assets/images/sharing-hands.jpg).
export function ContactHero() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc, cta } = contactContent.hero;

  return (
    <section className={styles.contactHero} aria-label="Contact hero">
      <Image
        src="/assets/images/sharing-hands.jpg"
        alt="Hands sharing an injera platter"
        fill
        loading="lazy"
        sizes="100vw"
        priority
        className={styles.contactHeroImg}
      />

      <div className={`${styles.contactHeroBody} wrap`}>
        <p className={styles.contactHeroEyebrow}>{eyebrow}</p>
        <h1 className={styles.contactHeroH1}>
          {headingBeforeEm}
          <em>{headingEm}</em>
          {headingAfterEm}
        </h1>
        <p className={styles.contactHeroDesc}>{desc}</p>
        <div className={styles.contactHeroActions}>
          <a
            href={buildWhatsAppLink()}
            className={shared.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/img_whatsappicon.svg"
              alt=""
              style={{ width: 16, height: 16 }}
            />
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}
