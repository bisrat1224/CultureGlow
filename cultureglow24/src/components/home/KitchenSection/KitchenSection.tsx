import { buildWhatsAppLink } from "@/lib/constants";
import { MenuRow, type MenuItem } from "./MenuRow";
import styles from "./KitchenSection.module.css";
import shared from "../shared.module.css";

// The 4 dishes, in index.html's exact order. Menu items (up to 30) is a
// Pending item on the Developer Brief's Content Checklist — these are the
// specific 4 index.html already ships with, kept verbatim.
const MENU_ITEMS: MenuItem[] = [
  {
    id: "injera-tibs",
    name: "Injera with Tibs",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 380",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Injera with stews",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 520",
    image: "/assets/images/pexels-dbaler-17486836.jpg",
    alt: "Doro Wat",
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 340",
    image: "/assets/images/istockphoto-452732099-612x612.jpg",
    alt: "Beyaynetu",
  },
  {
    id: "family-sharing-platter",
    name: "Family Sharing Platter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    price: "ETB 460",
    image: "/assets/images/istockphoto-908729848-612x612.jpg",
    alt: "Family sharing platter",
  },
];

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

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
              {MENU_ITEMS.map((item, i) => (
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