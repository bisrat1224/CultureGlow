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
}

interface ProductCardProps {
  product: Product;
  revealDelayClass?: string;
}

export function ProductCard({ product, revealDelayClass }: ProductCardProps) {
  const { category, name, price, image, alt } = product;

  return (
    <article className={`${styles.bentoCard} reveal ${revealDelayClass ?? ""}`}>
      <Link href={`/shop/${product.id}`} className={styles.cardLinkOverlay} aria-label={`View ${name}`} />
      
      <div className={styles.bentoCardImgWrap}>
        <Image
          src={image}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={styles.bentoCardImgEl}
        />
      </div>
      <div className={styles.bentoCardBody}>
        <p className={styles.bentoCardCat}>{category}</p>
        <h3 className={styles.bentoCardName}>{name}</h3>
        
        <div className={styles.bentoCardFooter}>
          <p className={styles.bentoCardPrice}>{price}</p>
          <a
            href={buildWhatsAppLink(`I'd like to order ${name}`)}
            className={`${styles.btnWaCard} cg-press`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/assets/images/img_whatsappicon.svg" alt="" width={14} height={14} />
            Order
          </a>
        </div>
      </div>
    </article>
  );
}
