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

/** Real CultureGlow24 gallery photos (client). Older stock placeholders kept below for easy restore. */
const PHOTOS: GalleryPhoto[] = [
  {
    id: "wedding",
    image: "/assets/images/gallery/wedding.jpeg",
    alt: "Wedding celebration with CultureGlow24 catering",
  },
  {
    id: "aau-event",
    image: "/assets/images/gallery/aau-event.jpeg",
    alt: "CultureGlow24 at an AAU event",
  },
  {
    id: "booth-1",
    image: "/assets/images/gallery/booth-1.jpeg",
    alt: "CultureGlow24 booth setup",
  },
  {
    id: "booth-2",
    image: "/assets/images/gallery/booth-2.jpeg",
    alt: "CultureGlow24 booth with products on display",
  },
  {
    id: "booth-3",
    image: "/assets/images/gallery/booth-3.jpeg",
    alt: "CultureGlow24 market booth",
  },
  {
    id: "booth-4",
    image: "/assets/images/gallery/booth-4.jpeg",
    alt: "CultureGlow24 booth close-up",
  },
  {
    id: "booth-5",
    image: "/assets/images/gallery/booth-5.jpeg",
    alt: "CultureGlow24 booth and visitors",
  },
  {
    id: "happy-customers-1",
    image: "/assets/images/gallery/happy-customers-1.jpeg",
    alt: "Happy customers enjoying CultureGlow24 food",
  },
  {
    id: "happy-customers-2",
    image: "/assets/images/gallery/happy-customers-2.jpeg",
    alt: "Customers at a CultureGlow24 event",
  },
  {
    id: "happy-customers-3",
    image: "/assets/images/gallery/happy-customers-3.jpeg",
    alt: "Guests smiling at a CultureGlow24 gathering",
  },
  {
    id: "happy-customers-4",
    image: "/assets/images/gallery/happy-customers-4.jpeg",
    alt: "Happy customers with CultureGlow24 dishes",
  },
];

/*
 * PLACEHOLDER / STOCK PHOTOS (commented out — restore if needed)
 *
 * const PHOTOS_PLACEHOLDER: GalleryPhoto[] = [
 *   {
 *     id: "wedding-1",
 *     image: "https://images.pexels.com/photos/35976293/pexels-photo-35976293.png?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Ethiopian wedding celebration at night",
 *   },
 *   {
 *     id: "corporate-1",
 *     image: "https://images.pexels.com/photos/3376765/pexels-photo-3376765.jpeg?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Banquet hall set up with round tables and floral centerpieces",
 *   },
 *   {
 *     id: "birthday-1",
 *     image: "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Elegant birthday celebration with balloons and cake",
 *   },
 *   {
 *     id: "cultural-1",
 *     image: "https://images.pexels.com/photos/20865956/pexels-photo-20865956.jpeg?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Women in colorful traditional dress at Meskel festival, Addis Ababa",
 *   },
 *   {
 *     id: "ceremony-1",
 *     image: "https://images.pexels.com/photos/17272177/pexels-photo-17272177.jpeg?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Traditional parade during a religious festival in Addis Ababa",
 *   },
 *   {
 *     id: "corporate-3",
 *     image: "https://images.pexels.com/photos/6405679/pexels-photo-6405679.jpeg?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Team celebrating together at a festive office party",
 *   },
 *   {
 *     id: "wedding-2",
 *     image: "https://images.pexels.com/photos/36005228/pexels-photo-36005228.jpeg?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Group celebrating in colorful traditional attire",
 *   },
 *   {
 *     id: "ceremony-2",
 *     image: "https://images.pexels.com/photos/19960366/pexels-photo-19960366.jpeg?auto=compress&cs=tinysrgb&w=900",
 *     alt: "Traditional attire at a religious ceremony under blue sky",
 *   },
 * ];
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
