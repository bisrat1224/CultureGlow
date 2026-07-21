import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import type { MenuItem } from "@/lib/data/menu";
import { DIET_LEGEND } from "@/lib/data/menu";
import { DietChip } from "./DietChip";
import styles from "./MenuRow.module.css";

interface MenuRowProps {
  item: MenuItem;
}

export function MenuRow({ item }: MenuRowProps) {
  const { name, description, price, image, alt, diet, tag } = item;

  return (
    <article className={styles.menuRow}>
      <div className={styles.menuRowImgWrap}>
        <Image
          src={image}
          alt={alt}
          width={88}
          height={88}
          className={styles.menuRowImg}
        />
        {tag && <span className={styles.menuRowTag}>{tag}</span>}
      </div>

      <div className={styles.menuRowInfo}>
        <h3 className={styles.menuRowName}>{name}</h3>
        <p className={styles.menuRowDesc}>{description}</p>
        {diet && diet.length > 0 && (
          <div className={styles.menuRowDiet}>
            {diet.map((flag) => {
              const entry = DIET_LEGEND.find((d) => d.flag === flag)!;
              return (
                <DietChip
                  key={flag}
                  flag={flag}
                  chipLabel={entry.chipLabel}
                  title={entry.label}
                />
              );
            })}
          </div>
        )}
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
