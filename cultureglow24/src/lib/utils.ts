import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to get image URL from Payload media
export function getImageUrl(media: { url?: string; sizes?: { thumbnail?: { url?: string }; card?: { url?: string }; tablet?: { url?: string } } } | null | undefined, size?: "thumbnail" | "card" | "tablet" | "original"): string {
  if (!media) return "";
  if (size && size !== "original" && media.sizes?.[size]?.url) {
    return media.sizes[size].url;
  }
  return media.url || "";
}