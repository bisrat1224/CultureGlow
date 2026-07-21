"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { galleryContent } from "@/lib/content/content.gallery";
import { PhotoLightbox } from "./PhotoLightbox";
import styles from "./GalleryPhotoGrid.module.css";
import shared from "../shared.module.css";

export interface GalleryPhoto {
  id: string;
  image: string;
  alt: string;
  ratio?: string;
}

const PHOTOS: GalleryPhoto[] = [
  { id: "bride-henna", image: "/assets/images/bride-henna.jpg", alt: "Bride in gold-embroidered Habesha dress with henna", ratio: "3/4" },
  { id: "platter-big", image: "/assets/images/platter-big.jpg", alt: "Large injera platter with assorted stews" },
  { id: "dress-burgundy", image: "/assets/images/dress-burgundy.jpg", alt: "Habesha kemis with burgundy and gold tibeb embroidery", ratio: "3/4" },
  { id: "stew-pans", image: "/assets/images/stew-pans.jpg", alt: "Rows of dark catering pans filled with Habesha stews" },
  { id: "dress-green", image: "/assets/images/dress-green.jpg", alt: "Habesha dress with green and gold embroidery" },
  { id: "sharing-hands", image: "/assets/images/sharing-hands.jpg", alt: "Many hands sharing a communal injera platter" },
  { id: "tibs-skillet", image: "/assets/images/tibs-skillet.jpg", alt: "Sizzling beef tibs skillet with peppers", ratio: "3/4" },
  { id: "injera-plate", image: "/assets/images/injera-plate.jpg", alt: "Injera rolls with misir, gomen, and lentils" },
];

export function GalleryPhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } = galleryContent.photoGrid;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % PHOTOS.length), []);

  return (
    <section className={shared.sectionOnCream} id="gallery-photos" aria-labelledby="masonry-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={`${shared.sectionTitle} ${shared.onLightTitle}`} id="masonry-h2">
            {headingBeforeEm}<em>{headingEm}</em>{headingAfterEm}
          </h2>
          <p className={shared.sectionDesc}>{desc}</p>
        </div>

        <div className={styles.masonry}>
          {PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              className={styles.masonryItem}
              onClick={() => setLightboxIndex(idx)}
              aria-label={`Open lightbox: ${photo.alt}`}
              style={{ aspectRatio: photo.ratio || "4/3" }}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                width={600}
                height={photo.ratio === "3/4" ? 800 : 450}
                loading="lazy"
                className={styles.masonryImg}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={PHOTOS}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}