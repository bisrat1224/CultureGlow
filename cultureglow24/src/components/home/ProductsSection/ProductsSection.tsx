import { buildWhatsAppLink } from "@/lib/constants";
import ProductCard from "./ProductCard";
import styles from "./ProductsSection.module.css";
import shared from "../shared.module.css";

interface ProductsSectionProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    view_all_cta: string;
  };
  products: any[];
}

export default function ProductsSection({ heading, products }: ProductsSectionProps) {
  return (
    <section
      className={styles.productsSection}
      id="shop"
      aria-labelledby="products-h2"
    >
      <div className="wrap">
        <div className={styles.productsHeader}>
          <div className={`${styles.productsHeaderLeft} reveal`}>
            <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
            <h2 className={styles.sectionH2Light} id="products-h2">
              {heading.heading_before_em}
              <em>{heading.heading_em}</em>
              {heading.heading_after_em}
            </h2>
          </div>
          <a
            href={buildWhatsAppLink()}
            className={`${styles.btnOutlineGold} reveal reveal-delay-2`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {heading.view_all_cta}
          </a>
        </div>

        <div className={styles.bentoGrid}>
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: typeof product.image === "string" ? product.image : product.image?.url,
                alt: product.alt || product.name,
                badge: product.badge || undefined,
                category: product.category,
              }}
              revealDelayClass={`reveal-delay-${Math.min(i + 1, 4)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
