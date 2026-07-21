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
      <Link href={`/shop/${id}`} className={styles.productImage}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
        />
        {badge && (
          <span className={`${styles.productBadge} ${BADGE_CLASS[badge]}`}>
            {badge}
          </span>
        )}
      </Link>
      <Link href={`/shop/${id}`}>
        <h3 className={styles.productTitle}>{name}</h3>
      </Link>
      <p className={styles.productDesc}>{description}</p>
      <div className={styles.productFooter}>
        <span className={styles.productPrice}>{price}</span>
        <a
          href={buildWhatsAppLink(`I'd like to order ${name}`)}
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
