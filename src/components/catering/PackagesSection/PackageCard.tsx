import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./PackageCard.module.css";

export interface Package {
  id: string;
  name: string;
  guests: string;
  priceFrom: string;
  features: string[];
  featured?: boolean;
}

interface PackageCardProps {
  pkg: Package;
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--cg-gold)"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function PackageCard({ pkg }: PackageCardProps) {
  const { name, guests, priceFrom, features, featured } = pkg;

  return (
    <article
      className={`${styles.packageCard} ${featured ? styles.packageCardFeatured : ""} reveal`}
    >
      {featured && (
        <span className={styles.packageFeaturedBadge}>Most Popular</span>
      )}
      <p className={styles.packageName}>{name}</p>
      <p className={styles.packageGuests}>{guests}</p>
      <p className={styles.packagePrice}>
        From {priceFrom} <span>/ event</span>
      </p>
      <ul className={styles.packageList}>
        {features.map((feature) => (
          <li key={feature}>
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={buildWhatsAppLink(
          `I'd like to enquire about the ${name} catering package`
        )}
        className={`${styles.packageBtn} ${featured ? "" : styles.packageBtnGhost}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Enquire
      </a>
    </article>
  );
}
