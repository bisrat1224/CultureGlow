import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import type { MenuItem } from "@/lib/data/menu";
import { DIET_LEGEND } from "@/lib/data/menu";
import { DietChip } from "./DietChip";
import styles from "./MainsCard.module.css";

interface MainsCardProps {
  item: MenuItem;
}

export function MainsCard({ item }: MainsCardProps) {
  const { name, description, price, image, alt, diet, tag } = item;

  return (
    <article className={styles.mainsCard}>
      <div className={styles.mainsCardImage}>
        {tag && <span className={styles.mainsRibbon}>{tag}</span>}
        <Image
          src={image}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className={styles.mainsCardBody}>
        <h3 className={styles.mainsCardName}>{name}</h3>
        <p className={styles.mainsCardDesc}>{description}</p>
        {diet && diet.length > 0 && (
          <div className={styles.mainsCardDiet}>
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
        <div className={styles.mainsCardFooter}>
          {price ? (
            <span className={styles.mainsCardPrice}>{price}</span>
          ) : (
            <span className={styles.mainsCardPrice} style={{ opacity: 0.7, fontSize: "0.85rem" }}>See pricing above</span>
          )}
          <a
            href={buildWhatsAppLink(`I'd like to order ${name}`)}
            className={`${styles.mainsCardBtn} cg-press`}
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
