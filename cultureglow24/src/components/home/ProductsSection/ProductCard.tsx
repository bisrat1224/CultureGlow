import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./ProductCard.module.css";

export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  image: string;
  alt: string;
}

interface ProductCardProps {
  product: Product;
  revealDelayClass?: string;
}

// Matches index.html's <article class="bento-card"> exactly — image,
// category label, name, price, and a WhatsApp order button pre-filled
// with "I'd like to order [product name]", per the Developer Brief's
// wa.me URL format.
export function ProductCard({ product, revealDelayClass }: ProductCardProps) {
  const { category, name, price, image, alt } = product;

  return (
    <article className={`${styles.bentoCard} reveal ${revealDelayClass ?? ""}`}>
      <div className={styles.bentoCardImgWrap}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={styles.bentoCardImgEl}
        />
      </div>
      <div className={styles.bentoCardBody}>
        <p className={styles.bentoCardCat}>{category}</p>
        <h3 className={styles.bentoCardName}>{name}</h3>
        <p className={styles.bentoCardPrice}>{price}</p>
        <a
          href={buildWhatsAppLink(`I'd like to order ${name}`)}
          className={styles.btnWaCard}
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