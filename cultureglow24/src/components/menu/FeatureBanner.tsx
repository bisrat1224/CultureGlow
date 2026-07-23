import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./FeatureBanner.module.css";

interface FeatureBannerProps {
  banner: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
    cta: string;
  };
}

export default function FeatureBanner({ banner }: FeatureBannerProps) {
  return (
    <section className={styles.featureBanner} aria-label="Feature banner">
      <div className="wrap">
        <div className={`${styles.featureBannerInner} reveal`}>
          <p className={styles.featureBannerEyebrow}>{banner.eyebrow}</p>
          <h2 className={styles.featureBannerH2}>
            {banner.heading_before_em}
            <em>{banner.heading_em}</em>
            {banner.heading_after_em}
          </h2>
          <p className={styles.featureBannerDesc}>{banner.desc}</p>
          <a
            href={buildWhatsAppLink()}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {banner.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
