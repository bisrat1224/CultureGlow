import { galleryContent } from "@/lib/content/content.gallery";
import { getTiktokPosts } from "@/lib/contentful/queries";
import { SocialTile } from "@/components/home/SocialSection/SocialTile";
import styles from "./GalleryTikTokSection.module.css";
import shared from "../shared.module.css";

export async function GalleryTikTokSection() {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm, desc } =
    galleryContent.tiktok;

  const tiktoks = await getTiktokPosts({ galleryOnly: true });

  if (tiktoks.length === 0) return null;

  return (
    <section
      className={shared.sectionOnDark}
      id="gallery-tiktok"
      aria-labelledby="tiktok-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="tiktok-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescDark}`}>
            {desc}
          </p>
        </div>

        <div className={`${styles.socialGrid} reveal`}>
          {tiktoks.map((post) => (
            <SocialTile key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
