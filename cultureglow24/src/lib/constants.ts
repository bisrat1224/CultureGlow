// Only keep utility functions — all content moved to Payload CMS

export function buildWhatsAppLink(message: string = "Hi! I'd like to place an order."): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "251900000000";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildGoogleMapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
