interface ContactHeroProps {
  hero: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
    cta: string;
  };
}

export default function ContactHero({ hero }: ContactHeroProps) {
  return (
    <section className="contact-hero" aria-label="Contact hero">
      <div className="wrap">
        <p className="contact-hero-eyebrow">{hero.eyebrow}</p>
        <h1 className="contact-hero-h1">
          {hero.heading_before_em}
          <em>{hero.heading_em}</em>
          {hero.heading_after_em}
        </h1>
        <p className="contact-hero-desc">{hero.desc}</p>
      </div>
    </section>
  );
}
