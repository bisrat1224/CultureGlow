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
    { id: "category", name: "Category", type: "Symbol", validations: [{ in: ["HABESHA FOOD", "LIFESTYLE", "BEAUTY"] }] },
    { id: "price", name: "Price", type: "Symbol" },
    { id: "badge", name: "Badge (Optional)", type: "Symbol" },
    { id: "description", name: "Description", type: "Text" },
    { id: "image", name: "Main Thumbnail Image", type: "Link", linkType: "Asset" },
    { id: "gallery", name: "Product Gallery (Additional Angles)", type: "Array", items: { type: "Link", linkType: "Asset" } },
    { id: "seoTitle", name: "Social Media Title", type: "Symbol" },
    { id: "seoImage", name: "Social Media Sharing Image", type: "Link", linkType: "Asset" },
  ], "name", {
    name: "The main name of the product as it appears to customers.",
    badge: "Optional text that overlays the image. e.g. 'Best Seller', 'New', 'Gift'",
    image: "The primary square image shown on the shop grid.",
    gallery: "Upload multiple images here to create a scrolling gallery on the individual product page.",
    seoTitle: "(Optional) How the title appears in Google Search and link previews. If left blank, defaults to Product Name.",
    seoImage: "(Optional) The preview image that appears when this product is shared on WhatsApp, Twitter, or iMessage.",
  });

  // 3. MENU ITEM
  await createOrUpdateContentType(environment, "menuItem", "[Collection] Menu Item", "Food and drink items for the Menu.", [
    { id: "name", name: "Dish Name", type: "Symbol", required: true },
    { id: "category", name: "Menu Section (Category)", type: "Symbol", validations: [{ in: ["starters", "mains", "veg-vegan", "desserts", "drinks"] }], required: true },
    { id: "price", name: "Price", type: "Symbol" },
    { id: "description", name: "Description", type: "Text" },
    { id: "dietaryTags", name: "Dietary Tags", type: "Array", items: { type: "Symbol", validations: [{ in: ["veg", "vegan", "gf", "spicy"] }] } },
    { id: "allergens", name: "Allergens", type: "Array", items: { type: "Symbol" } },
    { id: "image", name: "Dish Image", type: "Link", linkType: "Asset" },
  ], "name", {
    category: "Which section of the Menu page should this dish appear in?",
    allergens: "Add any allergens here (e.g. 'Contains Nuts', 'Contains Dairy').",
    dietaryTags: "These automatically add the visual colored tags (e.g. 'VG', 'GF') next to the dish.",
  });

  // 4. TIKTOK POST
  await createOrUpdateContentType(environment, "tiktokPost", "[Social] TikTok Video", "Embedded TikTok videos.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "url", name: "TikTok Video URL", type: "Symbol", required: true },
    { id: "caption", name: "Caption", type: "Text" },
    { id: "thumbnail", name: "Video Thumbnail Image", type: "Link", linkType: "Asset" },
    { id: "showOnHome", name: "Show On Home Page", type: "Boolean" },
    { id: "showOnGallery", name: "Show On Gallery Page", type: "Boolean" },
    { id: "sortOrder", name: "Sort Order", type: "Integer" },
  ], "title", {
    title: "For your reference only.",
    url: "The direct link to the TikTok video.",
    showOnHome: "Check this box to display the video on the homepage.",
    showOnGallery: "Check this box to display the video in the Gallery.",
    sortOrder: "Use numbers (1, 2, 3) to order them. Lower numbers show up first."
  });

  // 5. INSTAGRAM REEL
  await createOrUpdateContentType(environment, "instagramReel", "[Social] Instagram Reel", "Embedded Instagram Reels.", [
    { id: "title", name: "Internal Title", type: "Symbol", required: true },
    { id: "url", name: "Instagram Reel URL", type: "Symbol", required: true },
    { id: "caption", name: "Caption", type: "Text" },
    { id: "thumbnail", name: "Video Thumbnail Image", type: "Link", linkType: "Asset" },
    { id: "showOnHome", name: "Show On Home Page", type: "Boolean" },
    { id: "showOnGallery", name: "Show On Gallery Page", type: "Boolean" },
    { id: "sortOrder", name: "Sort Order", type: "Integer" },
  ], "title", {
    title: "For your reference only.",
    url: "The direct link to the Instagram Reel.",
    showOnHome: "Check this box to display the reel on the homepage.",
    showOnGallery: "Check this box to display the reel in the Gallery.",
    sortOrder: "Use numbers (1, 2, 3) to order them. Lower numbers show up first."
  });
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
