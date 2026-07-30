import Link from "next/link";
import type { HomeContent } from "@/lib/content/content.home";
import type { Product } from "./ProductCard";
import { ProductCard } from "./ProductCard";
import styles from "./ProductsSection.module.css";
import shared from "../shared.module.css";

const REVEAL_DELAYS = [
  "reveal-delay-1",
  "reveal-delay-2",
  "reveal-delay-3",
  "reveal-delay-4",
];

interface Props {
  home: HomeContent["products"];
  products: Product[];
}

export function ProductsSection({ home, products }: Props) {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, viewAllCta } = home;

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
