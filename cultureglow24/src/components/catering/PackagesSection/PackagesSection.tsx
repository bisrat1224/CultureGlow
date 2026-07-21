import { PackageCard, type Package } from "./PackageCard";
import { cateringContent } from "@/lib/content/content.catering";
import styles from "./PackagesSection.module.css";
import shared from "../shared.module.css";

const PACKAGES: Package[] = [
  {
    id: "essential",
    name: "Essential",
    guests: "Up to 30 guests",
    priceFrom: "ETB 15,000",
    features: [
      "Choice of two main dishes",
      "Traditional injera and sides included",
      "Setup and serving staff included",
      "Basic table settings provided",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    guests: "Up to 80 guests",
    priceFrom: "ETB 38,000",
    featured: true,
    features: [
      "Choice of four main dishes",
      "Full appetizer and dessert course",
      "Setup, serving staff, and cleanup included",
      "Elevated table settings and centerpieces",
      "Ethiopian coffee ceremony station",
    ],
  },
  {
    id: "grand-feast",
    name: "Grand Feast",
    guests: "80+ guests",
    priceFrom: "ETB 75,000",
    features: [
      "Full menu customization",
      "Multi-course appetizer, main, and dessert service",
      "Dedicated event coordinator",
      "Premium table settings and decor",
      "Ethiopian coffee ceremony station",
      "Live cooking station on request",
    ],
  },
];

export function PackagesSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } = cateringContent.packages;

  return (
    <section
      className={shared.sectionOnDark}
      id="packages"
      aria-labelledby="packages-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="packages-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescDark}`}>{desc}</p>
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