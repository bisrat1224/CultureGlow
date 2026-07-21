import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import { menuContent } from "@/lib/content/content.menu";
import styles from "./FeatureBanner.module.css";

export function FeatureBanner() {
  const { label, title, desc, cta } = menuContent.featureBanner;

  return (
    <section className={styles.featureBanner}>
      <div className={styles.featureBannerInner}>
        <div>
          <p className={styles.sectionLabel}>{label}</p>
          <h2 className={styles.featureTitle}>{title}</h2>
          <p className={styles.featureDesc}>{desc}</p>
          <a
            href={buildWhatsAppLink("I would like to enquire about catering")}
            className={styles.btnOnGreen}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {cta}
          </a>
        </div>
        <div className={styles.featureBannerImage}>
          <Image
            src="/assets/images/istockphoto-908729848-612x612.jpg"
            alt="Habesha catering event"
            fill
            sizes="(min-width: 768px) 440px, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}