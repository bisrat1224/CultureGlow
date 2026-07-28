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
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "251900000000";


export const CONTACT_EMAIL = "hello@cultureglow24.com";

export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export type SocialLink = {
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "TikTok", href: "#" },
  { label: "Instagram", href: "#" },
];

/**
 * Builds a wa.me link, optionally pre-filling a message.
 * Matches the Developer Brief's required URL format:
 * wa.me/251[number]?text=Hi, I would like to order: [product name]
 */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
