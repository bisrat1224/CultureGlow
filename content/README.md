# Local content (JSON)

**This is the source of truth for client review.** No Contentful, no backend.

Edit any file below, save, refresh the browser (`npm run dev`).

| File | What it controls |
|------|------------------|
| `products.json` | Shop products + which ones are featured on Home |
| `menu.json` | Menu categories + every dish/drink |
| `home.json` | Home page marketing copy |
| `shop.json` | Shop page marketing copy |
| `menu-page.json` | Menu page marketing copy (hero, CTAs, how-to-order) |

## Quick test for the client

1. Open `content/products.json`
2. Change a `"name"` or `"price"`
3. Save
4. Refresh `http://localhost:3000/shop`

Same idea for menu items in `content/menu.json`.

## Contentful later

When CMS access is ready, set `CONTENTFUL_ENABLED=true` in `.env.local`.
Until then, leave it `false` or unset — the app uses these JSON files only.
