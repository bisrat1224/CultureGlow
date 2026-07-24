import { loadEnv } from "payload/node";
loadEnv();

async function seed() {
  console.log("🌱 Starting seed...\n");

  const { getPayload } = await import("payload");
  const { default: config } = await import("../payload.config");
  const { seedMedia } = await import("./seed/media");
  const { seedGlobals } = await import("./seed/globals");
  const { seedCollections } = await import("./seed/collections");

  const payload = await getPayload({ config });

  const heroImages = await seedMedia(payload);
  await seedGlobals(payload, heroImages);
  await seedCollections(payload);

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
