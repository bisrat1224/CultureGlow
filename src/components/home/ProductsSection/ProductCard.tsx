import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./ProductCard.module.css";

export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  image: string;
  alt: string;
  description?: string;
  badge?: "Best Seller" | "Popular" | "Gift" | "New";
  gallery?: string[];
  allergens?: string[];
  etsyUrl?: string;
}

interface ProductCardProps {
  product: Product;
  revealDelayClass?: string;
}

export function ProductCard({ product, revealDelayClass }: ProductCardProps) {
  const { category, name, price, image, alt, description } = product;

  return (
    <article className={`${styles.bentoCard} reveal ${revealDelayClass ?? ""}`}>
      <Link
        href={`/shop/${product.id}`}
        className={styles.cardLinkOverlay}
        aria-label={`View ${name}`}
      />

      <div className={styles.bentoCardImgWrap}>
        <Image
          src={image}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={styles.bentoCardImgEl}
        />
        {category ? (
          <span className={styles.bentoCardBadge}>{category}</span>
        ) : null}
      </div>

      <div className={styles.bentoCardBody}>
        <h3 className={styles.bentoCardName}>{name}</h3>
        {description ? (
          <p className={styles.bentoCardDesc}>{description}</p>
        ) : null}

        <div className={styles.bentoCardFooter}>
          <p className={styles.bentoCardPrice}>{price}</p>
          <div className={styles.bentoCardButtons}>
            <a
              href={buildWhatsAppLink(`I'd like to order ${name}`)}
              className={`${styles.btnWaCard} cg-press`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${name} on WhatsApp`}
            >
              <Image
                src="/assets/images/img_whatsappicon.svg"
                alt=""
                width={18}
                height={18}
              />
            </a>
            <a
              href={product.etsyUrl || "https://www.etsy.com/shop/cultureglow24"}
              className={`${styles.btnEtsyCard} cg-press`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${name} on Etsy`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8.5 7.5h7v1.5h-5v2.5h4v1.5h-4v3h5v1.5h-7v-10z" fill="currentColor" stroke="none" />
                <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.75" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
