import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./CateringContactCTA.module.css";
import shared from "../shared.module.css";

interface CateringContactCTAProps {
  cta: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
    primary_cta: string;
    secondary_cta: string;
  };
}

export default function CateringContactCTA({ cta }: CateringContactCTAProps) {
  return (
    <section className={shared.sectionOnCream} id="contact" aria-labelledby="catering-cta-h2">
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{cta.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="catering-cta-h2"
          >
            {cta.heading_before_em}
            <em>{cta.heading_em}</em>
            {cta.heading_after_em}
          </h2>
          <p className={shared.sectionDesc}>{cta.desc}</p>
        </div>

        <div className={`${styles.cateringCtaActions} reveal reveal-delay-2`}>
          <a
            href={buildWhatsAppLink("I would like to enquire about catering")}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {cta.primary_cta}
          </a>
          <a href="/contact" className={styles.btnGhost}>
            {cta.secondary_cta}
          </a>
        </div>
      </div>
    </section>
  );
}
