interface GalleryHeroProps {
  hero: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
  };
}

export default function GalleryHero({ hero }: GalleryHeroProps) {
  return (
    <section className="gallery-hero" aria-label="Gallery hero">
      <div className="wrap">
        <p className="gallery-hero-eyebrow">{hero.eyebrow}</p>
        <h1 className="gallery-hero-h1">
          {hero.heading_before_em}
          <em>{hero.heading_em}</em>
          {hero.heading_after_em}
        </h1>
        <p className="gallery-hero-desc">{hero.desc}</p>
      </div>
    </section>
  );
}
