# Contentful purge + seed (Page → content)

## Architecture
- **Page singletons** (`homePage`, `shopPage`, …): marketing texts (+ hero assets uploaded)
- **Shared catalogue**: `product`, `menuItem`, `menuCategory`, `galleryPhoto`
- **Keep**: `tiktokPost`, `instagramReel` (not deleted)

## Image subfolders
Upload resolves paths like:
- `/assets/images/shop-items/...`
- `/assets/images/menu-items/...`
- `/assets/images/gallery/...`
- `/assets/images/hero-bg-images/...`
from `public/` on disk. Asset titles use the relative path so basenames in different folders never collide.

## Steps
1. Copy both `.ts` files into `scripts/contentful/`
2. Ensure `.env.local` has SPACE_ID, ENVIRONMENT, MANAGEMENT_TOKEN
3. Purge (destructive):
   ```bash
   CONFIRM_PURGE=yes npx tsx scripts/contentful/purge-except-social.ts
   ```
4. Seed from local JSON + allow-listed gallery:
   ```bash
   npx tsx scripts/contentful/seed-from-local.ts
   ```
5. Open Contentful → Content and confirm one entry per page type, new products, 6 gallery photos, social still there.
