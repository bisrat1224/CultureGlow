import Link from "next/link";
import { getFeaturedProducts, getHomeContent } from "@/lib/contentful/queries";
import { ProductCard } from "./ProductCard";
import styles from "./ProductsSection.module.css";
import shared from "../shared.module.css";

const REVEAL_DELAYS = [
  "reveal-delay-1",
  "reveal-delay-2",
  "reveal-delay-3",
  "reveal-delay-4",
];

export async function ProductsSection() {
  const [home, products] = await Promise.all([
    getHomeContent(),
    getFeaturedProducts(),
  ]);
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, viewAllCta } =
    home.products;

  return (
    <section
      className={styles.productsSection}
      id="shop"
      aria-labelledby="products-h2"
    >
      <div className="wrap">
        <div className={styles.productsHeader}>
          <div className={`${styles.productsHeaderLeft} reveal`}>
            <p className={shared.sectionEyebrow}>{eyebrow}</p>
            <h2 className={styles.sectionH2Light} id="products-h2">
              {headingBeforeEm}
              <em>{headingEm}</em>
              {headingAfterEm}
            </h2>
          </div>
          <Link
            href="/shop"
            className={`${styles.btnOutlineGold} reveal reveal-delay-2`}
          >
            {viewAllCta}
          </Link>
        </div>

        <div className={styles.bentoGrid}>
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              revealDelayClass={REVEAL_DELAYS[i % REVEAL_DELAYS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
