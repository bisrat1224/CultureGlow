import { contactContent } from "@/lib/content/content.contact";
import { CONTACT_EMAIL, UK_PHONE_TEL } from "@/lib/constants";

/**
 * Restaurant / LocalBusiness JSON-LD structured data for Google Rich Results.
 *
 * Address + coordinates use the confirmed business location
 * (Putney High St, London SW15 1SN).
 *
 * TODO(PLACEHOLDER): Opening hours specification uses client-approved placeholder
 * trading hours per 2026-08-22 instruction ("can be changed later, just assume for now").
 * Sourced directly from contactContent.hours.schedule.
 */
export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "CultureGlow24",
    description:
      "Authentic Habesha food, beauty, and lifestyle products delivered across London.",
    url: "https://cultureglow24.com",
    telephone: UK_PHONE_TEL,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Putney High St",
      addressLocality: "London",
      postalCode: "SW15 1SN",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.4613,
      longitude: -0.2159,
    },
    openingHoursSpecification: contactContent.hours.schedule.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.dayOfWeek,
      opens: item.opens,
      closes: item.closes,
    })),
    servesCuisine: "Ethiopian",
    priceRange: "££",
    image: "https://cultureglow24.com/assets/images/logo.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
