"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

// --- CONFIGURACIÓN DE ICONOS PERSONALIZADOS ---
// Icono de Aguja (Inicio)
const iconoInicio = L.divIcon({
  html: `<div style="color: #2563eb;">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
        </div>`,
  className: "custom-leaflet-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Icono de Bandera (Fin)
const iconoFin = L.divIcon({
  html: `<div style="color: #dc2626;">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
        </div>`,
  className: "custom-leaflet-icon",
  iconSize: [32, 32],
  iconAnchor: [4, 32],
});

// --- ESTILO PARA ARREGLAR LA BARRA DE BÚSQUEDA ---
const estiloBuscador = `
  .leaflet-control-geocoder input {
    color: #1f2937 !important; /* Gris oscuro/Negro */
    background-color: white !important;
    padding: 8px !important;
    border-radius: 4px !important;
  }
  .leaflet-control-geocoder-form {
    display: flex;
    align-items: center;
  }
`;

function Buscador({ onLocationSelect }) {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    const control = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: "Busca una dirección...",
      errorMessage: "No encontrado"
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

export default function Mapa({ rol }) {
  const [puntoInicio, setPuntoInicio] = useState(null);
  const [puntoFin, setPuntoFin] = useState(null);
  const medellinCoords = [6.2442, -75.5812];

  const ManejadorClics = () => {
    useMapEvents({
      click(e) {
        if (rol === 'conductor') {
          if (!puntoInicio) setPuntoInicio(e.latlng);
          else if (!puntoFin) setPuntoFin(e.latlng);
          else {
            setPuntoInicio(e.latlng);
            setPuntoFin(null);
          }
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
          if (rol === 'conductor' && !puntoInicio) setPuntoInicio(coords);
          else if (rol === 'pasajero') setPuntoInicio(coords);
        }} />

        <ManejadorClics />

        {puntoInicio && (
          <Marker position={puntoInicio} icon={iconoInicio}>
            <Popup>
              <span className="font-bold text-blue-600">Punto de Partida</span>
            </Popup>
          </Marker>
        )}

        {puntoFin && (
          <Marker position={puntoFin} icon={iconoFin}>
            <Popup>
              <span className="font-bold text-red-600">Destino Final</span>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {rol === 'conductor' && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white p-3 rounded-xl shadow-xl border border-blue-100 transition-all animate-bounce-short">
          <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest text-center">Ruta</p>
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${puntoInicio ? 'bg-blue-600' : 'bg-gray-200 animate-pulse'}`}></div>
             <div className="w-8 h-0.5 bg-gray-100"></div>
             <div className={`w-3 h-3 rounded-full ${puntoFin ? 'bg-red-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>
      )}
    </div>
  );
}