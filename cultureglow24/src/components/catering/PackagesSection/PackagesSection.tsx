import PackageCard from "./PackageCard";
import styles from "./PackagesSection.module.css";
import shared from "../shared.module.css";

interface PackagesSectionProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
  };
  packages: any[];
}

export default function PackagesSection({ heading, packages }: PackagesSectionProps) {
  return (
    <section className={shared.sectionOnDark} id="packages" aria-labelledby="packages-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="packages-h2"
          >
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescDark}`}>{heading.desc}</p>
        </div>

        <div className={styles.packagesGrid}>
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={{
                id: pkg.id,
                name: pkg.name,
                guests: pkg.guests,
                priceFrom: pkg.price_from,
                featured: pkg.featured,
                features: pkg.features?.map((f: any) => f.feature) || [],
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
