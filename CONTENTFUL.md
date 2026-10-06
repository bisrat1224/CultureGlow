# Contentful setup — CultureGlow24 (Phase 1)

Hand-holding guide. Do these steps **on your own computer** (this sandbox cannot reach Contentful).

## Phase 1 scope

| In Contentful | Still TS fallback |
|---------------|-------------------|
| Home page copy | About, Catering, Gallery, Contact pages |
| Shop page copy | |
| Menu page copy | |
| Products | |
| Menu categories + menu items | |
| Product / menu images (Assets) | |

App reads Contentful first; if missing/error → existing `src/lib/content/*` and `src/lib/data/*`.

---

## 1. Put secrets in `.env.local`

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
CONTENTFUL_SPACE_ID=xsj2p9s9e5gl
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_MANAGEMENT_TOKEN=your_cma_token
```

Use the tokens you already created. **Do not commit `.env.local`.**

**Rotate tokens** after pasting them in chat: Contentful → Settings → API keys / CMA tokens → regenerate.

---

## 2. Install packages

```bash
npm install contentful contentful-management
npm install -D tsx dotenv
```

---

## 3. Bootstrap content types (creates the model)

```bash
npx tsx scripts/contentful/bootstrap.ts
```

Safe to re-run: it skips types that already exist (or updates fields where possible).

---

## 4. Upload images + seed entries

```bash
npx tsx scripts/contentful/seed.ts
```

This:

1. Uploads images from `public/assets/images/` as Contentful Assets  
2. Creates Product + MenuItem + MenuCategory entries  
3. Creates single Home / Shop / Menu page entries from current TS copy  

Safe-ish to re-run: entries are keyed by slug / fixed IDs; duplicates are skipped when detected.

---

## 5. Run the site

```bash
npm run dev
```

Home, Shop, and Menu should load from Contentful when entries exist.

---

## 6. Edit content

Open: https://app.contentful.com → your space → Content

- **Home Page** / **Shop Page** / **Menu Page** — marketing copy  
- **Product** / **Menu Item** / **Menu Category** — catalogue  

Publish after editing. Until webhooks (Phase 2), refresh or rebuild to see changes (or restart `next dev`).

---

## Content model (Phase 1)

### `product`
| Field | Type |
|-------|------|
| slug | Short text (unique) |
| name | Short text |
| category | Short text (`HABESHA FOOD` \| `LIFESTYLE` \| `BEAUTY`) |
| price | Short text |
| description | Rich text |
| image | Media (1) |
| gallery | Media (many) |
| alt | Short text |
| badge | Short text (optional) |
| allergens | Short text, list |

### `menuItem`
| Field | Type |
|-------|------|
| slug | Short text (unique) |
| name | Short text |
| description | Rich text |
| price | Short text |
| image | Media (1) |
| alt | Short text |
| diet | Short text, list (`veg`, `vegan`, `gf`, `spicy`) |
| tag | Short text (optional) |
| categorySlug | Short text (`starters`, `mains`, …) |

### `menuCategory`
| Field | Type |
|-------|------|
| slug | Short text (unique) |
| navLabel | Short text |
| eyebrow | Short text |
| titleBeforeEm | Short text |
| titleEm | Short text |
| variant | Short text (`cream` \| `dark`) |
| countLabel | Short text |
| items | References → Menu Item (many, ordered) |

### `homePage` (one entry)
Hero, marquee, story, products section labels, accent band, kitchen, social, catering, testimonials — mostly short text; story/kitchen/catering **body** = Rich text.

### `shopPage` (one entry)
Hero, scrolling banner, feature banner, bundles labels, products section, how-to-order steps.

### `menuPage` (one entry)
Hero, feature banner, how-to-order, PDF CTA.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `CONTENTFUL_MANAGEMENT_TOKEN is missing` | Check `.env.local` |
| 401 / 403 on bootstrap | CMA token scopes: manage content types + entries + assets |
| Images 404 on site | Add `images.ctfassets.net` to `next.config.ts` `images.remotePatterns` (already done in this branch) |
| Still seeing old copy | Entry not **Published**, or missing `CONTENTFUL_SPACE_ID` / `CONTENTFUL_DELIVERY_TOKEN` |
| Fallback to TS | Expected if Contentful empty or network error |

---

## Phase 2 (later)

- About / Catering / Gallery / Contact models + seed  
- On-demand revalidation webhook  
- Draft preview mode  
- Optional UK vs Ethiopia copy fields  
