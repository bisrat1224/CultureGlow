import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./WhatsAppStickyBar.module.css";

export function WhatsAppStickyBar() {
  return (
    <a
      href={buildWhatsAppLink()}
      className={styles.waSticky}
      aria-label="Order via WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/assets/images/img_whatsappbrandssolidfull_1.svg" alt="" />
      <span className={styles.waStickyText}>Order</span>
    </a>
  );
}