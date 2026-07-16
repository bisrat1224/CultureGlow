/**
 * CultureGlow24 site-wide constants.
 *
 * WHATSAPP_NUMBER is a placeholder. Per the Developer Brief's Content
 * Checklist, the real business WhatsApp number comes from the client via
 * the PM — swap it in here once received, and every button across the
 * site (header, hero, product cards, menu rows, sticky bar) updates at
 * once since they all read from this file.
 */
export const WHATSAPP_NUMBER = "251900000000";

export type NavLink = {
  href: string;
  label: string;
};

/**
 * Main navigation. About/Shop/Menu/Catering/Contact are in-page anchor
 * sections on the Home page itself (matching index.html's single-page
 * structure). Gallery is the one real separate route.
 */
export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#shop", label: "Shop" },
  { href: "#menu", label: "Menu" },
  { href: "#catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
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