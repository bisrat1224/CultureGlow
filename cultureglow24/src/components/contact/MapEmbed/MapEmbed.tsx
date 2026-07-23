import styles from "./MapEmbed.module.css";

export default function MapEmbed({
  title,
  embedUrl,
}: {
  title: string;
  embedUrl?: string;
}) {
  if (!embedUrl) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.mapWrapper}>
        <iframe
          src={embedUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      </div>
    </section>
  );
}