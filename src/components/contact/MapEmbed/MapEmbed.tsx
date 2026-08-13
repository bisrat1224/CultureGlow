import { contactContent } from "@/lib/content/content.contact";
import styles from "./MapEmbed.module.css";

/**
 * Plain <iframe> embed per Developer Brief §9 ("Google Maps: plain iframe
 * embed, not the JS API"). Points at the business address on Putney High St.
 */
export function MapEmbed() {
  return (
    <div className={styles.mapEmbed}>
      <iframe
        title={contactContent.map.title}
        src="https://www.google.com/maps?q=Putney+High+St%2C+London+SW15+1SN&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}