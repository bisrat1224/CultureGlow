import {
  BUSINESS_ADDRESS,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  UK_PHONE_DISPLAY,
} from "@/lib/constants";
import { contactContent } from "@/lib/content/content.contact";

export const SITE_ORIGIN = "https://cultureglow24.com";

/** Markdown body for /llms.txt — keep NAP/hours in sync with JSON-LD via shared constants. */
export function buildLlmsTxt(): string {
  const hoursLines = contactContent.hours.schedule
    .map((row) => `- ${row.days}: ${row.hours}`)
    .join("\n");

  return `# ${BUSINESS_NAME}

> Authentic Habesha (Ethiopian/Eritrean) restaurant and cultural shop in Putney, London SW15. Food, coffee, beauty, lifestyle, and catering — order via WhatsApp.

Habesha cuisine and products for South West London. Primary channel: WhatsApp. Also phone, email, and in-person on Putney High Street.

## Facts

- Name: ${BUSINESS_NAME}
- Cuisine: Ethiopian, Habesha
- Address: ${BUSINESS_ADDRESS}
- Phone: ${UK_PHONE_DISPLAY}
- Email: ${CONTACT_EMAIL}
- Service area: Putney, Fulham, Wandsworth, Battersea, and neighbouring SW London (confirm postcode on WhatsApp)
- Price range: ££
- Hours:
${hoursLines}
- Note: ${contactContent.hours.note}

## Pages

- [Home](${SITE_ORIGIN}/): Overview of CultureGlow24
- [Menu](${SITE_ORIGIN}/menu): Habesha dishes, injera platters, coffee
- [Shop](${SITE_ORIGIN}/shop): Beauty and lifestyle products
- [Catering](${SITE_ORIGIN}/catering): Events, weddings, corporate catering
- [Gallery](${SITE_ORIGIN}/gallery): Photos and social highlights
- [About](${SITE_ORIGIN}/about): Story and heritage
- [Contact](${SITE_ORIGIN}/contact): Hours, map, FAQ, WhatsApp

## Optional

- [Sitemap](${SITE_ORIGIN}/sitemap.xml): Full URL list for crawlers
- [Structured data](${SITE_ORIGIN}/): Restaurant/LocalBusiness JSON-LD on every page
`;
}
