
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import type { HomeContent } from "@/lib/content/content.home";
import type { MenuItem } from "@/lib/data/menu";
import { COMBO_PRICING } from "@/lib/data/menu";
import { KitchenCard } from "./KitchenCard";
import styles from "./KitchenSection.module.css";
import shared from "../shared.module.css";

interface Props {
  home: HomeContent["kitchen"];
  items: MenuItem[];
}

export function KitchenSection({ home, items }: Props) {
  const { eyebrow, headingBeforeEm, headingEm, headingSecondLine, body, cta } = home;

  return (
    <section
      className={styles.section}
      id="menu"
      aria-labelledby="kitchen-h2"
    >
      <div className="wrap">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.heading} id="kitchen-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingSecondLine && <> {headingSecondLine}</>}
          </h2>
          <p className={styles.desc}>{body}</p>
        </div>

        {/* 2-column dish grid */}
        <div className={styles.grid}>
          {items.map((item, i) => (
            <KitchenCard
              key={item.id}
              item={item}
              revealDelayClass={i < 6 ? `reveal-delay-${i + 1}` : undefined}
            />
          ))}
        </div>

        {/* Combo pricing as an inline strip, not a card */}
        {COMBO_PRICING.length > 0 && (
          <div className={`${styles.comboStrip} reveal`}>
            {COMBO_PRICING.map((tier) => (
              <div key={tier.label} className={styles.comboItem}>
                <span className={styles.comboLabel}>{tier.label}</span>
                <span className={styles.comboPrice}>{tier.price}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA row */}
        <div className={`${styles.ctaRow} reveal`}>
          <a
            href={buildWhatsAppLink("I'd like to order from the kitchen mains selection")}
            className={`${shared.btnPrimary} cg-press`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {cta}
          </a>
          <Link href="/menu" className={styles.menuLink}>
            Full Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
