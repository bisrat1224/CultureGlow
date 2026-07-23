interface ShopHeroProps {
  hero: {
    label: string;
    title: string;
    desc: string;
  };
}

export default function ShopHero({ hero }: ShopHeroProps) {
  return (
    <section className="shop-hero" aria-label="Shop hero">
      <p className="shop-hero-label">{hero.label}</p>
      <h1 className="shop-hero-title">{hero.title}</h1>
      <p className="shop-hero-desc">{hero.desc}</p>
    </section>
  );
}
