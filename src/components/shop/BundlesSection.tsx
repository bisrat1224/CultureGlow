import { shopContent } from "@/lib/content/content.shop";
import { BundleCard, type Bundle } from "./BundleCard";
import styles from "./BundlesSection.module.css";

const BUNDLES: Bundle[] = [
  {
    id: "yirgacheffe-ritual",
    label: "For Coffee Lovers",
    title: "Yirgacheffe Ritual",
    priceFrom: "£180",
    image: "/assets/images/stew-pans.jpg",
    alt: "Coffee Lover Bundle",
  },
  {
    id: "habesha-feast",
    label: "For Food Lovers",
    title: "The Habesha Feast",
    priceFrom: "£320",
    image: "/assets/images/sharing-hands.jpg",
    alt: "Feast Bundle",
  },
  {
    id: "habesha-style-edit",
    label: "For Style Lovers",
    title: "Habesha Style Edit",
    priceFrom: "£980",
    image: "/assets/images/dress-green.jpg",
    alt: "Kemis Style Bundle",
  },
];

export function BundlesSection() {
  const { label, title, desc } = shopContent.bundles;

  return (
    <section className={styles.bundlesSection}>
      <div className={styles.bundlesHeader}>
        <p className={styles.sectionLabel}>{label}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.bundlesDesc}>{desc}</p>
      </div>

      <div className={styles.bundlesGrid}>
        {BUNDLES.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </section>
  );
}