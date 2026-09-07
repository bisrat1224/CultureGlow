import { createClient } from "contentful-management";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

async function run() {
  const space = await client.getSpace(SPACE_ID as string);
  const environment = await space.getEnvironment(ENVIRONMENT);

  console.log(`Bootstrapping Contentful models in space '${SPACE_ID}', environment '${ENVIRONMENT}'...`);

  // 1. GLOBAL SETTINGS
  await createOrUpdateContentType(environment, "globalSettings", "Global Settings", "Global store information like contact info and social links.", [
    { id: "email", name: "Email Address", type: "Symbol" },
    { id: "whatsappNumber", name: "WhatsApp Number", type: "Symbol" },
    { id: "physicalAddress", name: "Physical Address", type: "Symbol" },
    { id: "openingHours", name: "Opening Hours", type: "Text" },
    { id: "instagramUrl", name: "Instagram URL", type: "Symbol" },
    { id: "tiktokUrl", name: "TikTok URL", type: "Symbol" },
    { id: "etsyUrl", name: "Etsy URL", type: "Symbol" },
  ], "email");

  // 2. SHOP PRODUCT
  await createOrUpdateContentType(environment, "shopProduct", "Shop Product", "Inventory items for the Shop page.", [
    { id: "slug", name: "Slug (URL identifier)", type: "Symbol", required: true },
    { id: "name", name: "Product Name", type: "Symbol", required: true },
    { id: "category", name: "Category", type: "Symbol", validations: [{ in: ["HABESHA FOOD", "LIFESTYLE", "BEAUTY"] }] },
    { id: "price", name: "Price", type: "Symbol" },
    { id: "description", name: "Description", type: "Text" },
    { id: "badge", name: "Badge (Optional)", type: "Symbol" },
    { id: "image", name: "Main Image", type: "Link", linkType: "Asset" },
    { id: "gallery", name: "Product Gallery", type: "Array", items: { type: "Link", linkType: "Asset" } },
    { id: "seoTitle", name: "SEO Title", type: "Symbol" },
    { id: "seoDescription", name: "SEO Description", type: "Text" },
    { id: "seoImage", name: "SEO Image (OG)", type: "Link", linkType: "Asset" },
  ], "name");

  // 3. MENU ITEM
  await createOrUpdateContentType(environment, "menuItem", "Menu Item", "Food and drink items for the Menu.", [
    { id: "slug", name: "Slug", type: "Symbol", required: true },
    { id: "name", name: "Dish Name", type: "Symbol", required: true },
    { id: "price", name: "Price", type: "Symbol" },
    { id: "description", name: "Description", type: "Text" },
    { id: "dietaryTags", name: "Dietary Tags", type: "Array", items: { type: "Symbol", validations: [{ in: ["veg", "vegan", "gf", "spicy"] }] } },
    { id: "allergens", name: "Allergens", type: "Array", items: { type: "Symbol" } },
    { id: "image", name: "Image", type: "Link", linkType: "Asset" },
    { id: "seoTitle", name: "SEO Title", type: "Symbol" },
    { id: "seoDescription", name: "SEO Description", type: "Text" },
    { id: "seoImage", name: "SEO Image (OG)", type: "Link", linkType: "Asset" },
  ], "name");

  // 4. MENU CATEGORY
  await createOrUpdateContentType(environment, "menuCategory", "Menu Category", "Groups of menu items (e.g., Starters, Mains).", [
    { id: "slug", name: "Slug", type: "Symbol", required: true },
    { id: "name", name: "Category Name", type: "Symbol", required: true },
    { id: "navLabel", name: "Navigation Label", type: "Symbol" },
    { id: "eyebrow", name: "Eyebrow", type: "Symbol" },
    { id: "titleBeforeEm", name: "Title (Before Em)", type: "Symbol" },
    { id: "titleEm", name: "Title (Emphasized)", type: "Symbol" },
    { id: "variant", name: "Variant", type: "Symbol", validations: [{ in: ["cream", "dark"] }] },
    { id: "countLabel", name: "Count Label", type: "Symbol" },
    { id: "items", name: "Menu Items", type: "Array", items: { type: "Link", linkType: "Entry", validations: [{ linkContentType: ["menuItem"] }] } },
  ], "name");

  // 5. TESTIMONIAL
  await createOrUpdateContentType(environment, "testimonial", "Testimonial", "Customer reviews.", [
    { id: "customerName", name: "Customer Name", type: "Symbol", required: true },
    { id: "quote", name: "Quote", type: "Text" },
    { id: "rating", name: "Rating (1-5)", type: "Integer", validations: [{ range: { min: 1, max: 5 } }] },
    { id: "source", name: "Source", type: "Symbol" },
  ], "customerName");

  // 6. HOME PAGE
  await createOrUpdateContentType(environment, "pageHome", "Home Page", "Content for the home page.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "heroHeading", name: "Main Heading", type: "Symbol" },
    { id: "heroHighlighted", name: "Highlighted Word", type: "Symbol" },
    { id: "storyText", name: "Our Story Paragraph", type: "Text" },
    { id: "marqueeText", name: "Scrolling Announcement (Marquee)", type: "Symbol" },
  ], "title");

  // 7. MENU PAGE
  await createOrUpdateContentType(environment, "pageMenu", "Menu Page", "Content for the menu page.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "introText", name: "Intro Text", type: "Text" },
  ], "title");

  // 8. SHOP PAGE
  await createOrUpdateContentType(environment, "pageShop", "Shop Page", "Content for the shop page.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "promoBanner", name: "Promo Banner Text", type: "Symbol" },
  ], "title");

  console.log("Bootstrap complete!");
}

async function createOrUpdateContentType(environment: any, id: string, name: string, description: string, fields: any[], displayField?: string) {
  try {
    let contentType;
    try {
      contentType = await environment.getContentType(id);
      console.log(`Content type '${id}' already exists. Updating...`);
      contentType.name = name;
      contentType.description = description;
      contentType.fields = fields;
      if (displayField) contentType.displayField = displayField;
      contentType = await contentType.update();
    } catch (e: any) {
      if (e.name === "NotFound") {
        console.log(`Creating content type '${id}'...`);
        contentType = await environment.createContentTypeWithId(id, {
          name,
          description,
          fields,
          displayField,
        });
      } else {
        throw e;
      }
    }
    
    await contentType.publish();
    console.log(`Published '${id}'.`);
  } catch (error: any) {
    console.error(`Failed to create/update '${id}':`, error.message);
  }
}

run().catch(console.error);

