import Image from "next/image";
import styles from "./AboutGallery.module.css";
import shared from "../shared.module.css";

interface AboutGalleryProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
  };
  photos: any[];
}

export default function AboutGallery({ heading, photos }: AboutGalleryProps) {
  return (
    <section className={shared.sectionOnDark} id="gallery" aria-labelledby="about-gallery-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="about-gallery-h2"
          >
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescDark}`}>{heading.desc}</p>
        </div>

        <div className={styles.aboutGalleryGrid}>
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`${styles.aboutGalleryItem} reveal reveal-delay-${Math.min(i + 1, 3)}`}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={styles.aboutGalleryImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
