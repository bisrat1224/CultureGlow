import Image from "next/image";
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

export function MenuRow({ item, revealDelayClass }: MenuRowProps) {
  const { name, description, price, image, alt } = item;

  return (
    <article className={`${styles.menuRow} reveal ${revealDelayClass ?? ""}`}>
      <Image
        src={image}
        alt={alt}
        width={80}
        height={80}
        loading="lazy"
        className={styles.menuRowImg}
      />
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
          <Image src="/assets/images/img_whatsappicon.svg" alt="" width={14} height={14} />
          Order
        </a>
      </div>
    </article>
  );
}