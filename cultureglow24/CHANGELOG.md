# Changelog — Sushi Samba CMS Integration

## Stage 1: Payload CMS Backend Scaffolding
- Added `payload.config.ts` with Postgres adapter, Lexical editor, Cloudinary storage
- Created 13 collections: Users, Media, Products, MenuItems, MenuCategories, Testimonials, CateringPackages, EventTypes, GalleryPhotos, SocialTiles, TikTokTiles, Bundles, Milestones, Values
- Created 10 globals: SiteSettings, Navigation, Footer, SEODefaults, HomePage, AboutPage, MenuPage, CateringPage, ShopPage, GalleryPage, ContactPage
- Added Payload admin routes: `(payload)/admin`, `(payload)/api`, `(payload)/layout`
- Added `src/lib/payload.ts` shared client helper
- Updated `next.config.ts` for Payload image domains
- Updated `tsconfig.json` with Payload paths
- Added `.env.example`

## Stage 2: Seed Data
- Added `src/seed.ts` — main seed runner
- Added `src/seed/globals.ts` — seeds all 10 globals with initial content
- Added `src/seed/collections.ts` — seeds all collections with initial data
- Added `src/seed/create-user.ts` — creates default admin user

## Stage 3: Frontend Component Integration
- **Home Page**: `page.tsx` fetches from `HomePage` global; Hero, Marquee, Story, Products, Accent, Kitchen, Social, Catering, Testimonials components accept CMS data
- **About Page**: `page.tsx` fetches from `AboutPage` global; AboutHero, AboutStory, MissionValues, Milestones, AboutGallery, AboutSocialLinks components accept CMS data
- **Menu Page**: `page.tsx` fetches from `MenuPage` global + MenuItems/MenuCategories collections; MenuHero, CategoryNav, CategoryBlock, MenuRow, MainsGrid, MainsCard, FeatureBanner, HowToOrder, PdfCta components accept CMS data
- **Catering Page**: `page.tsx` fetches from `CateringPage` global + CateringPackages/EventTypes collections; CateringHero, EventTypes, Packages, EventGallery, Testimonials, ContactCTA components accept CMS data
- **Shop Page**: `page.tsx` fetches from `ShopPage` global + Products/Bundles collections; ShopHero, ScrollingBanner, FeatureBanner, Bundles, ProductGallery, HowToOrder components accept CMS data
- **Gallery Page**: `page.tsx` fetches from `GalleryPage` global + GalleryPhotos/TikTokTiles collections; GalleryHero, GalleryPhotoGrid, GalleryTikTokSection components accept CMS data
- **Contact Page**: `page.tsx` fetches from `ContactPage` global; ContactHero, ContactSection, MapEmbed components accept CMS data
- **Layout**: `layout.tsx` fetches Navigation global + SiteSettings; Header, Footer components accept CMS data
- **Shared**: `src/lib/constants.ts` updated with CMS constants; `src/lib/utils.ts` updated with CMS helpers

## Stage 4: Image Handling
- All image components use `next/image` with Cloudinary URLs from CMS
- Media collection stores Cloudinary public IDs
- Responsive image sizing with `sizes` attribute

## Stage 5: SEO Metadata
- Dynamic `generateMetadata` in all page.tsx files
- Falls back to `SEODefaults` global
- OpenGraph and Twitter card support

## Stage 6: Preview Mode
- Draft preview enabled in Payload admin
- Preview URL configuration in globals
- Unpublished changes viewable in preview mode

## Stage 7: Form Handling
- Contact form submissions stored in Payload
- Form collection with validation
- Admin notification emails

## Stage 8: Search & Filtering
- Menu search via CMS API
- Product category filtering
- Bundle filtering

## Stage 9: Caching & Performance
- ISR with `revalidate` on pages
- On-demand revalidation via webhook
- Payload data caching strategies

## Stage 10: Production Polish
- Added `src/app/loading.tsx` — global loading UI
- Added `src/app/error.tsx` — global error boundary
- Deleted old hardcoded content files:
  - `src/lib/content/content.home.ts`
  - `src/lib/content/content.about.ts`
  - `src/lib/content/content.menu.ts`
  - `src/lib/content/content.catering.ts`
  - `src/lib/content/content.shop.ts`
  - `src/lib/content/content.contact.ts`
  - `src/lib/content/content.gallery.ts`
  - `src/lib/data/menu.ts`
  - `src/lib/data/products.ts`
- Final `payload.config.ts` with production settings
