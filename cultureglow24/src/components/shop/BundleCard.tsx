import Image from "next/image";
import Link from "next/link";
import styles from "./BundlesSection.module.css";

interface Bundle {
  id: string;
  title: string;
  slug: string;
  label: string;
  price_from: string;
  image?: { url?: string } | null;
  alt: string;
}

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Link href={`/shop/${bundle.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {bundle.image?.url ? (
          <Image
            src={bundle.image.url}
            alt={bundle.alt}
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>{bundle.label}</span>
        <h3 className={styles.title}>{bundle.title}</h3>
        <span className={styles.price}>{bundle.price_from}</span>
      </div>
    </Link>
  );
}