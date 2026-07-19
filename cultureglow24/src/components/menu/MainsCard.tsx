import { buildWhatsAppLink } from "@/lib/constants";
import type { MainsItem } from "@/lib/data/menu";
import { DIET_LEGEND } from "@/lib/data/menu";
import { DietChip } from "./DietChip";
import styles from "./MainsCard.module.css";

interface MainsCardProps {
  item: MainsItem;
}

export function MainsCard({ item }: MainsCardProps) {
  const { name, description, price, image, alt, diet, ribbon } = item;

  return (
    <article className={styles.mainsCard}>
      <div className={styles.mainsCardImage}>
        {ribbon && <span className={styles.mainsRibbon}>{ribbon}</span>}
        <img src={image} alt={alt} loading="lazy" />
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
          <span className={styles.mainsCardPrice}>{price}</span>
          <a
            href={buildWhatsAppLink(`I'd like to order ${name}`)}
            className={styles.mainsCardBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            Order
          </a>
        </div>
      </div>
    </article>
  );
}
