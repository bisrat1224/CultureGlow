"use client";

import { Map, Marker } from "@/components/ui/map";
import { contactContent } from "@/lib/content/content.contact";
import styles from "./LocationMap.module.css";

/**
 * TODO(BLOCKED): placeholder coordinates only.
 *
 * These are an approximate centroid for "Putney High St, London SW15 1SN"
 * (the same fuzzy street-level query the old <MapEmbed /> iframe used),
 * NOT a verified pin for the actual storefront. A hand-placed marker needs
 * the precise address/unit or a dropped-pin Google Maps link from the
 * client; until then this will likely be off by one or more buildings.
 * Replace with the real coordinates and delete this comment once confirmed.
 */
const BUSINESS_LNG = -0.2159;
const BUSINESS_LAT = 51.4613;

export function LocationMap() {
  return (
    <div className={styles.locationMap} role="img" aria-label={contactContent.map.title}>
      <Map center={[BUSINESS_LNG, BUSINESS_LAT]} zoom={15}>
        <Marker longitude={BUSINESS_LNG} latitude={BUSINESS_LAT} label="CultureGlow24" />
      </Map>
    </div>
  );
}
