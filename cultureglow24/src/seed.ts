import { getPayload } from "payload";
import config from "../payload.config";
import { seedGlobals } from "./seed/globals";
import { seedCollections } from "./seed/collections";

async function seed() {
  console.log("🌱 Starting seed...\n");

  const payload = await getPayload({ config });

  await seedGlobals(payload);
  await seedCollections(payload);

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});