"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Define an interface for POI to be used across components
interface POI {
  id: string;
  name: string;
  category: string;
  coordinates: { lat: number; lng: number };
  imageUrl: {
    url: string;
    width: number;
    height: number;
    photo_reference: string;
  };
}

interface MapProps {
  pois: POI[];
  selectedPOI: POI | null;
  onMarkerClick: (poi: POI) => void;
  cityCenter: [number, number];
}

const categoryStyles: {
  [key: string]: { icon: string; color: string };
} = {
  Attractions: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 9.5V5.25A1.25 1.25 0 0 1 5.75 4h12.5A1.25 1.25 0 0 1 19.5 5.25V9.5"/><path d="M4 20h16"/><path d="M5 20V10h14v10"/><path d="M12 20v-5"/></svg>`,
    color: "#800080",
  },
  Restaurants: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v15"/></svg>`,
    color: "#D2691E",
  },
  Shopping: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    color: "#4682B4",
  },
  "Nature & Parks": {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-2 0-3-2-3-4s1-4 3-4 3 2 3 4-1 4-3 4Z"/><path d="M12 14V2"/><path d="m15 6-3-3-3 3"/></svg>`,
    color: "#228B22",
  },
  Nightlife: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-4-3-6"/><path d="M12 22a7 7 0 0 1-7-7c0-2 1-4 3-6"/><path d="M12 22v-4"/><path d="m17 15-5-5-5 5h10Z"/></svg>`,
    color: "#4B0082",
  },
  "Hidden Gems": {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M12 22V9"/><path d="m3.5 8.5 8.5 4 8.5-4"/><path d="M2 9h20"/></svg>`,
    color: "#FFD700",
  },
  default: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>`,
    color: "#808080",
  },
};

const createCustomIcon = (poi: POI, isSelected: boolean) => {
  const style = categoryStyles[poi.category] || categoryStyles.default;
  const selectionClass = isSelected
    ? "custom-marker-container selected"
    : "custom-marker-container";

  return L.divIcon({
    html: `
      <div class="${selectionClass}">
        <div class="custom-marker-icon" style="background-color: ${style.color};">
          ${style.icon}
        </div>
        <div class="custom-marker-label">${poi.name}</div>
      </div>
    `,
    className: "custom-leaflet-marker",
    iconSize: [80, 40],
    iconAnchor: [40, 40],
  });
};

function MapBounds({
  pois,
  cityCenter,
}: {
  pois: POI[];
  cityCenter: [number, number];
}) {
  const map = useMap();
  useEffect(() => {
    // Validate city center coordinates
    if (
      !cityCenter ||
      cityCenter.length !== 2 ||
      typeof cityCenter[0] !== "number" ||
      typeof cityCenter[1] !== "number" ||
      isNaN(cityCenter[0]) ||
      isNaN(cityCenter[1])
    ) {
      console.warn("Invalid city center coordinates:", cityCenter);
      return;
    }

    if (pois.length > 0) {
      // Filter out POIs with invalid coordinates
      const validPois = pois.filter(
        (poi) =>
          poi.coordinates &&
          typeof poi.coordinates.lat === "number" &&
          typeof poi.coordinates.lng === "number" &&
          !isNaN(poi.coordinates.lat) &&
          !isNaN(poi.coordinates.lng)
      );

      if (validPois.length > 0) {
        const bounds = new L.LatLngBounds(
          validPois.map((p) => [p.coordinates.lat, p.coordinates.lng])
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        // If no valid POIs, center on the city
        map.setView(cityCenter, 13);
      }
    } else {
      // If no POIs, center on the city
      map.setView(cityCenter, 13);
    }
  }, [pois, map, cityCenter]);
  return null;
}

function ZoomHandler() {
  const map = useMap();

  useEffect(() => {
    const setZoomClass = () => {
      const zoom = map.getZoom();
      const container = map.getContainer();
      // Remove any existing zoom-level-* classes
      for (let i = 0; i <= 20; i++) {
        container.classList.remove(`zoom-level-${i}`);
      }
      container.classList.add(`zoom-level-${zoom}`);
    };

    map.on("zoomend", setZoomClass);
    setZoomClass(); // Set on initial render

    return () => {
      map.off("zoomend", setZoomClass);
    };
  }, [map]);

  return null;
}

export function Map({
  pois,
  selectedPOI,
  onMarkerClick,
  cityCenter,
}: MapProps) {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <>
      <style>
        {`
          .custom-leaflet-marker {
            position: relative;
            width: 0 !important;
            height: 0 !important;
            border: none;
            background: transparent;
          }
          .custom-marker-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.2s ease-out;
          }
          .custom-marker-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          }
          .custom-marker-label {
            margin-top: 5px;
            font-size: 11px;
            font-weight: 600;
            color: #333;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 2px 8px;
            border-radius: 10px;
            white-space: nowrap;
          }
          .zoom-level-10 .custom-marker-container { transform: scale(0.6); }
          .zoom-level-11 .custom-marker-container { transform: scale(0.7); }
          .zoom-level-12 .custom-marker-container { transform: scale(0.8); }
          .zoom-level-13 .custom-marker-container { transform: scale(1.0); }
          .zoom-level-14 .custom-marker-container { transform: scale(1.1); }
          .zoom-level-15 .custom-marker-container { transform: scale(1.2); }
          .zoom-level-12 .custom-marker-label { display: none; }
          .zoom-level-11 .custom-marker-label { display: none; }
          .zoom-level-10 .custom-marker-label { display: none; }
          .zoom-level-9 .custom-marker-label { display: none; }
          .custom-marker-container.selected {
            transform: scale(1.2);
            z-index: 1000;
          }
          .custom-marker-container.selected .custom-marker-icon {
            border-color: #A755F7;
          }
        `}
      </style>
      <MapContainer
        center={cityCenter}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {pois
          .filter(
            (poi) =>
              poi.coordinates &&
              typeof poi.coordinates.lat === "number" &&
              typeof poi.coordinates.lng === "number" &&
              !isNaN(poi.coordinates.lat) &&
              !isNaN(poi.coordinates.lng)
          )
          .map((poi) => (
            <Marker
              key={poi.id}
              position={[poi.coordinates.lat, poi.coordinates.lng]}
              icon={createCustomIcon(poi, selectedPOI?.id === poi.id)}
              eventHandlers={{
                click: () => onMarkerClick(poi),
              }}
            />
          ))}
        <MapBounds pois={pois} cityCenter={cityCenter} />
        <ZoomHandler />
      </MapContainer>
    </>
  );
}
