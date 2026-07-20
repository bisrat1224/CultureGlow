import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./FeatureBanner.module.css";

export function FeatureBanner() {
  return (
    <section className={styles.featureBanner}>
      <div className={styles.featureBannerInner}>
        <div>
          <p className={styles.sectionLabel}>Catering &amp; Events</p>
          <h2 className={styles.featureTitle}>
            Lorem ipsum dolor sit amet consectetur
          </h2>
          <p className={styles.featureDesc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua ut
            enim ad minim veniam.
          </p>
          <a
            href={buildWhatsAppLink("I'd like to enquire about catering")}
            className={styles.btnOnGreen}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            Plan Your Event
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
