import styles from "./EventGallerySection.module.css";
import shared from "../shared.module.css";

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  caption: string;
  tall?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "wedding-1",
    image:
      "https://images.pexels.com/photos/35976293/pexels-photo-35976293.png?auto=compress&cs=tinysrgb&w=700",
    alt: "Ethiopian wedding celebration at night",
    caption: "Wedding",
    tall: true,
  },
  {
    id: "corporate-1",
    image:
      "https://images.pexels.com/photos/3376765/pexels-photo-3376765.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Banquet hall set up with round tables and floral centerpieces",
    caption: "Corporate",
  },
  {
    id: "birthday-1",
    image:
      "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Elegant 30th birthday celebration with balloons and cake",
    caption: "Birthday",
  },
  {
    id: "cultural-1",
    image:
      "https://images.pexels.com/photos/20865956/pexels-photo-20865956.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Women in colorful traditional dress at Meskel festival, Addis Ababa",
    caption: "Cultural",
    tall: true,
  },
  {
    id: "ceremony-1",
    image:
      "https://images.pexels.com/photos/17272177/pexels-photo-17272177.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Traditional parade during a religious festival in Addis Ababa",
    caption: "Ceremony",
  },
  {
    id: "corporate-2",
    image:
      "https://images.pexels.com/photos/16985199/pexels-photo-16985199.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Elegant banquet hall with modern interior design",
    caption: "Corporate",
  },
  {
    id: "corporate-3",
    image:
      "https://images.pexels.com/photos/6405679/pexels-photo-6405679.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Team celebrating together at a festive office party",
    caption: "Corporate",
  },
  {
    id: "birthday-2",
    image:
      "https://images.pexels.com/photos/7180728/pexels-photo-7180728.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Elegant birthday cake on a dinner table",
    caption: "Birthday",
    tall: true,
  },
  {
    id: "wedding-2",
    image:
      "https://images.pexels.com/photos/36005228/pexels-photo-36005228.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Group celebrating in colorful traditional attire",
    caption: "Wedding",
  },
  {
    id: "corporate-4",
    image:
      "https://images.pexels.com/photos/14636315/pexels-photo-14636315.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Banquet hall with formal dining tables set for an event",
    caption: "Corporate",
  },
  {
    id: "ceremony-2",
    image:
      "https://images.pexels.com/photos/19960366/pexels-photo-19960366.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Traditional attire at a religious ceremony under blue sky",
    caption: "Ceremony",
  },
  {
    id: "corporate-5",
    image:
      "https://images.pexels.com/photos/6405665/pexels-photo-6405665.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Colleagues toasting with wine glasses at an office celebration",
    caption: "Corporate",
  },
];

export function EventGallerySection() {
  return (
    <section
      className={shared.sectionOnCream}
      id="gallery"
      aria-labelledby="gallery-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>From Past Events</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="gallery-h2"
          >
            Moments We&rsquo;ve <em>Catered</em>
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>
            Placeholder gallery — real event photography comes from the
            client via the PM once available.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`${styles.galleryItem} ${item.tall ? styles.galleryItemTall : ""} reveal`}
            >
              <img src={item.image} alt={item.alt} />
              <span className={styles.galleryItemCap}>{item.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
