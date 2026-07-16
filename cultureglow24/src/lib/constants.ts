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
 * Main navigation. Every item is now a real routed page (not an in-page
 * anchor) — About/Shop/Menu/Catering/Contact each got their own stub
 * route, following the same pattern Gallery already used. The Home page
 * itself still contains all of index.html's sections inline (Story,
 * Featured Products, Kitchen, etc.) — this change only affects where the
 * site-wide nav sends you, not Home's own internal structure.
 */
export const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
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