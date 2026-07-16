import { buildWhatsAppLink } from "@/lib/constants";
import { ProductCard, type Product } from "./ProductCard";
import styles from "./ProductsSection.module.css";

// The 4 featured products, in index.html's exact order. Products (up to 20)
// is a Pending item on the Developer Brief's Content Checklist — these are
// the specific 4 index.html already ships with, kept verbatim since the
// build is locked to an exact match.
const PRODUCTS: Product[] = [
  {
    id: "injera-platter",
    category: "HABESHA FOOD",
    name: "Injera Platter",
    price: "ETB 450",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Traditional injera platter with assorted stews",
  },
  {
    id: "habesha-kemis",
    category: "LIFESTYLE",
    name: "Habesha Kemis",
    price: "ETB 3,200",
    image: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
    alt: "Traditional Habesha dress with intricate embroidery",
  },
  {
    id: "netela-dress",
    category: "BEAUTY",
    name: "Netela Dress",
    price: "ETB 2,850",
    image: "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
    alt: "Elegant Habesha cultural dress",
  },
  {
    id: "beyaynetu-platter",
    category: "HABESHA FOOD",
    name: "Beyaynetu Platter",
    price: "ETB 620",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Beyaynetu vegetarian platter",
  },
];

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

export function ProductsSection() {
  return (
    <section
      className={styles.productsSection}
      id="shop"
      aria-labelledby="products-h2"
    >
      <div className="wrap">
        <div className={styles.productsHeader}>
          <div className={`${styles.productsHeaderLeft} reveal`}>
            <p className={styles.sectionEyebrow}>Featured Products</p>
            <h2 className={styles.sectionH2Light} id="products-h2">
              Handpicked <em>Favourites</em>
            </h2>
          </div>
          <a
            href={buildWhatsAppLink()}
            className={`${styles.btnOutlineGold} reveal reveal-delay-2`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View All →
          </a>
        </div>

        <div className={styles.bentoGrid}>
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              revealDelayClass={REVEAL_DELAYS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}