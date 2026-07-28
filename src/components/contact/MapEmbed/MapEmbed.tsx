import { contactContent } from "@/lib/content/content.contact";
import styles from "./MapEmbed.module.css";

/**
 * Plain <iframe> embed per Developer Brief §9 ("Google Maps: plain iframe
 * embed, not the JS API") - a generic Addis Ababa city view standing in
 * until the client supplies a fixed business address (Content Checklist,
 * still Pending). Ported one-for-one from the Kimi Agent reference
 * build's inline map markup in ContactPage.tsx, split out into its own
 * component here since the Developer Brief's Chunk 20 spec names
 * `MapEmbed.tsx` explicitly as a separate file.
 */
export function MapEmbed() {
  return (
    <div className={styles.mapEmbed}>
      <iframe
        title={contactContent.map.title}
        src="https://www.google.com/maps?q=Addis%20Ababa%2C%20Ethiopia&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
