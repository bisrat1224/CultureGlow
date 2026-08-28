/**
 * CultureGlow24 site-wide constants.
 *
 * WHATSAPP_NUMBER reads from NEXT_PUBLIC_WHATSAPP_NUMBER (see
 * .env.example / Developer Brief Section 12), falling back to the
 * existing placeholder if the env var isn't set. Must stay prefixed
 * with NEXT_PUBLIC_ - this constant is read from both Server Components
 * (ProductCard, MenuRow) and Client Components (Header),
 * and a non-prefixed var would be `undefined` in the browser bundle,
 * silently breaking every WhatsApp button rendered client-side.
 *
 * Once the client's real business number is set in Vercel's environment
 * variables, every WhatsApp button sitewide updates automatically -
 * no code change needed.
 */
// wa.me format: country code + number, no + or spaces
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447310452605";

/** Display form for contact UI (spaces for readability). */
export const UK_PHONE_DISPLAY = "+44 7310 452605";
/** E.164 for tel: links. */
export const UK_PHONE_TEL = "+447310452605";

export const CONTACT_EMAIL = "cultureglow24@gmail.com";

/**
 * Approximate centroid for the confirmed business address,
 * "Putney High St, London SW15 1SN". Street-level precision — swap for a
 * verified shopfront pin if the client provides a precise dropped-pin
 * location later.
 *
 * Lives here (not in LocationMap.tsx) because LocationMap is a "use client"
 * module: importing plain constants from a client module into a Server
 * Component doesn't give you the real value across that boundary, only a
 * client reference. ContactSection (server) and LocationMap (client) both
 * need the actual numbers, so they're defined in this boundary-free module
 * instead.
 */
export const BUSINESS_LAT = 51.4613;
export const BUSINESS_LNG = -0.2159;

export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/shop", label: "Shop" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type SocialLink = {
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "TikTok", href: "https://www.tiktok.com/@cultureglow24" },
  { label: "Instagram", href: "https://www.instagram.com/cultureglow24/" },
  { label: "Etsy", href: "https://www.etsy.com/shop/Etsycultureglow24" },
];

/**
 * Builds a wa.me link, optionally pre-filling a message.
 * Matches the Developer Brief's required URL format:
 * wa.me/[country][number]?text=Hi, I would like to order: [product name]
 */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}