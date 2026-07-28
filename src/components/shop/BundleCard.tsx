import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./BundlesSection.module.css";

export interface Bundle {
  id: string;
  label: string;
  title: string;
  priceFrom: string;
  image: string;
  alt: string;
}

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const { label, title, priceFrom, image, alt } = bundle;

  return (
    <div className={styles.bundleCard}>
      <Image
        src={image}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        style={{ objectFit: "cover" }}
      />
      <div className={styles.bundleOverlay}>
        <p className={styles.bundleLabel}>{label}</p>
        <h3 className={styles.bundleTitle}>{title}</h3>
        <p className={styles.bundlePrice}>From {priceFrom}</p>
        <a
          href={buildWhatsAppLink(`I'd like to order ${title} bundle`)}
          className={styles.bundleBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/images/img_whatsappicon.svg" alt="" />
          Order
        </a>
      </div>
    </div>
  );
}
