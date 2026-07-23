interface GalleryTikTokSectionProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
  };
  tiles: any[];
}

export default function GalleryTikTokSection({ heading, tiles }: GalleryTikTokSectionProps) {
  return (
    <section className="section-on-dark" id="tiktok" aria-labelledby="tiktok-h2">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="section-eyebrow">{heading.eyebrow}</p>
          <h2 className="section-title section-title-dark" id="tiktok-h2">
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
          <p className="section-desc section-desc-dark">{heading.desc}</p>
        </div>

        <div className="tiktok-grid">
          {tiles.map((tile, i) => (
            <div
              key={tile.id}
              className={`tiktok-tile reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{ backgroundColor: getColor(tile.color) }}
            >
              <p className="tiktok-caption">{tile.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getColor(color: string): string {
  const colors: Record<string, string> = {
    a: "#1a1a2e",
    b: "#16213e",
    c: "#0f3460",
  };
  return colors[color] || colors.a;
}
