"use client";

import { Map, Marker } from "@/components/ui/map";
import { contactContent } from "@/lib/content/content.contact";
import { BUSINESS_LAT, BUSINESS_LNG } from "@/lib/constants";
import styles from "./LocationMap.module.css";

export function LocationMap() {
  return (
    <div className={styles.locationMap} role="img" aria-label={contactContent.map.title}>
      <Map center={[BUSINESS_LNG, BUSINESS_LAT]} zoom={15}>
        <Marker longitude={BUSINESS_LNG} latitude={BUSINESS_LAT} label="CultureGlow24" />
      </Map>
    </div>
  );
}
