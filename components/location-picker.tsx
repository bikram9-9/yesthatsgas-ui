"use client";

import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { MapPin } from "lucide-react";

interface LocationPickerProps {
  onLocationSelect: (latitude: number, longitude: number) => void;
}

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border">
      <Map
        mapboxAccessToken="your-mapbox-token"
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={(e) => {
          setMarker({ lat: e.lngLat.lat, lng: e.lngLat.lng });
          onLocationSelect(e.lngLat.lat, e.lngLat.lng);
        }}
      >
        {marker && (
          <Marker latitude={marker.lat} longitude={marker.lng}>
            <MapPin className="h-6 w-6 text-primary" />
          </Marker>
        )}
      </Map>
    </div>
  );
}