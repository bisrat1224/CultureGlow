import styles from "./PackageCard.module.css";

interface Package {
  id: string;
  name: string;
  guests: string;
  price_from: string;
  features: { feature: string }[];
  featured: boolean;
}

export default function PackageCard({ package: pkg }: { package: Package }) {
  return (
    <div className={`${styles.card} ${pkg.featured ? styles.featured : ""}`}>
      {pkg.featured && <span className={styles.badge}>Most Popular</span>}
      <h3 className={styles.name}>{pkg.name}</h3>
      <span className={styles.guests}>{pkg.guests}</span>
      <span className={styles.price}>{pkg.price_from}</span>
      <ul className={styles.features}>
        {pkg.features.map((f, i) => (
          <li key={i} className={styles.feature}>{f.feature}</li>
        ))}
      </ul>
    </div>
  );
}