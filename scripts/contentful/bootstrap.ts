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
  await createOrUpdateContentType(environment, "globalSettings", "[Settings] Global Store Data", "Global store information like contact info and social links.", [
    { id: "email", name: "Business Email", type: "Symbol" },
    { id: "whatsappNumber", name: "WhatsApp Number", type: "Symbol" },
    { id: "physicalAddress", name: "Physical Address", type: "Symbol" },
    { id: "openingHours", name: "Opening Hours", type: "Text" },
    { id: "instagramUrl", name: "Instagram URL", type: "Symbol" },
    { id: "tiktokUrl", name: "TikTok URL", type: "Symbol" },
    { id: "etsyUrl", name: "Etsy URL", type: "Symbol" },
  ], "email", {
    email: "The primary email address where customers can contact you. Appears in the Footer and Contact page.",
    whatsappNumber: "Format: Country code + number. No '+' or spaces (e.g. 447123456789). This updates all 'Order' buttons instantly.",
    openingHours: "Use plain text. You can put each day on a new line.",
    instagramUrl: "The full link to your Instagram profile (e.g. https://www.instagram.com/cultureglow24/).",
    etsyUrl: "The full link to your Etsy store. Updates the top navigation bar and footer.",
  });

  // 2. SHOP PRODUCT
  await createOrUpdateContentType(environment, "shopProduct", "[Collection] Shop Product", "Inventory items for the Shop page.", [
    { id: "name", name: "Product Name", type: "Symbol", required: true },
    { id: "slug", name: "URL Slug", type: "Symbol", required: true },
    { id: "category", name: "Category", type: "Symbol", validations: [{ in: ["HABESHA FOOD", "LIFESTYLE", "BEAUTY"] }] },
    { id: "price", name: "Price", type: "Symbol" },
    { id: "badge", name: "Badge (Optional)", type: "Symbol" },
    { id: "description", name: "Description", type: "Text" },
    { id: "image", name: "Main Thumbnail Image", type: "Link", linkType: "Asset" },
    { id: "gallery", name: "Product Gallery (Additional Angles)", type: "Array", items: { type: "Link", linkType: "Asset" } },
    { id: "seoTitle", name: "SEO: Custom Title", type: "Symbol" },
    { id: "seoDescription", name: "SEO: Custom Description", type: "Text" },
    { id: "seoImage", name: "SEO: Social Share Image", type: "Link", linkType: "Asset" },
  ], "name", {
    name: "The main name of the product as it appears to customers.",
    slug: "The text used in the URL. Must be unique and lowercase with hyphens (e.g. 'habesha-spiced-butter').",
    badge: "Optional text that overlays the image. e.g. 'Best Seller', 'New', 'Gift'",
    image: "The primary square image shown on the shop grid.",
    gallery: "Upload multiple images here to create a scrolling gallery on the individual product page.",
    seoTitle: "(Optional) How the title appears in Google Search. If left blank, it defaults to the Product Name.",
    seoImage: "(Optional) The preview image that appears when this product is shared on WhatsApp, Twitter, or iMessage.",
  });

  // 3. MENU ITEM
  await createOrUpdateContentType(environment, "menuItem", "[Collection] Menu Item", "Food and drink items for the Menu.", [
    { id: "name", name: "Dish Name", type: "Symbol", required: true },
    { id: "slug", name: "URL Slug", type: "Symbol", required: true },
    { id: "price", name: "Price", type: "Symbol" },
    { id: "description", name: "Description", type: "Text" },
    { id: "dietaryTags", name: "Dietary Tags", type: "Array", items: { type: "Symbol", validations: [{ in: ["veg", "vegan", "gf", "spicy"] }] } },
    { id: "allergens", name: "Allergens", type: "Array", items: { type: "Symbol" } },
    { id: "image", name: "Dish Image", type: "Link", linkType: "Asset" },
    { id: "seoTitle", name: "SEO Title", type: "Symbol" },
    { id: "seoDescription", name: "SEO Description", type: "Text" },
    { id: "seoImage", name: "SEO Image (OG)", type: "Link", linkType: "Asset" },
  ], "name", {
    allergens: "Add any allergens here (e.g. 'Contains Nuts', 'Contains Dairy').",
    dietaryTags: "These automatically add the visual colored tags (e.g. 'VG', 'GF') next to the dish.",
  });

  // 4. MENU CATEGORY -> MENU SECTION
  await createOrUpdateContentType(environment, "menuCategory", "[Page Builder] Menu Section", "A large structural block on the Menu page (e.g. 'Starters' or 'Mains').", [
    { id: "name", name: "Internal Reference Name", type: "Symbol", required: true },
    { id: "slug", name: "URL Anchor Slug", type: "Symbol", required: true },
    { id: "navLabel", name: "Sidebar Navigation Label", type: "Symbol" },
    { id: "eyebrow", name: "Eyebrow Text", type: "Symbol" },
    { id: "titleBeforeEm", name: "Title (Normal Text)", type: "Symbol" },
    { id: "titleEm", name: "Title (Italicized Text)", type: "Symbol" },
    { id: "variant", name: "Background Color Variant", type: "Symbol", validations: [{ in: ["cream", "dark"] }] },
    { id: "countLabel", name: "Item Count Override (Optional)", type: "Symbol" },
    { id: "items", name: "Dishes in this Section", type: "Array", items: { type: "Link", linkType: "Entry", validations: [{ linkContentType: ["menuItem"] }] } },
  ], "name", {
    name: "Used only for you to easily identify this section in the Contentful dashboard.",
    slug: "Used to anchor link to this section. (e.g. 'starters' becomes /menu#starters).",
    navLabel: "The text that appears in the sticky sidebar menu on the left side of the Menu page.",
    titleBeforeEm: "Example: 'Our '",
    titleEm: "Example: 'Starters'. This part will be styled elegantly in italics.",
    variant: "Controls the background color of this entire horizontal section of the webpage.",
    items: "Drag and drop the specific dishes that should appear in this section. You can reorder them here.",
  });

  // 5. TESTIMONIAL
  await createOrUpdateContentType(environment, "testimonial", "[Collection] Testimonial", "Customer reviews displayed on the home page.", [
    { id: "customerName", name: "Customer Name", type: "Symbol", required: true },
    { id: "quote", name: "Quote", type: "Text" },
    { id: "rating", name: "Rating (1-5)", type: "Integer", validations: [{ range: { min: 1, max: 5 } }] },
    { id: "source", name: "Source", type: "Symbol" },
  ], "customerName");

  // 6. HOME PAGE
  await createOrUpdateContentType(environment, "pageHome", "[Page] Home", "Content for the home page.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "heroHeading", name: "Main Heading", type: "Symbol" },
    { id: "heroHighlighted", name: "Highlighted Word", type: "Symbol" },
    { id: "storyText", name: "Our Story Paragraph", type: "Text" },
    { id: "marqueeText", name: "Scrolling Announcement (Marquee)", type: "Symbol" },
  ], "title");

  // 7. MENU PAGE
  await createOrUpdateContentType(environment, "pageMenu", "[Page] Menu", "Content for the menu page.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "introText", name: "Intro Text", type: "Text" },
  ], "title");

  // 8. SHOP PAGE
  await createOrUpdateContentType(environment, "pageShop", "[Page] Shop", "Content for the shop page.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "promoBanner", name: "Promo Banner Text", type: "Symbol" },
  ], "title");

  console.log("Bootstrap complete!");
}

async function createOrUpdateContentType(
  environment: any,
  id: string,
  name: string,
  description: string,
  fields: any[],
  displayField?: string,
  helpTexts?: Record<string, string>
) {
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

    // Apply Help Texts via Editor Interface
    if (helpTexts && Object.keys(helpTexts).length > 0) {
      const editorInterface = await environment.getEditorInterfaceForContentType(id);
      let updated = false;
      
      for (const control of editorInterface.controls) {
        if (helpTexts[control.fieldId]) {
          if (!control.settings) control.settings = {};
          if (control.settings.helpText !== helpTexts[control.fieldId]) {
            control.settings.helpText = helpTexts[control.fieldId];
            updated = true;
          }
        }
      }

      if (updated) {
        await editorInterface.update();
        console.log(`Updated help text for '${id}'.`);
      }
    }

  } catch (error: any) {
    console.error(`Failed to create/update '${id}':`, error.message);
  }
}

run().catch(console.error);
