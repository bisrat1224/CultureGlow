import type { Payload } from "payload";
import path from "path";

// Hero images for pages whose global schema marks `hero.hero_image` as
// required. Chosen from existing assets already used elsewhere in the app
// (see public/assets/images) so we're not introducing new, unreviewed imagery.
const HERO_IMAGES = {
  about: { file: "stew-pans.jpg", alt: "Simmering Habesha stews in traditional pans" },
  catering: { file: "platter-big.jpg", alt: "Large shared platter for catering and events" },
  contact: { file: "sharing-hands.jpg", alt: "Hands sharing a Habesha meal together" },
  gallery: { file: "injera-plate.jpg", alt: "Injera served with an assortment of wats" },
  menu: { file: "tibs-skillet.jpg", alt: "Tibs sizzling in a cast iron skillet" },
} as const;

// NOTE: Postgres (with default idType: 'serial') returns numeric IDs, not
// strings. Don't force-cast to string — pass through whatever Payload
// actually returns so it matches what the relationship/upload validator
// expects.
export type HeroImageIds = Record<keyof typeof HERO_IMAGES, number | string>;

export async function seedMedia(payload: Payload): Promise<HeroImageIds> {
  console.log("🖼️  Seeding media...");

  const ids = {} as HeroImageIds;

  for (const [key, { file, alt }] of Object.entries(HERO_IMAGES)) {
    // Reuse an existing upload instead of creating a new one every time the
    // seed script is re-run — Payload stores the original filename, so we
    // can look it up before uploading again.
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: file } },
      limit: 1,
    });

    let id: number | string;
    if (existing.docs.length > 0) {
      id = existing.docs[0].id;
      console.log(`  ↺ media: ${file} already exists -> id=${id}`);
    } else {
      const doc = await payload.create({
        collection: "media",
        data: { alt },
        filePath: path.resolve(process.cwd(), "public/assets/images", file),
      });

      // Fail fast with a clear message instead of letting a bad/undefined ID
      // surface later as a confusing "Hero > Hero_image" ValidationError on
      // an unrelated global.
      if (doc?.id === undefined || doc?.id === null) {
        throw new Error(
          `seedMedia: payload.create() for "${file}" did not return an id. ` +
            `Got: ${JSON.stringify(doc)}`
        );
      }
      id = doc.id;
      console.log(`  ✓ media: ${file} -> id=${id} (${typeof id})`);
    }

    ids[key as keyof typeof HERO_IMAGES] = id;
  }

  console.log("  heroImages:", ids);

  return ids;
}
