"use client";

import dynamic from "next/dynamic";
import styles from "./LocationMap.module.css";

const LocationMap = dynamic(
  () => import("./LocationMap").then((m) => m.LocationMap),
  {
    ssr: false,
    loading: () => (
      <div
        className={`${styles.locationMap} ${styles.locationMapPlaceholder}`}
        aria-hidden="true"
      />
    ),
  }
);

export function LocationMapLazy() {
  return <LocationMap />;
}
