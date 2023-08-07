// Map.tsx
import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";

interface MapProps {
  dronePosition: { latitude: number; longitude: number };
  pathCoordinates: [number, number][];
}

const MapComp: React.FC<MapProps> = ({ dronePosition, pathCoordinates }) => {
  const mapRef = useRef<Map | null>(null);

  const [simulatedPosition, setSimulatedPosition] = useState<{
    latitude: number;
    longitude: number;
  }>(dronePosition);

  useEffect(() => {
    if (mapRef.current) return;
    mapboxgl.accessToken =
      "pk.eyJ1IjoidG92ZWNpMTM0NiIsImEiOiJjbGt6cHFqZHQwbG41M3FxcDBpa2o0djJhIn0.EeUIgA253vxMhEdgjcSOWQ"; // Replace with your actual Mapbox access token
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", // Replace with your preferred Mapbox style
      center: [dronePosition.longitude, dronePosition.latitude],
      zoom: 12,
    });

    const markerElement = document.createElement("div");
    markerElement.className = "drone-marker";

    new mapboxgl.Marker(markerElement)
      .setLngLat([dronePosition.longitude, dronePosition.latitude])
      .addTo(mapRef.current);

    // Draw the drone's path
    if (pathCoordinates.length > 1) {
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: pathCoordinates,
        },
      };

      mapRef.current.on("load", () => {
        if (!mapRef.current) return;
        mapRef.current.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          paint: {
            "line-width": 2,
            "line-color": "#ff0000",
          },
        });
      });
    }
  });

  useEffect(() => {
    // Update the drone position during the simulation
    setSimulatedPosition(dronePosition);
  }, [dronePosition]);

  return <div id="map"></div>;
};

export default MapComp;
