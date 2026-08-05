"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { galleryContent } from "@/lib/content/content.gallery";
import styles from "./GalleryPhotoGrid.module.css";
import shared from "../shared.module.css";

const PhotoLightbox = dynamic(() => import("./PhotoLightbox").then((m) => m.PhotoLightbox), { ssr: false });

export interface GalleryPhoto {
  id: string;
  image: string;
  alt: string;
}

/** Catering event moments — same source set as EventGallerySection */
const PHOTOS: GalleryPhoto[] = [
  {
    id: "wedding-1",
    image:
      "https://images.pexels.com/photos/35976293/pexels-photo-35976293.png?auto=compress&cs=tinysrgb&w=900",
    alt: "Ethiopian wedding celebration at night",
  },
  {
    id: "corporate-1",
    image:
      "https://images.pexels.com/photos/3376765/pexels-photo-3376765.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Banquet hall set up with round tables and floral centerpieces",
  },
  {
    id: "birthday-1",
    image:
      "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Elegant birthday celebration with balloons and cake",
  },
  {
    id: "cultural-1",
    image:
      "https://images.pexels.com/photos/20865956/pexels-photo-20865956.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Women in colorful traditional dress at Meskel festival, Addis Ababa",
  },
  {
    id: "ceremony-1",
    image:
      "https://images.pexels.com/photos/17272177/pexels-photo-17272177.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Traditional parade during a religious festival in Addis Ababa",
  },
  {
    id: "corporate-3",
    image:
      "https://images.pexels.com/photos/6405679/pexels-photo-6405679.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Team celebrating together at a festive office party",
  },
  {
    id: "wedding-2",
    image:
      "https://images.pexels.com/photos/36005228/pexels-photo-36005228.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Group celebrating in colorful traditional attire",
  },
  {
    id: "ceremony-2",
    image:
      "https://images.pexels.com/photos/19960366/pexels-photo-19960366.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Traditional attire at a religious ceremony under blue sky",
  },
];

export function GalleryPhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } = galleryContent.photoGrid;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    []
  );

  return (
    <section className={shared.sectionOnCream} id="gallery-photos" aria-labelledby="masonry-h2">
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={`${shared.sectionTitle} ${shared.sectionTitleLight}`} id="masonry-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>{desc}</p>
        </div>

        <div className={styles.photoGrid}>
          {PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              className={`${styles.photoItem} cg-press-card`}
              onClick={() => setLightboxIndex(idx)}
              aria-label={`Open lightbox: ${photo.alt}`}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                loading="lazy"
                className={styles.photoImg}
                sizes="(min-width: 640px) 50vw, 100vw"
                quality={85}
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
