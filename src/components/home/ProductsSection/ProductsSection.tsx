import Link from "next/link";
import type { HomeContent } from "@/lib/content/content.home";
import type { Product } from "./ProductCard";
import { ProductsGrid } from "./ProductsGrid";
import styles from "./ProductsOriginal.module.css";
import shared from "../shared.module.css";

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
            className={`${styles.btnOutlineGold} reveal reveal-delay-2 cg-press`}
          >
            {viewAllCta}
          </Link>
        </div>

        <ProductsGrid products={products} />
      </div>
    </section>
  );
}
