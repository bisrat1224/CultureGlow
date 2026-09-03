import type { HomeContent } from "@/lib/content/content.home";
import { homeContent } from "@/lib/content/content.home";
import { SOCIAL_LINKS } from "@/lib/constants";
import type { Product } from "./ProductCard";
import { ProductsGrid } from "./ProductsGrid";
import styles from "./ProductsSection.module.css";
import shared from "../shared.module.css";

interface Props {
  home: HomeContent["products"];
  products: Product[];
}

const ETSY_HREF =
  SOCIAL_LINKS.find((link) => link.label === "Etsy")?.href ??
  "https://www.etsy.com/shop/cultureglow24";

const DEFAULTS = homeContent.products;

function ShoppingBagIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function pick(value: string | undefined, fallback: string) {
  return value?.trim() ? value : fallback;
}

export function ProductsSection({ home, products }: Props) {
  const eyebrow = pick(home.eyebrow, DEFAULTS.eyebrow);
  const headingBeforeEm = pick(home.headingBeforeEm, DEFAULTS.headingBeforeEm);
  const headingEm = pick(home.headingEm, DEFAULTS.headingEm);
  const headingAfterEm = pick(home.headingAfterEm, DEFAULTS.headingAfterEm);
  const viewAllCta = pick(home.viewAllCta, DEFAULTS.viewAllCta);

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
          <a
            href={ETSY_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btnOutlineGold} reveal reveal-delay-2 cg-press`}
          >
            <ShoppingBagIcon />
            <span>{viewAllCta}</span>
          </a>
        </div>

        <ProductsGrid products={products} />
      </div>
    </section>
  );
}
