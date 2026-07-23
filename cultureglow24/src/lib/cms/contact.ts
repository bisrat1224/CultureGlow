import { getPayloadClient } from "../payload";

export async function getContactPageData() {
  const payload = await getPayloadClient();

  const contactPage = await payload.findGlobal({
    slug: "contact_page",
  });

  const siteSettings = await payload.findGlobal({
    slug: "site_settings",
  });

  return {
    contactPage,
    siteSettings,
  };
}

export type ContactPageData = Awaited<ReturnType<typeof getContactPageData>>;
