"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { galleryContent } from "@/lib/content/content.gallery";
import { Lightbox } from "@/components/ui/Lightbox/Lightbox";
import styles from "./GalleryPhotoGrid.module.css";
import shared from "../shared.module.css";

// Imported directly rather than via next/dynamic: the lazy chunk meant the
// first tap paid a network round-trip before anything appeared, which with
// no press feedback read as a broken control.

export interface GalleryPhoto {
  id: string;
  image: string;
  alt: string;
}

/** Real CultureGlow24 gallery photos (client selection).
 * Allowed: wedding, aau-event, booth-3, booth-4, happy-customers-2, happy-customers-4.
 * 6 items → even 2-column grid (3 rows). booth-5 and other booth/happy shots excluded.
 */
const PHOTOS: GalleryPhoto[] = [
  {
    id: "wedding",
    image: "/assets/images/gallery/wedding.webp",
    alt: "Wedding celebration with CultureGlow24 catering",
  },
  {
    id: "aau-event",
    image: "/assets/images/gallery/aau-event.webp",
    alt: "CultureGlow24 at an AAU event",
  },
  {
    id: "booth-3",
    image: "/assets/images/gallery/booth-3.webp",
    alt: "CultureGlow24 market booth",
  },
  {
    id: "booth-4",
    image: "/assets/images/gallery/booth-4.webp",
    alt: "CultureGlow24 booth close-up",
  },
  {
    id: "happy-customers-2",
    image: "/assets/images/gallery/happy-customers-2.webp",
    alt: "Customers at a CultureGlow24 event",
  },
  {
    id: "happy-customers-4",
    image: "/assets/images/gallery/happy-customers-4.webp",
    alt: "Happy customers with CultureGlow24 dishes",
  },
];

/*
 * EXCLUDED client photos (do not use): booth-1, booth-2, booth-5,
 * happy-customers-1, happy-customers-3.
 *
 * PLACEHOLDER / STOCK (restore if needed to pad the grid):
 *   wedding-1, corporate-1, birthday-1, cultural-1, ceremony-1, corporate-3, wedding-2, ceremony-2
 *   (see git history / previous block for full Pexels URLs)
 */



export function GalleryPhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Where the tapped tile sat, so the lightbox can scale out of it.
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
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
              onClick={(e) => {
                setOriginRect(e.currentTarget.getBoundingClientRect());
                setLightboxIndex(idx);
              }}
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
        <Lightbox
          items={PHOTOS.map((p) => ({ src: p.image, alt: p.alt }))}
          index={lightboxIndex}
          originRect={originRect}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
