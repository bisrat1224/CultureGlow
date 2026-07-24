import { buildWhatsAppLink } from "@/lib/constants";
import { MenuRow } from "./MenuRow";
import styles from "./KitchenSection.module.css";
import shared from "../shared.module.css";

interface KitchenSectionProps {
  kitchen: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_second_line: string;
    body: string;
    cta: string;
  };
}

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

const FEATURED_MENU_ITEMS = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Slow-simmered chicken in a rich berbere sauce with hard-boiled egg.",
    price: "£520",
    image: "/assets/images/stew-pans.jpg",
    alt: "Doro Wat",
    diet: ["spicy"] as string[],
  },
  {
    id: "injera-platter",
    name: "Injera Platter",
    description: "A generous platter of injera paired with a rotating selection of stews.",
    price: "£450",
    image: "/assets/images/injera-plate.jpg",
    alt: "Injera Platter",
    diet: ["veg", "vegan"] as string[],
  },
  {
    id: "tibs",
    name: "Injera with Tibs",
    description: "Pan-seared beef tibs tossed with onion, garlic, and rosemary.",
    price: "£450",
    image: "/assets/images/tibs-skillet.jpg",
    alt: "Injera with Tibs",
    diet: ["spicy"] as string[],
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu Platter",
    description: "A vegan combination platter of lentils, split peas, and seasonal vegetables.",
    price: "£620",
    image: "/assets/images/platter-big.jpg",
    alt: "Beyaynetu Platter",
    diet: ["veg", "vegan"] as string[],
  },
];

export default function KitchenSection({ kitchen }: KitchenSectionProps) {
  return (
    <section
      className={styles.kitchenSection}
      id="menu"
      aria-labelledby="kitchen-h2"
    >
      <div className="wrap">
        <div className={styles.kitchenLayout}>
          <div className={`${styles.kitchenHeaderCol} reveal`}>
            <p className={shared.sectionEyebrow}>{kitchen.eyebrow}</p>
            <h2 className={styles.sectionH2Dark} id="kitchen-h2">
              {kitchen.heading_before_em}
              <em>{kitchen.heading_em}</em>
              <br />
              {kitchen.heading_second_line}
            </h2>
            <p className={styles.kitchenDesc}>{kitchen.body}</p>
            <a
              href={buildWhatsAppLink()}
              className={shared.btnPrimary}
              style={{ display: "inline-flex" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/images/img_whatsappicon.svg" alt="" />
              {kitchen.cta}
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
