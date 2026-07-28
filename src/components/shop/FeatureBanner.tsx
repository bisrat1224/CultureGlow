import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import { shopContent } from "@/lib/content/content.shop";
import styles from "./FeatureBanner.module.css";

export function FeatureBanner() {
  const { label, title, desc, cta } = shopContent.featureBanner;

  return (
    <section className={styles.featureBanner}>
      <div className={styles.featureBannerInner}>
        <div>
          <p className={styles.sectionLabel}>{label}</p>
          <h2 className={styles.featureTitle}>{title}</h2>
          <p className={styles.featureDesc}>{desc}</p>

          <a
            href={buildWhatsAppLink("I would like to enquire about catering")}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {cta}
          </a>
        </div>
        <div className={styles.featureBannerImage}>
          <Image
            src="/assets/images/sharing-hands.jpg"
            alt="Habesha catering event"
            fill
            loading="lazy"
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}