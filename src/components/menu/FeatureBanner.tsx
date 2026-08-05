import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./FeatureBanner.module.css";

interface FeatureBannerProps {
  label: string;
  title: string;
  desc: string;
  cta: string;
}

export function FeatureBanner({ label, title, desc, cta }: FeatureBannerProps) {

  return (
    <section className={styles.featureBanner}>
      <div className={styles.featureBannerInner}>
        <div>
          <p className={styles.sectionLabel}>{label}</p>
          <h2 className={styles.featureTitle}>{title}</h2>
          <p className={styles.featureDesc}>{desc}</p>
          <a
            href={buildWhatsAppLink("I would like to enquire about catering")}
            className={`${styles.btnOnGreen} cg-press`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/assets/images/img_whatsappicon.svg" alt="" width={14} height={14} />
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
            className={styles.featureBannerImg}
          />
        </div>
      </div>
    </section>
  );
}