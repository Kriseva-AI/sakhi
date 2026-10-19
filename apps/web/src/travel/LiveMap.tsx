import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Point, Place, Route } from "./types";
export default function LiveMap({
  centre,
  places,
  selected,
  route,
  select,
  move,
}: {
  centre: Point;
  places: Place[];
  selected: Place | null;
  route: Route | null;
  select: (p: Place) => void;
  move: (p: Point) => void;
}) {
  const host = useRef<HTMLDivElement>(null),
    map = useRef<L.Map | null>(null),
    layer = useRef<L.LayerGroup | null>(null);
  const selectRef = useRef(select),
    moveRef = useRef(move);
  selectRef.current = select;
  moveRef.current = move;
  const [status, setStatus] = useState("Loading map tiles…");
  useEffect(() => {
    if (!host.current) return;
    const instance = L.map(host.current, {
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: true,
    }).setView([centre.lat, centre.lon], 14);
    map.current = instance;
    let failures = 0;
    const tile = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 6,
      crossOrigin: "anonymous",
      referrerPolicy: "origin",
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
    });
    tile.on("loading", () => {
      failures = 0;
    });
    tile.on("load", () =>
      setStatus(
        failures
          ? "Some map tiles are unavailable. The place list still works."
          : "Map loaded. Place availability is unverified.",
      ),
    );
    tile.on("tileerror", () => {
      failures++;
      setStatus("Some map tiles are unavailable. The place list still works.");
    });
    tile.addTo(instance);
    layer.current = L.layerGroup().addTo(instance);
    instance.on("moveend", () => {
      const c = instance.getCenter();
      moveRef.current({
        lat: Math.round(c.lat * 1000) / 1000,
        lon: Math.round(c.lng * 1000) / 1000,
      });
    });
    return () => {
      instance.remove();
      map.current = null;
    };
    // The view has its own pan state; only explicit city changes remount this component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const group = layer.current;
    if (!group) return;
    group.clearLayers();
    L.circleMarker([centre.lat, centre.lon], {
      radius: 5,
      color: "#131013",
      fillColor: "#ffffff",
      fillOpacity: 1,
      weight: 2,
    }).addTo(group);
    for (const place of places) {
      const marker = L.circleMarker([place.lat, place.lon], {
        radius: selected?.id === place.id ? 11 : 7,
        color: "#131013",
        fillColor: "#fb3d85",
        fillOpacity: 1,
        weight: 2,
      }).addTo(group);
      const label = document.createElement("span");
      label.textContent = place.name;
      marker.bindTooltip(label);
      marker.on("click", () => selectRef.current(place));
    }
    if (route)
      L.polyline(
        route.coordinates.map(([lon, lat]) => [lat, lon]),
        {
          color: "#131013",
          weight: 5,
          opacity: 0.85,
          dashArray: route.mode === "foot" ? "6 8" : undefined,
        },
      ).addTo(group);
  }, [centre, places, selected, route]);
  return (
    <div className="real-map">
      <div
        ref={host}
        className="leaflet-host"
        role="region"
        aria-label="Interactive OpenStreetMap. The same places are listed below."
      />
      <p className="map-load-status" role="status">
        {status}
      </p>
    </div>
  );
}
