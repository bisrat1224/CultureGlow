# CultureGlow24 — Admin CMS

A Next.js 16 + Payload CMS 3.0 headless CMS for CultureGlow24, a Habesha food, beauty, and lifestyle brand.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Payload 3.0
- **Database**: PostgreSQL (Neon)
- **Auth**: Payload built-in authentication
- **Styling**: CSS Modules + Tailwind CSS v4
- **Media**: Local storage (Cloudinary-ready)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Neon connection string

# 3. Generate Payload types
npm run generate:types

# 4. Run database migrations
npm run migrate

# 5. Seed the database
npx tsx src/seed.ts

# 6. Create admin user
npx tsx src/seed/create-user.ts

# 7. Start development server
npm run dev
```

## Admin Panel

Navigate to `http://localhost:3000/admin`

Default credentials:
- Email: `owner@cultureglow24.com`
- Password: `ChangeMe123!`

**Change this password immediately after first login.**

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (payload)/          # Payload admin + API routes
│   ├── api/                # Custom API routes
│   └── [page]/page.tsx     # Page components (Server Components)
├── collections/            # Payload collections (database tables)
├── globals/                # Payload globals (single-document configs)
├── components/             # React components
├── lib/
│   ├── cms/                # CMS data fetching helpers
│   ├── content/            # Fallback content (hardcoded)
│   ├── data/               # Fallback data (hardcoded)
│   ├── cloudinary.ts       # Cloudinary integration stub
│   ├── cache.ts            # Query caching layer
│   └── payload.ts          # Payload client singleton
├── seed/                   # Database seed scripts
└── hooks/                  # React hooks
```

## CMS Collections

| Collection | Description | Managed Content |
|------------|-------------|-----------------|
| `users` | Admin users | Auth, roles |
| `media` | Uploaded images | Alt text, captions |
| `products` | Shop products | Name, price, category, images, WhatsApp message |
| `menu_items` | Menu dishes | Name, price, category, diet flags, tags |
| `menu_categories` | Menu sections | Starters, Mains, etc. |
| `testimonials` | Customer reviews | Quote, name, location, type (home/catering) |
| `catering_packages` | Catering tiers | Name, guests, price, features |
| `event_types` | Event categories | Weddings, Corporate, etc. |
| `gallery_photos` | Gallery images | Image, alt, ratio |
| `social_tiles` | Social media tiles | Platform, color, caption |
| `tiktok_tiles` | TikTok embeds | Color, caption |
| `bundles` | Gift bundles | Label, title, price, image |
| `milestones` | About timeline | Year, label |
| `values` | Mission values | Title, body |

## CMS Globals

| Global | Description |
|--------|-------------|
| `site_settings` | Brand name, contact info, social links, GA ID |
| `navigation` | Header navigation links |
| `footer` | Footer columns, tagline, copyright |
| `seo_defaults` | Default meta tags, OG images, Twitter cards |
| `home_page` | Home page all sections |
| `about_page` | About page all sections |
| `menu_page` | Menu page all sections |
| `catering_page` | Catering page all sections |
| `shop_page` | Shop page all sections |
| `gallery_page` | Gallery page all sections |
| `contact_page` | Contact page all sections |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run payload` | Payload CLI |
| `npm run generate:types` | Generate TypeScript types from schemas |
| `npm run generate:importmap` | Generate admin import map |
| `npm run migrate` | Run database migrations |
| `npx tsx src/seed.ts` | Seed database with content |
| `npx tsx src/seed/create-user.ts` | Create admin user |

## Cloudinary Integration (Optional)

To enable Cloudinary for media storage:

1. Add credentials to `.env.local`:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   CLOUDINARY_UPLOAD_PRESET=your-upload-preset
   ```

2. Replace the stub implementations in `src/lib/cloudinary.ts`

3. Update `src/collections/Media.ts` to use Cloudinary storage adapter

## Architecture Decisions

### Why Payload CMS?
- Native Next.js integration (same codebase)
- TypeScript-first
- Built-in authentication
- Flexible content modeling
- Self-hosted (no vendor lock-in)

### Why PostgreSQL (Neon)?
- Serverless scaling
- Branching for dev/staging
- Connection pooling
- Cost-effective for small projects

### Content Fallback Strategy
All components accept CMS data via props. If CMS data is unavailable:
- Components use sensible defaults
- Hardcoded content files in `src/lib/content/` serve as reference
- Error boundaries prevent total page failure

### Caching Strategy
- In-memory query cache with stale-while-revalidate
- 30s fresh TTL, 2min stale TTL
- On-demand revalidation via `/api/revalidate` webhook
