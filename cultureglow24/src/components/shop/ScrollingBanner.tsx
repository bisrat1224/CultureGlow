interface ScrollingBannerProps {
  items?: { text: string }[];
}

export default function ScrollingBanner({ items }: ScrollingBannerProps) {
  const defaultItems = [
    "CULTUREGLOW24",
    "AUTHENTIC HABESHA FLAVORS",
    "ORDER VIA WHATSAPP",
    "DELIVERED FRESH",
  ];

  const texts = items?.map((i) => i.text) || defaultItems;
  const doubled = [...texts, ...texts];

  return (
    <div className="scrolling-banner" aria-hidden="true">
      <div className="banner-content">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="banner-text">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
