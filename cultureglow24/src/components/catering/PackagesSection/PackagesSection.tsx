import { PackageCard, type Package } from "./PackageCard";
import styles from "./PackagesSection.module.css";
import shared from "../shared.module.css";

const PACKAGES: Package[] = [
  {
    id: "essential",
    name: "Essential",
    guests: "Up to 30 guests",
    priceFrom: "ETB 15,000",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Incididunt ut labore",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    guests: "Up to 80 guests",
    priceFrom: "ETB 38,000",
    featured: true,
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Incididunt ut labore",
      "Et dolore magna aliqua",
    ],
  },
  {
    id: "grand-feast",
    name: "Grand Feast",
    guests: "80+ guests",
    priceFrom: "ETB 75,000",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Incididunt ut labore",
      "Et dolore magna aliqua",
      "Ut enim ad minim veniam",
    ],
  },
];

export function PackagesSection() {
  return (
    <section
      className={shared.sectionOnDark}
      id="packages"
      aria-labelledby="packages-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>Packages</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="packages-h2"
          >
            Find Your <em>Fit</em>
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescDark}`}>
            Placeholder tiers below — real packages, inclusions, and starting
            prices come from the client via the PM.
          </p>
        </div>

        <div className={styles.packagesGrid}>
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
