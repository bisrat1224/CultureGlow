import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import type { MenuItem } from "@/lib/data/menu";
import { DIET_LEGEND } from "@/lib/data/menu";
import { DietChip } from "@/components/menu/DietChip";
import styles from "./KitchenCard.module.css";

interface KitchenCardProps {
  item: MenuItem;
  revealDelayClass?: string;
}

export function KitchenCard({ item, revealDelayClass }: KitchenCardProps) {
  const { name, description, image, alt, diet, tag } = item;

  return (
    <article
      className={`${styles.kitchenCard}${revealDelayClass ? ` reveal ${revealDelayClass}` : ""}`}
    >
      <div className={styles.imgWrap}>
        <Image
          src={image}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={styles.img}
        />
        {tag && <span className={styles.tag}>{tag}</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.footer}>
          {diet && diet.length > 0 ? (
            <div className={styles.dietList}>
              {diet.map((flag) => {
                const entry = DIET_LEGEND.find((d) => d.flag === flag);
                if (!entry) return null;
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
          ) : (
            <div />
          )}

          <a
            href={buildWhatsAppLink(`I'd like to order ${name}`)}
            className={`${styles.btnOrder} cg-press`}
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
