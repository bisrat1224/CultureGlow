import { MessageCircle, Phone, Mail } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/constants";

interface ContactSectionProps {
  methods: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    desc: string;
    whatsapp_label: string;
    whatsapp_value: string;
    phone_label: string;
    email_label: string;
    social_label: string;
  };
  siteSettings: {
    whatsapp_number?: string;
    contact_email?: string;
    phone?: string;
    phone_tel?: string;
    social_links?: { label: string; href: string }[];
  };
}

export default function ContactSection({ methods, siteSettings }: ContactSectionProps) {
  const contactEmail = siteSettings.contact_email || "hello@cultureglow24.com";
  const phoneDisplay = siteSettings.phone || "+44 20 7946 0321";
  const phoneTel = siteSettings.phone_tel || "+442079460321";

  return (
    <section className="section-on-cream" id="contact-hub" aria-labelledby="contact-h2">
      <div className="wrap">
        <div className="section-head-centered reveal">
          <p className="section-eyebrow">{methods.eyebrow}</p>
          <h2 className="section-title section-title-light" id="contact-h2">
            {methods.heading_before_em}
            <em>{methods.heading_em}</em>
            {methods.heading_after_em}
          </h2>
          <p className="section-desc">{methods.desc}</p>
        </div>

        <div className="contact-methods">
          <a href={buildWhatsAppLink()} className="contact-method reveal reveal-delay-1" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="contact-icon" />
            <div>
              <p className="contact-label">{methods.whatsapp_label}</p>
              <p className="contact-value">{methods.whatsapp_value}</p>
            </div>
          </a>

          <a href={`tel:${phoneTel}`} className="contact-method reveal reveal-delay-2">
            <Phone className="contact-icon" />
            <div>
              <p className="contact-label">{methods.phone_label}</p>
              <p className="contact-value">{phoneDisplay}</p>
            </div>
          </a>

          <a href={`mailto:${contactEmail}`} className="contact-method reveal reveal-delay-3">
            <Mail className="contact-icon" />
            <div>
              <p className="contact-label">{methods.email_label}</p>
              <p className="contact-value">{contactEmail}</p>
            </div>
          </a>

          <div className="contact-method reveal reveal-delay-4">
            <div className="contact-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.5rem" }}>@</span>
            </div>
            <div>
              <p className="contact-label">{methods.social_label}</p>
              <div className="social-links">
                {siteSettings.social_links?.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
