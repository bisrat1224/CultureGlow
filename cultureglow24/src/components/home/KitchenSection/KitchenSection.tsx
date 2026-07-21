import { buildWhatsAppLink } from "@/lib/constants";
import { FEATURED_MENU_ITEMS } from "@/lib/data/menu";
import { homeContent } from "@/lib/content/content.home";
import { MenuRow } from "./MenuRow";
import styles from "./KitchenSection.module.css";
import shared from "../shared.module.css";

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

export function KitchenSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingSecondLine, body, cta } = homeContent.kitchen;

  return (
    <section
      className={styles.kitchenSection}
      id="menu"
      aria-labelledby="kitchen-h2"
    >
      <div className="wrap">
        <div className={styles.kitchenLayout}>
          <div className={`${styles.kitchenHeaderCol} reveal`}>
            <p className={shared.sectionEyebrow}>{eyebrow}</p>
            <h2 className={styles.sectionH2Dark} id="kitchen-h2">
              {headingBeforeEm}
              <em>{headingEm}</em>
              <br />
              {headingSecondLine}
            </h2>
            <p className={styles.kitchenDesc}>{body}</p>
            <a
              href={buildWhatsAppLink()}
              className={shared.btnPrimary}
              style={{ display: "inline-flex" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/images/img_whatsappicon.svg" alt="" />
              {cta}
            </a>
          </div>

          <div className={styles.kitchenItemsCol}>
            <div className={styles.menuList}>
              {FEATURED_MENU_ITEMS.map((item, i) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  revealDelayClass={REVEAL_DELAYS[i]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}