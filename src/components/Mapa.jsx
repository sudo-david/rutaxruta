"use client";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

// Iconos personalizados
const iconoInicio = L.divIcon({
  html: `<div style="color: #2563eb;"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg></div>`,
  className: "custom-leaflet-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const iconoFin = L.divIcon({
  html: `<div style="color: #dc2626;"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg></div>`,
  className: "custom-leaflet-icon",
  iconSize: [32, 32],
  iconAnchor: [4, 32],
});

// Estilo para asegurar que el buscador sea legible
const estiloBuscador = `
  .leaflet-control-geocoder input {
    color: #1f2937 !important;
    background-color: white !important;
    padding: 8px !important;
    border-radius: 8px !important;
    border: 1px solid #d1d5db !important;
  }
`;

function Buscador({ onLocationSelect }) {
  const map = useMap();
  useEffect(() => {
    const control = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: "Busca una dirección...",
    })
      .on("markgeocode", (e) => {
        const latlng = e.geocode.center;
        map.setView(latlng, 16);
        onLocationSelect(latlng);
      })
      .addTo(map);
    return () => map.removeControl(control);
  }, [map]);
  return <style>{estiloBuscador}</style>;
}

export default function Mapa({ rol, inicio, setInicio, fin, setFin }) {
  const medellinCoords = [6.2442, -75.5812];

  const ManejadorClics = () => {
    useMapEvents({
      click(e) {
        if (rol === 'conductor') {
          if (!inicio) setInicio(e.latlng);
          else if (!fin) setFin(e.latlng);
          else { setInicio(e.latlng); setFin(null); }
        }
      },
    });
    return null;
  };

  return (
    <div className="h-[450px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100 relative">
      <MapContainer center={medellinCoords} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Buscador onLocationSelect={(coords) => {
          if (rol === 'conductor' && !inicio) setInicio(coords);
          else if (rol === 'pasajero') setInicio(coords);
        }} />
        <ManejadorClics />

        {inicio && <Marker position={inicio} icon={iconoInicio}><Popup>Inicio</Popup></Marker>}
        {fin && <Marker position={fin} icon={iconoFin}><Popup>Destino</Popup></Marker>}
      </MapContainer>
    </div>
  );
}