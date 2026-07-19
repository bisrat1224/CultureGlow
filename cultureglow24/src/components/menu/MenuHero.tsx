import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./MenuHero.module.css";

export function MenuHero() {
  return (
    <section className={styles.menuHero} aria-label="Menu hero">
      <img
        src="/assets/images/pexels-dbaler-17486836.jpg"
        alt="Injera platter with assorted stews"
        className={styles.menuHeroImg}
      />
      <div className={`${styles.menuHeroBody} wrap`}>
        <p className={styles.menuHeroEyebrow}>The Full Menu</p>
        <h1 className={styles.menuHeroH1}>
          Every <em>Dish</em>, Every Category
        </h1>
        <p className={styles.menuHeroDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={styles.menuHeroActions}>
          <a
            href={buildWhatsAppLink()}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            Order
          </a>
          <a href="#mains" className={styles.btnGhostLight}>
            See Signature Dishes
          </a>
        </div>
      </div>
    </section>
  );
}
