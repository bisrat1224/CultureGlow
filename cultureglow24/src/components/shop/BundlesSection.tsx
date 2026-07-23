import BundleCard from "./BundleCard";

interface BundlesSectionProps {
  heading: {
    label: string;
    title: string;
    desc: string;
  };
  bundles: any[];
}

export default function BundlesSection({ heading, bundles }: BundlesSectionProps) {
  return (
    <section className="bundles-section">
      <div className="bundles-header">
        <p className="section-label">{heading.label}</p>
        <h2 className="section-title">{heading.title}</h2>
        <p className="bundles-desc">{heading.desc}</p>
      </div>

      <div className="bundles-grid">
        {bundles.map((bundle) => (
          <BundleCard
            key={bundle.id}
            bundle={{
              id: bundle.id,
              label: bundle.label,
              title: bundle.title,
              priceFrom: bundle.price_from,
              image: bundle.image,
              alt: bundle.alt,
            }}
          />
        ))}
      </div>
    </section>
  );
}
