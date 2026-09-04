import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import type { Product } from "@/lib/data/products";
import styles from "./ShopProductCard.module.css";

interface ShopProductCardProps {
  product: Product;
}

const BADGE_CLASS: Record<NonNullable<Product["badge"]>, string> = {
  "Best Seller": styles.badgeDefault,
  Popular: styles.badgeDefault,
  Gift: styles.badgeDefault,
  New: styles.badgeNew,
};


export function ShopProductCard({ product }: ShopProductCardProps) {
  const { id, name, description, price, image, alt, badge } = product;

  return (
    <article className={styles.productCard} data-category={product.category}>
      <Link href={`/shop/${id}`} className={styles.cardLinkOverlay} aria-label={`View ${name}`} />
      <div className={`${styles.productImage} cg-press-card`}>
        <Image
          src={image}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
        />
        {badge && (
          <span className={`${styles.productBadge} ${BADGE_CLASS[badge]}`}>
            {badge}
          </span>
        )}
      </div>
      <h3 className={styles.productTitle}>{name}</h3>
      <p className={styles.productDesc}>{description}</p>
      <div className={styles.productFooter}>
        <span className={styles.productPrice}>{price}</span>
        <div className={styles.productButtons}>
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
    </article>
  );
}
