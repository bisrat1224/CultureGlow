import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/constants";

interface FeatureBannerProps {
  banner: {
    label: string;
    title: string;
    desc: string;
    cta: string;
  };
}

export default function FeatureBanner({ banner }: FeatureBannerProps) {
  return (
    <section className="feature-banner">
      <div className="feature-banner-inner">
        <div>
          <p className="section-label">{banner.label}</p>
          <h2 className="feature-title">{banner.title}</h2>
          <p className="feature-desc">{banner.desc}</p>
          <a
            href={buildWhatsAppLink("I would like to enquire about catering")}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            {banner.cta}
          </a>
        </div>
        <div className="feature-banner-image">
          <Image
            src="/assets/images/sharing-hands.jpg"
            alt="Habesha catering event"
            fill
            loading="lazy"
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
