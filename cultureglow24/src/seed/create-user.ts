import { getPayload } from "payload";
import config from "../../payload.config";

async function createUser() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log("Users already exist. Skipping.");
    process.exit(0);
  }

  await payload.create({
    collection: "users",
    data: {
      email: "owner@cultureglow24.com",
      password: "ChangeMe123!",
      name: "Business Owner",
      role: "owner",
    },
  });

  console.log("✅ Owner user created:");
  console.log("   Email: owner@cultureglow24.com");
  console.log("   Password: ChangeMe123!");
  console.log("   ⚠️  Change this password immediately after first login.");
  process.exit(0);
}

createUser().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
