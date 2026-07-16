import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./MenuRow.module.css";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

interface MenuRowProps {
  item: MenuItem;
  revealDelayClass?: string;
}

// Matches index.html's <article class="menu-row"> exactly — dish photo,
// name, description, price, and a WhatsApp order button pre-filled with
// "I'd like to order [dish name]", same wa.me format ProductCard uses.
export function MenuRow({ item, revealDelayClass }: MenuRowProps) {
  const { name, description, price, image, alt } = item;

  return (
    <article className={`${styles.menuRow} reveal ${revealDelayClass ?? ""}`}>
      <img src={image} alt={alt} className={styles.menuRowImg} />
      <div className={styles.menuRowInfo}>
        <h3 className={styles.menuRowName}>{name}</h3>
        <p className={styles.menuRowDesc}>{description}</p>
      </div>
      <div className={styles.menuRowRight}>
        <span className={styles.menuRowPrice}>{price}</span>
        <a
          href={buildWhatsAppLink(`I'd like to order ${name}`)}
          className={styles.menuRowBtn}
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