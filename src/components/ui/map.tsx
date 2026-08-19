"use client";

/**
 * mapcn-style Map + Marker components, hand-built on MapLibre GL.
 *
 * Note: this project's sandbox network allowlist doesn't include mapcn.dev,
 * so `npx shadcn add https://mapcn.dev/maps/map.json` can't reach the real
 * registry from here. This file reimplements the piece of mapcn's public API
 * this repo actually needs (a themed <Map> with a <Marker>) directly on
 * maplibre-gl, which mapcn itself wraps. If you have network access to
 * mapcn.dev, running the real install command will replace this file with
 * the upstream version (which additionally offers popups, tooltips, routes,
 * and controls) — this file is written to be a safe drop-in in the meantime.
 *
 * Tiles: OpenStreetMap raster tiles, not CARTO. mapcn's default CARTO
 * basemaps require a commercial license for non-grantee use; OSM's raw
 * tiles are free for reasonable-volume commercial use with attribution,
 * which MapLibre renders automatically via the style's attribution field.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";

const OSM_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
      minzoom: 0,
      maxzoom: 22,
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

const MapContext = createContext<maplibregl.Map | null>(null);

interface MapProps {
  /** [longitude, latitude] */
  center: [number, number];
  zoom?: number;
  className?: string;
  children?: ReactNode;
}

export function Map({ center, zoom = 14, className, children }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OSM_STYLE,
      center,
      zoom,
      minZoom: 10,
      maxZoom: 20,
      attributionControl: { compact: true },
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    mapRef.current = map;
    map.on("load", () => setMapInstance(map));

    return () => {
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setCenter(center);
    mapRef.current.setZoom(Math.min(Math.max(zoom, 10), 18));
  }, [center, zoom]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden",
        className
      )}
    >
      <MapContext.Provider value={mapInstance}>
        {mapInstance ? children : null}
      </MapContext.Provider>
    </div>
  );
}

interface MarkerProps {
  longitude: number;
  latitude: number;
  label?: string;
}

export function Marker({ longitude, latitude, label }: MarkerProps) {
  const map = useContext(MapContext);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const el = document.createElement("div");
    el.setAttribute("role", "img");

    if (label) {
      el.setAttribute("aria-label", label);
    }

    el.style.width = "28px";
    el.style.height = "28px";
    el.style.borderRadius = "50% 50% 50% 0";
    el.style.transform = "rotate(-45deg)";
    el.style.background = "var(--cg-gold, #C8973A)";
    el.style.border = "2px solid var(--cg-cream, #FAF6F0)";
    el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.35)";

    const marker = new maplibregl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    markerRef.current = marker;

    return () => {
      marker.remove();
      markerRef.current = null;
    };
  }, [map, longitude, latitude, label]);

  return null;
}