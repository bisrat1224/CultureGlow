# Local content (JSON)

**Fallback / seed source** when Contentful is empty, errors, or env tokens are missing.
The live site always prefers Contentful.

| File | What it controls |
|------|------------------|
| `products.json` | Shop products + which ones are featured on Home |
| `menu.json` | Menu categories + every dish/drink |
| `home.json` | Home page marketing copy |
| `shop.json` | Shop page marketing copy |
| `menu-page.json` | Menu page marketing copy (hero, CTAs, how-to-order) |

## Editing live content

Use the Contentful web app (see [CONTENTFUL.md](../CONTENTFUL.md)). Publish entries after edits.

Local JSON is still used by the seed scripts and as the offline fallback.

## Placeholders (old catalogue)

`products.json` keeps the previous 8 products under `_placeholderProducts`.
The app only reads `products` + `featuredIds`, so placeholders are inactive.
To restore one: copy it from `_placeholderProducts` into `products` and add its `id` to `featuredIds` if needed.

Gallery / catering photo grids keep the old Pexels URLs in block comments inside:
- `src/components/gallery/GalleryPhotoGrid/GalleryPhotoGrid.tsx`
- `src/components/catering/EventGallerySection/EventGallerySection.tsx`
- `src/lib/content/content.about.ts` (gallery images)
