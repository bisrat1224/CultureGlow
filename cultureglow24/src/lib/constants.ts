export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "251900000000";

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