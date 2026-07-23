import Image from "next/image";
import styles from "./EventGallerySection.module.css";
import shared from "../shared.module.css";

interface EventGallerySectionProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
  };
  photos: any[];
}

export default function EventGallerySection({ heading, photos }: EventGallerySectionProps) {
  return (
    <section className={shared.sectionOnCream} id="gallery" aria-labelledby="catering-gallery-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="catering-gallery-h2"
          >
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
          <p className={shared.sectionDesc}>{heading.desc}</p>
        </div>

        <div className={styles.eventGalleryGrid}>
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`${styles.eventGalleryItem} reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={styles.eventGalleryImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
