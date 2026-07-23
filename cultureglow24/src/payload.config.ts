import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { payloadCloudinary } from "payload-cloudinary";
import path from "path";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { MenuItems } from "./collections/MenuItems";
import { MenuCategories } from "./collections/MenuCategories";
import { Testimonials } from "./collections/Testimonials";
import { CateringPackages } from "./collections/CateringPackages";
import { EventTypes } from "./collections/EventTypes";
import { GalleryPhotos } from "./collections/GalleryPhotos";
import { SocialTiles } from "./collections/SocialTiles";
import { TikTokTiles } from "./collections/TikTokTiles";
import { Bundles } from "./collections/Bundles";
import { Milestones } from "./collections/Milestones";
import { Values } from "./collections/Values";

import { SiteSettings } from "./globals/SiteSettings";
import { Navigation } from "./globals/Navigation";
import { Footer } from "./globals/Footer";
import { SEODefaults } from "./globals/SEODefaults";
import { HomePage } from "./globals/HomePage";
import { AboutPage } from "./globals/AboutPage";
import { MenuPage } from "./globals/MenuPage";
import { CateringPage } from "./globals/CateringPage";
import { ShopPage } from "./globals/ShopPage";
import { GalleryPage } from "./globals/GalleryPage";
import { ContactPage } from "./globals/ContactPage";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  editor: lexicalEditor(),
  email: nodemailerAdapter({
    defaultFromAddress: "hello@cultureglow24.com",
    defaultFromName: "CultureGlow24",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — CultureGlow24 Admin",
      favicon: "/assets/images/logo.png",
      ogImage: "/assets/images/logo.png",
    },
    components: {
      graphics: {
        Logo: "@/components/admin/Logo",
        Icon: "@/components/admin/Icon",
      },
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
  plugins: [
    payloadCloudinary({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
      apiKey: process.env.CLOUDINARY_API_KEY || "",
      apiSecret: process.env.CLOUDINARY_API_SECRET || "",
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || "",
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"].filter(Boolean),
});