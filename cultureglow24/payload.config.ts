import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Products } from "./src/collections/Products";
import { MenuItems } from "./src/collections/MenuItems";
import { MenuCategories } from "./src/collections/MenuCategories";
import { Testimonials } from "./src/collections/Testimonials";
import { CateringPackages } from "./src/collections/CateringPackages";
import { EventTypes } from "./src/collections/EventTypes";
import { GalleryPhotos } from "./src/collections/GalleryPhotos";
import { SocialTiles } from "./src/collections/SocialTiles";
import { TikTokTiles } from "./src/collections/TikTokTiles";
import { Bundles } from "./src/collections/Bundles";
import { Milestones } from "./src/collections/Milestones";
import { Values } from "./src/collections/Values";

import { SiteSettings } from "./src/globals/SiteSettings";
import { Navigation } from "./src/globals/Navigation";
import { Footer } from "./src/globals/Footer";
import { SEODefaults } from "./src/globals/SEODefaults";
import { HomePage } from "./src/globals/HomePage";
import { AboutPage } from "./src/globals/AboutPage";
import { MenuPage } from "./src/globals/MenuPage";
import { CateringPage } from "./src/globals/CateringPage";
import { ShopPage } from "./src/globals/ShopPage";
import { GalleryPage } from "./src/globals/GalleryPage";
import { ContactPage } from "./src/globals/ContactPage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  editor: lexicalEditor(),
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — CultureGlow24 Admin",
      favicon: "/assets/images/logo.png",
      ogImage: "/assets/images/logo.png",
    },
    importMap: {
      baseDir: path.resolve(__dirname, "src/app/(payload)/admin"),
    },
  },
  collections: [
    Users,
    Media,
    Products,
    MenuItems,
    MenuCategories,
    Testimonials,
    CateringPackages,
    EventTypes,
    GalleryPhotos,
    SocialTiles,
    TikTokTiles,
    Bundles,
    Milestones,
    Values,
  ],
  globals: [
    SiteSettings,
    Navigation,
    Footer,
    SEODefaults,
    HomePage,
    AboutPage,
    MenuPage,
    CateringPage,
    ShopPage,
    GalleryPage,
    ContactPage,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"].filter(Boolean),
});
