"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox/Lightbox";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // Captured on click rather than read from a ref during render, so the
  // lightbox knows which box to scale out of.
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  // Keyboard handling, scroll locking and focus management all live in
  // Lightbox now; this component used to carry its own near-identical copy.
  const close = useCallback(() => setLightboxOpen(false), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  return (
    <div className={styles.gallery}>
      <button
        type="button"
        className={`${styles.mainImageWrap} cg-press-card`}
        onClick={(e) => {
          setOriginRect(e.currentTarget.getBoundingClientRect());
          setLightboxOpen(true);
        }}
        aria-label="Open full-size image"
      >
        <Image
          // Keyed so React swaps the node on change, which is what lets
          // @starting-style fire and cross-fade each switch.
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={styles.mainImage}
          style={{ objectFit: "contain", objectPosition: "center" }}
          priority
        />
      </button>

      {images.length > 1 && (
        <div className={`${styles.thumbRow} cg-hscroll`} role="group" aria-label="Product photos">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              className={`${styles.thumbBtn} ${
                i === activeIndex ? styles.thumbBtnActive : ""
              }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
              aria-pressed={i === activeIndex}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                style={{ objectFit: "contain", objectPosition: "center" }}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          items={images.map((src) => ({ src, alt }))}
          index={activeIndex}
          originRect={originRect}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}
