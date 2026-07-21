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
  ratio?: string; // aspect-ratio hint to vary the masonry rhythm
}

// The 8 real client-supplied photos migrated from the Kimi Agent reference
// build (app/src/assets/images/*.jpg), now served from /public/assets/
// images/ per this project's actual convention (plain <img src="/assets/
// images/...">, not a Vite asset-import registry). That reference build
// also included a 9th "logo.jpg" tile in its grid — omitted here since
// the project already has a real logo asset and a brand badge doesn't fit
// this grid's "Food, Fashion & Festivity" theme.
//
// NOTE: this is 8 photos. The Developer Brief's Content Checklist (Section
// 13) calls for a minimum of 15 gallery photos. These 8 are real assets
// (not placeholders), but the count is short of spec — flagged rather than
// padded with unrelated stock photography standing in as "real" content.
const PHOTOS: GalleryPhoto[] = [
  {
    id: "bride-henna",
    image: "/assets/images/bride-henna.jpg",
    alt: "Bride in gold-embroidered Habesha dress with henna",
    ratio: "3/4",
  },
  {
    id: "platter-big",
    image: "/assets/images/platter-big.jpg",
    alt: "Large injera platter with assorted stews",
  },
  {
    id: "dress-burgundy",
    image: "/assets/images/dress-burgundy.jpg",
    alt: "Habesha kemis with burgundy and gold tibeb embroidery",
    ratio: "3/4",
  },
  {
    id: "stew-pans",
    image: "/assets/images/stew-pans.jpg",
    alt: "Rows of dark catering pans filled with Habesha stews",
  },
  {
    id: "dress-green",
    image: "/assets/images/dress-green.jpg",
    alt: "Habesha dress with green and gold embroidery",
  },
  {
    id: "sharing-hands",
    image: "/assets/images/sharing-hands.jpg",
    alt: "Many hands sharing a communal injera platter",
  },
  {
    id: "tibs-skillet",
    image: "/assets/images/tibs-skillet.jpg",
    alt: "Sizzling beef tibs skillet with peppers",
    ratio: "3/4",
  },
  {
    id: "injera-plate",
    image: "/assets/images/injera-plate.jpg",
    alt: "Injera rolls with misir, gomen, and lentils",
  },
];

export function GalleryPhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } = galleryContent.photoGrid;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length
      ),
    []
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    []
  );

  return (
    <section
      className={shared.sectionOnCream}
      id="gallery-photos"
      aria-labelledby="masonry-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="masonry-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>{desc}</p>
        </div>

        <div className={styles.masonry}>
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.id}
              className={`${styles.masonryItem} reveal`}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open photo: ${photo.alt}`}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: photo.ratio ?? "4/3",
              }}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
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