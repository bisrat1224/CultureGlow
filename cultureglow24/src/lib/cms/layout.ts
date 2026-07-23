import { getPayloadClient } from "../payload";

export async function getLayoutData() {
  const payload = await getPayloadClient();

  const [siteSettings, navigation, footer, seoDefaults] = await Promise.all([
    payload.findGlobal({ slug: "site_settings" }),
    payload.findGlobal({ slug: "navigation" }),
    payload.findGlobal({ slug: "footer" }),
    payload.findGlobal({ slug: "seo_defaults" }),
  ]);

  return {
    siteSettings,
    navigation,
    footer,
    seoDefaults,
  };
}

export type LayoutData = Awaited<ReturnType<typeof getLayoutData>>;
