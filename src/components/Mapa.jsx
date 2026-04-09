"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Esto arregla que no se vean los iconos en Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Mapa() {
  const medellinCoords = [6.2442, -75.5812];

  return (
    <div className="h-[450px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
      <MapContainer center={medellinCoords} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={medellinCoords} icon={icon}>
          <Popup>
            <span className="font-bold">Medellín</span> <br /> El punto de partida de tu ruta.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}