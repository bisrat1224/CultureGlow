"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import PhotoLightbox from "./PhotoLightbox";

interface GalleryPhotoGridProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
  };
  photos: any[];
}

export default function GalleryPhotoGrid({ heading, photos }: GalleryPhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  return (
    <section className="section-on-cream" id="photos" aria-labelledby="gallery-photos-h2">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="section-eyebrow">{heading.eyebrow}</p>
          <h2 className="section-title section-title-light" id="gallery-photos-h2">
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
          <p className="section-desc">{heading.desc}</p>
        </div>

        <div className="photo-grid">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              className={`photo-item reveal reveal-delay-${Math.min(i + 1, 4)}`}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${photo.alt}`}
              style={{ aspectRatio: photo.ratio || "1/1" }}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                className="photo-img"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos.map((p) => ({ src: p.image, alt: p.alt }))}
          currentIndex={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
