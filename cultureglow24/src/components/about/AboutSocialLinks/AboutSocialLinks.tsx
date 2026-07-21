import Image from "next/image";
import { aboutContent } from "@/lib/content/content.about";
import styles from "./AboutGallery.module.css";
import shared from "../../home/shared.module.css";

export function AboutGallery() {
  const { eyebrow, headingBeforeEm, headingEm, images } = aboutContent.gallery;

  return (
    <section className={styles.gallerySection} aria-labelledby="about-gallery-h2">
      <div className="wrap">
        <div className={`${styles.galleryHeader} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.galleryH2} id="about-gallery-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
          </h2>
        </div>

        <div className={styles.galleryGrid}>
          {images.map((img, i) => (
            <div key={img.src + i} className={`${styles.galleryTile} reveal`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={styles.galleryImgEl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}