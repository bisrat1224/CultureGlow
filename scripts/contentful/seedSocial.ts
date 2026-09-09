import { createClient } from "contentful-management";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import mime from "mime-types"; // Might not be installed, we can hardcode image/webp and image/png

dotenv.config({ path: ".env.local" });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });
const socialData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "social.json"), "utf8"));

async function createAsset(environment: any, imagePath: string, title: string) {
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found locally: ${fullPath}`);
      return null;
    }
    
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/webp";
    const fileContent = fs.readFileSync(fullPath);
    const fileName = path.basename(fullPath);

    console.log(`Uploading asset: ${fileName}...`);
    
    let asset = await environment.createAssetFromFiles({
      fields: {
        title: { "en-US": title },
        description: { "en-US": title },
        file: {
          "en-US": {
            contentType,
            fileName,
            file: fileContent
          }
        }
      }
    });

    asset = await asset.processForAllLocales();
    
    // Wait for processing to finish before publishing
    let isProcessed = false;
    for (let i = 0; i < 5; i++) {
      asset = await environment.getAsset(asset.sys.id);
      if (asset.fields.file["en-US"].url) {
        isProcessed = true;
        break;
      }
      await new Promise(r => setTimeout(r, 2000));
    }

    if (isProcessed) {
      await asset.publish();
      console.log(`Published asset: ${fileName}`);
      return asset.sys.id;
    } else {
      console.warn(`Asset ${fileName} failed to process in time.`);
      return null;
    }
  } catch (err) {
    console.error(`Error uploading asset ${imagePath}:`, err);
    return null;
  }
}

async function createEntry(environment: any, contentTypeId: string, entryId: string, fields: any) {
  try {
    let entry;
    try {
      entry = await environment.getEntry(entryId);
      console.log(`Entry '${entryId}' exists. Updating...`);
      entry.fields = fields;
      entry = await entry.update();
    } catch (e: any) {
      if (e.name === "NotFound") {
        console.log(`Creating entry '${entryId}'...`);
        entry = await environment.createEntryWithId(contentTypeId, entryId, { fields });
      } else {
        throw e;
      }
    }
    
    await entry.publish();
  } catch (error: any) {
    console.error(`Failed to create/update entry '${entryId}':`, error.message);
  }
}

async function run() {
  const space = await client.getSpace(SPACE_ID as string);
  const environment = await space.getEnvironment(ENVIRONMENT);

  console.log("Seeding TikToks...");
  for (const post of socialData.tiktoks) {
    let assetId = null;
    if (post.thumbnail) {
      assetId = await createAsset(environment, post.thumbnail, post.title);
    }
    
    const fields: any = {
      title: { "en-US": post.title },
      url: { "en-US": post.url },
      caption: { "en-US": post.caption },
      showOnHome: { "en-US": post.showOnHome },
      showOnGallery: { "en-US": post.showOnGallery },
      sortOrder: { "en-US": post.sortOrder },
    };
    
    if (assetId) {
      fields.thumbnail = {
        "en-US": {
          sys: { type: "Link", linkType: "Asset", id: assetId }
        }
      };
    }
    
    await createEntry(environment, "tiktokPost", post.id, fields);
  }

  console.log("Seeding Instagram Reels...");
  for (const reel of socialData.reels) {
    let assetId = null;
    if (reel.thumbnail) {
      assetId = await createAsset(environment, reel.thumbnail, reel.title);
    }
    
    const fields: any = {
      title: { "en-US": reel.title },
      url: { "en-US": reel.url },
      caption: { "en-US": reel.caption },
      showOnHome: { "en-US": reel.showOnHome },
      showOnGallery: { "en-US": reel.showOnGallery },
      sortOrder: { "en-US": reel.sortOrder },
    };
    
    if (assetId) {
      fields.thumbnail = {
        "en-US": {
          sys: { type: "Link", linkType: "Asset", id: assetId }
        }
      };
    }
    
    await createEntry(environment, "instagramReel", reel.id, fields);
  }

  console.log("Social seeding complete!");
}

run().catch(console.error);
