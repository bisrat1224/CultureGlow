import { buildWhatsAppLink } from "@/lib/constants";
import { FEATURED_MENU_ITEMS } from "@/lib/data/menu";
import { MenuRow } from "./MenuRow";
import styles from "./KitchenSection.module.css";
import shared from "../shared.module.css";

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

// Chunk 8: menu preview items now come from src/lib/data/menu.ts (single
// source of truth for this Home preview and the full /menu page, Chunk 14)
// instead of a local hardcoded array.
export function KitchenSection() {
  return (
    <section
      className={styles.kitchenSection}
      id="menu"
      aria-labelledby="kitchen-h2"
    >
      <div className="wrap">
        <div className={styles.kitchenLayout}>
          <div className={`${styles.kitchenHeaderCol} reveal`}>
            <p className={shared.sectionEyebrow}>From the Kitchen</p>
            <h2 className={styles.sectionH2Dark} id="kitchen-h2">
              Our <em>Signature</em>
              <br />
              Dishes
            </h2>
            <p className={styles.kitchenDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam quis nostrud exercitation.
            </p>
            <a
              href={buildWhatsAppLink()}
              className={shared.btnPrimary}
              style={{ display: "inline-flex" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/images/img_whatsappicon.svg" alt="" />
              Order
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