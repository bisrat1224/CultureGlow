import {
  BUSINESS_ADDRESS,
  BUSINESS_LAT,
  BUSINESS_LNG,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  UK_PHONE_TEL,
} from "@/lib/constants";
import { contactContent } from "@/lib/content/content.contact";

type StructuredDataProps = {
  telephone?: string;
  email?: string;
  address?: string;
};

/**
 * Restaurant / LocalBusiness JSON-LD for Google Rich Results.
 * NAP should match footer + contact (pass CMS settings when available).
 */
export function StructuredData({
  telephone,
  email,
  address = BUSINESS_ADDRESS,
}: StructuredDataProps) {
  const tel =
    telephone && !telephone.startsWith("+")
      ? `+${telephone}`
      : telephone || UK_PHONE_TEL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    name: BUSINESS_NAME,
    description:
      "Authentic Habesha food, beauty, and lifestyle products delivered across London. Ethiopian restaurant and cultural shop in Putney, SW15.",
    url: "https://cultureglow24.com",
    telephone: tel,
    email: email || CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.split(",")[0]?.trim() || "Putney High St",
      addressLocality: "London",
      postalCode: "SW15 1SN",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_LAT,
      longitude: BUSINESS_LNG,
    },
    openingHoursSpecification: contactContent.hours.schedule.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.dayOfWeek,
      opens: item.opens,
      closes: item.closes,
    })),
    servesCuisine: ["Ethiopian", "Habesha"],
    priceRange: "££",
    image: "https://cultureglow24.com/og-default.jpg",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS_LAT,
        longitude: BUSINESS_LNG,
      },
      geoRadius: "15000",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
