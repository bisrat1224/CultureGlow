import { BundleCard, type Bundle } from "./BundleCard";
import styles from "./BundlesSection.module.css";

const BUNDLES: Bundle[] = [
  {
    id: "yirgacheffe-ritual",
    label: "For Coffee Lovers",
    title: "Yirgacheffe Ritual",
    priceFrom: "ETB 1,850",
    image: "/assets/images/pexels-berlinerlights-23858842.jpg",
    alt: "Coffee Lover Bundle",
  },
  {
    id: "habesha-feast",
    label: "For Food Lovers",
    title: "The Habesha Feast",
    priceFrom: "ETB 3,200",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Feast Bundle",
  },
  {
    id: "habesha-style-edit",
    label: "For Style Lovers",
    title: "Habesha Style Edit",
    priceFrom: "ETB 980",
    image: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
    alt: "Kemis Style Bundle",
  },
];

export function BundlesSection() {
  return (
    <section className={styles.bundlesSection}>
      <div className={styles.bundlesHeader}>
        <p className={styles.sectionLabel}>Gift Bundles</p>
        <h2 className={styles.sectionTitle}>Lorem ipsum dolor sit</h2>
        <p className={styles.bundlesDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
          eiusmod tempor incididunt.
        </p>
      </div>

      <div className={styles.bundlesGrid}>
        {BUNDLES.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </section>
  );
}
