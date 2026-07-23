import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./ProductCard.module.css";

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    alt: string;
    badge?: string;
    category?: string;
  };
  revealDelayClass?: string;
}

const BADGE_CLASS: Record<string, string> = {
  "Best Seller": styles.badgeDefault,
  Popular: styles.badgeDefault,
  Gift: styles.badgeDefault,
  New: styles.badgeNew,
};

export default function ProductCard({ product, revealDelayClass = "" }: ProductCardProps) {
  return (
    <article className={`${styles.productCard} reveal ${revealDelayClass}`}>
      <Link href={`/shop/${product.id}`} className={styles.productImage}>
        <Image
          src={product.image}
          alt={product.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
        />
        {product.badge && (
          <span className={`${styles.productBadge} ${BADGE_CLASS[product.badge] || styles.badgeDefault}`}>
            {product.badge}
          </span>
        )}
      </Link>
      <Link href={`/shop/${product.id}`}>
        <h3 className={styles.productTitle}>{product.name}</h3>
      </Link>
      <p className={styles.productDesc}>{product.description}</p>
      <div className={styles.productFooter}>
        <span className={styles.productPrice}>{product.price}</span>
        <a
          href={buildWhatsAppLink(`I'd like to order ${product.name}`)}
          className={styles.productOrderBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/images/img_whatsappicon.svg" alt="" />
          Order
        </a>
      </div>
    </article>
  );
}
