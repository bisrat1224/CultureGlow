import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";
import { homeContent } from "@/lib/content/content.home";
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
      <Image
        src="/assets/images/img_whatsappbrandssolidfull_1.svg"
        alt=""
        width={22}
        loading="lazy"
        height={22}
      />
      <span className={styles.waStickyText}>{homeContent.whatsAppStickyBar.label}</span>
    </a>
  );
}