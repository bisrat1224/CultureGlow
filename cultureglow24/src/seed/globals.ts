import type { Payload } from "payload";
import { hero, marquee, story, productsSection, accentBand, kitchen, social, catering, testimonials } from "../lib/content/content.home";
import { hero as aboutHero, story as aboutStory, mission, milestones, gallery, social as aboutSocial } from "../lib/content/content.about";
import { hero as menuHero, featureBanner, howToOrder, pdfCta } from "../lib/content/content.menu";
import { hero as cateringHero, eventTypes, packages, gallery as cateringGallery, testimonials as cateringTestimonials, contactCta } from "../lib/content/content.catering";
import { hero as shopHero, scrollingBanner, featureBanner as shopFeatureBanner, bundlesSection, productsSection as shopProductsSection, howToOrder as shopHowToOrder } from "../lib/content/content.shop";
import { hero as galleryHero, photoGrid, tiktok } from "../lib/content/content.gallery";
import { hero as contactHero, methods, map } from "../lib/content/content.contact";
import { NAV_LINKS, SOCIAL_LINKS, WHATSAPP_NUMBER, CONTACT_EMAIL } from "../lib/constants";

export async function seedGlobals(payload: Payload) {
  console.log("📄 Seeding globals...");

  // 1. Site Settings
  await payload.updateGlobal({
    slug: "site_settings",
    data: {
      site_name: "CultureGlow24",
      whatsapp_number: WHATSAPP_NUMBER,
      contact_email: CONTACT_EMAIL,
      social_links: SOCIAL_LINKS.map((link) => ({
        label: link.label,
        href: link.href,
      })),
    },
  });
  console.log("  ✓ site_settings");

  // 2. Navigation
  await payload.updateGlobal({
    slug: "navigation",
    data: {
      links: NAV_LINKS.map((link, i) => ({
        label: link.label,
        href: link.href,
        sort_order: i,
      })),
    },
  });
  console.log("  ✓ navigation");

  // 3. Footer
  await payload.updateGlobal({
    slug: "footer",
    data: {
      tagline: "Habesha food, beauty, and lifestyle - ordering via WhatsApp only.",
      columns: [
        {
          title: "Navigate",
          links: NAV_LINKS.map((link) => ({
            label: link.label,
            href: link.href,
          })),
        },
      ],
      copyright_text: "CultureGlow24. All rights reserved.",
    },
  });
  console.log("  ✓ footer");

  // 4. SEO Defaults
  await payload.updateGlobal({
    slug: "seo_defaults",
    data: {
      default_title: "CultureGlow24 — Habesha Food, Beauty & Lifestyle",
      default_description: "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp.",
      default_keywords: [
        { keyword: "Habesha food" },
        { keyword: "Ethiopian catering" },
        { keyword: "Habesha beauty" },
        { keyword: "Habesha lifestyle" },
      ],
      twitter_card: "summary_large_image",
      metadata_base: "https://cultureglow24.com",
    },
  });
  console.log("  ✓ seo_defaults");

  // 5. Home Page
  await payload.updateGlobal({
    slug: "home_page",
    data: {
      hero: {
        eyebrow: hero.eyebrow,
        heading_before_em: hero.heading.beforeEm,
        heading_em: hero.heading.em,
        heading_after_em: hero.heading.afterEm,
        body: hero.body,
        primary_cta: hero.primaryCTA,
        secondary_cta: hero.secondaryCTA,
      },
      marquee_items: marquee.items.map((item) => ({ text: item.text })),
      story: {
        eyebrow: story.eyebrow,
        heading_before_em: story.heading.beforeEm,
        heading_em: story.heading.em,
        heading_second_line: story.heading.secondLine,
        body: story.body,
        amharic: story.amharic,
        badge: story.badge,
        stats: story.stats.map((s) => ({ value: s.value, label: s.label })),
      },
      products_heading: {
        eyebrow: productsSection.eyebrow,
        heading_before_em: productsSection.heading.beforeEm,
        heading_em: productsSection.heading.em,
        view_all_cta: productsSection.viewAllCTA,
      },
      accent_band_items: accentBand.items.map((item) => ({ text: item.text })),
      kitchen: {
        eyebrow: kitchen.eyebrow,
        heading_before_em: kitchen.heading.beforeEm,
        heading_em: kitchen.heading.em,
        heading_second_line: kitchen.heading.secondLine,
        body: kitchen.body,
        cta: kitchen.cta,
      },
      social_heading: {
        eyebrow: social.eyebrow,
        heading_before_em: social.heading.beforeEm,
        heading_em: social.heading.em,
        tiktok_label: social.tiktokLabel,
        reels_label: social.reelsLabel,
      },
      catering_section: {
        eyebrow: catering.eyebrow,
        heading_before_em: catering.heading.beforeEm,
        heading_em: catering.heading.em,
        heading_second_line: catering.heading.secondLine,
        body: catering.body,
        cta: catering.cta,
      },
      testimonials_heading: {
        eyebrow: testimonials.eyebrow,
        heading_before_em: testimonials.heading.beforeEm,
        heading_em: testimonials.heading.em,
        heading_after_em: testimonials.heading.afterEm,
      },
    },
  });
  console.log("  ✓ home_page");

  // 6. About Page
  await payload.updateGlobal({
    slug: "about_page",
    data: {
      hero: {
        eyebrow: aboutHero.eyebrow,
        heading_before_em: aboutHero.heading.beforeEm,
        heading_em: aboutHero.heading.em,
        heading_after_em: aboutHero.heading.afterEm,
        desc: aboutHero.desc,
      },
      story: {
        eyebrow: aboutStory.eyebrow,
        heading_before_em: aboutStory.heading.beforeEm,
        heading_em: aboutStory.heading.em,
        body: aboutStory.body,
        amharic: aboutStory.amharic,
        badge: aboutStory.badge,
        stats: aboutStory.stats.map((s) => ({ value: s.value, label: s.label })),
      },
      mission_heading: {
        eyebrow: mission.eyebrow,
        heading_before_em: mission.heading.beforeEm,
        heading_em: mission.heading.em,
      },
      milestones_heading: {
        eyebrow: milestones.eyebrow,
        heading_before_em: milestones.heading.beforeEm,
        heading_em: milestones.heading.em,
      },
      gallery_heading: {
        eyebrow: gallery.eyebrow,
        heading_before_em: gallery.heading.beforeEm,
        heading_em: gallery.heading.em,
      },
      social_heading: {
        heading: aboutSocial.heading,
      },
    },
  });
  console.log("  ✓ about_page");

  // 7. Menu Page
  await payload.updateGlobal({
    slug: "menu_page",
    data: {
      hero: {
        eyebrow: menuHero.eyebrow,
        heading_before_em: menuHero.heading.beforeEm,
        heading_em: menuHero.heading.em,
        heading_after_em: menuHero.heading.afterEm,
        desc: menuHero.desc,
        primary_cta: menuHero.primaryCTA,
        secondary_cta: menuHero.secondaryCTA,
      },
      feature_banner: {
        label: featureBanner.label,
        title: featureBanner.title,
        desc: featureBanner.desc,
        cta: featureBanner.cta,
      },
      how_to_order: {
        label: howToOrder.label,
        title: howToOrder.title,
        desc: howToOrder.desc,
        steps: howToOrder.steps.map((s) => ({
          number: s.number,
          title: s.title,
          desc: s.desc,
        })),
      },
      pdf_cta: {
        eyebrow: pdfCta.eyebrow,
        title: pdfCta.title,
        desc: pdfCta.desc,
        cta: pdfCta.cta,
      },
    },
  });
  console.log("  ✓ menu_page");

  // 8. Catering Page
  await payload.updateGlobal({
    slug: "catering_page",
    data: {
      hero: {
        eyebrow: cateringHero.eyebrow,
        heading_before_em: cateringHero.heading.beforeEm,
        heading_em: cateringHero.heading.em,
        heading_after_em: cateringHero.heading.afterEm,
        desc: cateringHero.desc,
        primary_cta: cateringHero.primaryCTA,
        secondary_cta: cateringHero.secondaryCTA,
      },
      event_types_heading: {
        eyebrow: eventTypes.eyebrow,
        heading_before_em: eventTypes.heading.beforeEm,
        heading_em: eventTypes.heading.em,
        heading_after_em: eventTypes.heading.afterEm,
        desc: eventTypes.desc,
      },
      packages_heading: {
        eyebrow: packages.eyebrow,
        heading_before_em: packages.heading.beforeEm,
        heading_em: packages.heading.em,
        desc: packages.desc,
      },
      gallery_heading: {
        eyebrow: cateringGallery.eyebrow,
        heading_before_em: cateringGallery.heading.beforeEm,
        heading_em: cateringGallery.heading.em,
        desc: cateringGallery.desc,
      },
      testimonials_heading: {
        eyebrow: cateringTestimonials.eyebrow,
        heading_before_em: cateringTestimonials.heading.beforeEm,
        heading_em: cateringTestimonials.heading.em,
        heading_after_em: cateringTestimonials.heading.afterEm,
      },
      contact_cta: {
        eyebrow: contactCta.eyebrow,
        heading_before_em: contactCta.heading.beforeEm,
        heading_em: contactCta.heading.em,
        desc: contactCta.desc,
      },
    },
  });
  console.log("  ✓ catering_page");

  // 9. Shop Page
  await payload.updateGlobal({
    slug: "shop_page",
    data: {
      hero: {
        label: shopHero.label,
        title: shopHero.title,
        desc: shopHero.desc,
      },
      scrolling_banner_items: scrollingBanner.items.map((item) => ({ text: item.text })),
      feature_banner: {
        label: shopFeatureBanner.label,
        title: shopFeatureBanner.title,
        desc: shopFeatureBanner.desc,
        cta: shopFeatureBanner.cta,
      },
      bundles_heading: {
        label: bundlesSection.label,
        title: bundlesSection.title,
        desc: bundlesSection.desc,
      },
      products_heading: {
        label: shopProductsSection.label,
        title: shopProductsSection.title,
      },
      how_to_order: {
        label: shopHowToOrder.label,
        title: shopHowToOrder.title,
        desc: shopHowToOrder.desc,
        steps: shopHowToOrder.steps.map((s) => ({
          number: s.number,
          title: s.title,
          desc: s.desc,
        })),
      },
    },
  });
  console.log("  ✓ shop_page");

  // 10. Gallery Page
  await payload.updateGlobal({
    slug: "gallery_page",
    data: {
      hero: {
        eyebrow: galleryHero.eyebrow,
        heading_before_em: galleryHero.heading.beforeEm,
        heading_em: galleryHero.heading.em,
        heading_after_em: galleryHero.heading.afterEm,
        desc: galleryHero.desc,
      },
      photo_grid_heading: {
        eyebrow: photoGrid.eyebrow,
        heading_before_em: photoGrid.heading.beforeEm,
        heading_em: photoGrid.heading.em,
        heading_after_em: photoGrid.heading.afterEm,
        desc: photoGrid.desc,
      },
      tiktok_heading: {
        eyebrow: tiktok.eyebrow,
        heading_before_em: tiktok.heading.beforeEm,
        heading_em: tiktok.heading.em,
        heading_after_em: tiktok.heading.afterEm,
        desc: tiktok.desc,
      },
    },
  });
  console.log("  ✓ gallery_page");

  // 11. Contact Page
  await payload.updateGlobal({
    slug: "contact_page",
    data: {
      hero: {
        eyebrow: contactHero.eyebrow,
        heading_before_em: contactHero.heading.beforeEm,
        heading_em: contactHero.heading.em,
        heading_after_em: contactHero.heading.afterEm,
        desc: contactHero.desc,
        cta: contactHero.cta,
      },
      methods_heading: {
        eyebrow: methods.eyebrow,
        heading_before_em: methods.heading.beforeEm,
        heading_em: methods.heading.em,
        heading_after_em: methods.heading.afterEm,
        desc: methods.desc,
        whatsapp_label: methods.whatsappLabel,
        whatsapp_value: methods.whatsappValue,
        phone_label: methods.phoneLabel,
        email_label: methods.emailLabel,
        social_label: methods.socialLabel,
      },
      map_title: map.title,
    },
  });
  console.log("  ✓ contact_page");

  console.log("📄 Globals seeded successfully.\n");
}