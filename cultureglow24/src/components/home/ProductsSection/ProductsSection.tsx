import { buildWhatsAppLink } from "@/lib/constants";
import { FEATURED_PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "./ProductCard";
import styles from "./ProductsSection.module.css";
import shared from "../shared.module.css";

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
            <p className={shared.sectionEyebrow}>Featured Products</p>
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
          {FEATURED_PRODUCTS.map((product, i) => (
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