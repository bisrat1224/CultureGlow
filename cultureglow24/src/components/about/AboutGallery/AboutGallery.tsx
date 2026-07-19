
import Image from "next/image";
import styles from "./AboutGallery.module.css";
import shared from "../../home/shared.module.css";


const GALLERY_IMAGES = [
  { src: "/assets/images/pexels-berlinerlights-23858842.jpg", alt: "Lorem ipsum placeholder photo" },
  { src: "/assets/images/pexels-dbaler-17486836.jpg", alt: "Lorem ipsum placeholder photo" },
  { src: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg", alt: "Lorem ipsum placeholder photo" },
  { src: "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg", alt: "Lorem ipsum placeholder photo" },
  { src: "/assets/images/istockphoto-452732099-612x612.jpg", alt: "Lorem ipsum placeholder photo" },
  { src: "/assets/images/istockphoto-908729848-612x612.jpg", alt: "Lorem ipsum placeholder photo" },
];

export function AboutGallery() {
  return (
    <section className={styles.gallerySection} aria-labelledby="about-gallery-h2">
      <div className="wrap">
        <div className={`${styles.galleryHeader} reveal`}>
          <p className={shared.sectionEyebrow}>In Pictures</p>
          <h2 className={styles.galleryH2} id="about-gallery-h2">
            Moments We <em>Cherish</em>
          </h2>
        </div>

        <div className={styles.galleryGrid}>
          {GALLERY_IMAGES.map((img, i) => (
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
