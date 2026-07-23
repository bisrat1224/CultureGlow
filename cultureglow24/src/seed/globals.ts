import type { Payload } from "payload";
import { homeContent } from "../lib/content/content.home";
import { aboutContent } from "../lib/content/content.about";
import { menuContent } from "../lib/content/content.menu";
import { cateringContent } from "../lib/content/content.catering";
import { shopContent } from "../lib/content/content.shop";
import { galleryContent } from "../lib/content/content.gallery";
import { contactContent } from "../lib/content/content.contact";
import { NAV_LINKS, SOCIAL_LINKS, WHATSAPP_NUMBER, CONTACT_EMAIL } from "../lib/constants";

const { hero, marquee, story, products: productsSection, accentBand, kitchen, social, catering, testimonials } = homeContent;
const { story: aboutStory, mission, milestones, gallery, social: aboutSocial } = aboutContent;
const { hero: menuHero, featureBanner, howToOrder, pdfCta } = menuContent;
const {
  hero: cateringHero,
  eventTypes,
  packages,
  gallery: cateringGallery,
  testimonials: cateringTestimonials,
  contactCta,
} = cateringContent;
const {
  hero: shopHero,
  scrollingBanner,
  featureBanner: shopFeatureBanner,
  bundles: bundlesSection,
  productsSection: shopProductsSection,
  howToOrder: shopHowToOrder,
} = shopContent;
const { hero: galleryHero, photoGrid, tiktok } = galleryContent;
const { hero: contactHero, methods, map } = contactContent;

export async function seedGlobals(payload: Payload) {
  console.log("📄 Seeding globals...");

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

  await payload.updateGlobal({
    slug: "home_page",
    data: {
      hero: {
        eyebrow: hero.eyebrow,
        heading_before_em: hero.headingBeforeEm,
        heading_em: hero.headingEm,
        heading_after_em: hero.headingAfterEm,
        body: hero.body,
        primary_cta: hero.primaryCta,
        secondary_cta: hero.secondaryCta,
      },
      marquee_items: marquee.items.map((item) => ({ text: item })),
      story: {
        eyebrow: story.eyebrow,
        heading_before_em: story.headingBeforeEm,
        heading_em: story.headingEm,
        heading_second_line: story.headingSecondLine,
        body: story.body,
        amharic: story.amharic,
        badge: story.badge,
        stats: story.stats.map((s) => ({ value: s.value, label: s.label })),
      },
      products_heading: {
        eyebrow: productsSection.eyebrow,
        heading_before_em: productsSection.headingBeforeEm,
        heading_em: productsSection.headingEm,
        view_all_cta: productsSection.viewAllCta,
      },
      accent_band_items: accentBand.items.map((item) => ({ text: item })),
      kitchen: {
        eyebrow: kitchen.eyebrow,
        heading_before_em: kitchen.headingBeforeEm,
        heading_em: kitchen.headingEm,
        heading_second_line: kitchen.headingSecondLine,
        body: kitchen.body,
        cta: kitchen.cta,
      },
      social_heading: {
        eyebrow: social.eyebrow,
        heading_before_em: social.headingBeforeEm,
        heading_em: social.headingEm,
        tiktok_label: social.tiktokLabel,
        reels_label: social.reelsLabel,
      },
      catering_section: {
        eyebrow: catering.eyebrow,
        heading_before_em: catering.headingBeforeEm,
        heading_em: catering.headingEm,
        heading_second_line: catering.headingSecondLine,
        body: catering.body,
        cta: catering.cta,
      },
      testimonials_heading: {
        eyebrow: testimonials.eyebrow,
        heading_before_em: testimonials.headingBeforeEm,
        heading_em: testimonials.headingEm,
        heading_after_em: testimonials.headingAfterEm,
      },
    },
  });
  console.log("  ✓ home_page");

  await payload.updateGlobal({
    slug: "about_page",
    data: {
      hero: {
        eyebrow: "About Us",
        heading_before_em: "Our ",
        heading_em: "Story",
        heading_after_em: "",
        desc: "Habesha food, beauty, and lifestyle delivered with care.",
      },
      story: {
        eyebrow: aboutStory.eyebrow,
        heading_before_em: aboutStory.headingBeforeEm,
        heading_em: aboutStory.headingEm,
        body: aboutStory.body,
        amharic: aboutStory.amharic,
        badge: aboutStory.badge,
        stats: aboutStory.stats.map((s) => ({ value: s.value, label: s.label })),
      },
      mission_heading: {
        eyebrow: mission.eyebrow,
        heading_before_em: mission.headingBeforeEm,
        heading_em: mission.headingEm,
      },
      milestones_heading: {
        eyebrow: milestones.eyebrow,
        heading_before_em: milestones.headingBeforeEm,
        heading_em: milestones.headingEm,
      },
      gallery_heading: {
        eyebrow: gallery.eyebrow,
        heading_before_em: gallery.headingBeforeEm,
        heading_em: gallery.headingEm,
      },
      social_heading: {
        heading: aboutSocial.heading,
      },
    },
  });
  console.log("  ✓ about_page");

  await payload.updateGlobal({
    slug: "menu_page",
    data: {
      hero: {
        eyebrow: menuHero.eyebrow,
        heading_before_em: menuHero.headingBeforeEm,
        heading_em: menuHero.headingEm,
        heading_after_em: menuHero.headingAfterEm,
        desc: menuHero.desc,
        primary_cta: menuHero.primaryCta,
        secondary_cta: menuHero.secondaryCta,
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

  await payload.updateGlobal({
    slug: "catering_page",
    data: {
      hero: {
        eyebrow: cateringHero.eyebrow,
        heading_before_em: cateringHero.headingBeforeEm,
        heading_em: cateringHero.headingEm,
        heading_after_em: cateringHero.headingAfterEm,
        desc: cateringHero.desc,
        primary_cta: cateringHero.primaryCta,
        secondary_cta: cateringHero.secondaryCta,
      },
      event_types_heading: {
        eyebrow: eventTypes.eyebrow,
        heading_before_em: eventTypes.headingBeforeEm,
        heading_em: eventTypes.headingEm,
        heading_after_em: eventTypes.headingAfterEm,
        desc: eventTypes.desc,
      },
      packages_heading: {
        eyebrow: packages.eyebrow,
        heading_before_em: packages.headingBeforeEm,
        heading_em: packages.headingEm,
        desc: packages.desc,
      },
      gallery_heading: {
        eyebrow: cateringGallery.eyebrow,
        heading_before_em: cateringGallery.headingBeforeEm,
        heading_em: cateringGallery.headingEm,
        desc: cateringGallery.desc,
      },
      testimonials_heading: {
        eyebrow: cateringTestimonials.eyebrow,
        heading_before_em: cateringTestimonials.headingBeforeEm,
        heading_em: cateringTestimonials.headingEm,
        heading_after_em: cateringTestimonials.headingAfterEm,
      },
      contact_cta: {
        eyebrow: contactCta.eyebrow,
        heading_before_em: contactCta.headingBeforeEm,
        heading_em: contactCta.headingEm,
        desc: contactCta.desc,
      },
    },
  });
  console.log("  ✓ catering_page");

  await payload.updateGlobal({
    slug: "shop_page",
    data: {
      hero: {
        label: shopHero.label,
        title: shopHero.title,
        desc: shopHero.desc,
      },
      scrolling_banner_items: scrollingBanner.items.map((item) => ({ text: item })),
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

  await payload.updateGlobal({
    slug: "gallery_page",
    data: {
      hero: {
        eyebrow: galleryHero.eyebrow,
        heading_before_em: galleryHero.headingBeforeEm,
        heading_em: galleryHero.headingEm,
        heading_after_em: galleryHero.headingAfterEm,
        desc: galleryHero.desc,
      },
      photo_grid_heading: {
        eyebrow: photoGrid.eyebrow,
        heading_before_em: photoGrid.headingBeforeEm,
        heading_em: photoGrid.headingEm,
        heading_after_em: photoGrid.headingAfterEm,
        desc: photoGrid.desc,
      },
      tiktok_heading: {
        eyebrow: tiktok.eyebrow,
        heading_before_em: tiktok.headingBeforeEm,
        heading_em: tiktok.headingEm,
        heading_after_em: tiktok.headingAfterEm,
        desc: tiktok.desc,
      },
    },
  });
  console.log("  ✓ gallery_page");

  await payload.updateGlobal({
    slug: "contact_page",
    data: {
      hero: {
        eyebrow: contactHero.eyebrow,
        heading_before_em: contactHero.headingBeforeEm,
        heading_em: contactHero.headingEm,
        heading_after_em: contactHero.headingAfterEm,
        desc: contactHero.desc,
        cta: contactHero.cta,
      },
      methods_heading: {
        eyebrow: methods.eyebrow,
        heading_before_em: methods.headingBeforeEm,
        heading_em: methods.headingEm,
        heading_after_em: methods.headingAfterEm,
        desc: methods.desc,
        whatsapp_label: methods.whatsapp.label,
        whatsapp_value: methods.whatsapp.value,
        phone_label: methods.phone.label,
        email_label: methods.email.label,
        social_label: methods.social.label,
      },
      map_title: map.title,
    },
  });
  console.log("  ✓ contact_page");

  console.log("📄 Globals seeded successfully.\n");
}
