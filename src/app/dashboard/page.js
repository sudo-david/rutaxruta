"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
// Importamos la nueva Navbar
import Navbar from '@/components/Navbar';

const Mapa = dynamic(() => import('@/components/Mapa'), { 
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400">Cargando mapa...</div>
});

export default function DashboardPage() {
  const [usuario, setUsuario] = useState(null);
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [rutas, setRutas] = useState([]);
  const [infoExtra, setInfoExtra] = useState({ placa: '', hora: '' });

  useEffect(() => {
    const userGuardado = localStorage.getItem('usuarioRutaX');
    if (userGuardado) {
      const user = JSON.parse(userGuardado);
      setUsuario(user);
      if (user.rol === 'pasajero') fetchRutas();
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchRutas = async () => {
    try {
      const res = await fetch('/api/rutas');
      const data = await res.json();
      setRutas(data);
    } catch (error) {
      console.error("Error al obtener rutas:", error);
    }
  };

  const publicarRuta = async () => {
    if (!inicio || !fin) return alert("Marca el inicio y fin en el mapa");
    if (!infoExtra.placa || !infoExtra.hora) return alert("Completa la placa y la hora");

    const res = await fetch('/api/rutas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        usuario_id: usuario.id, 
        nombre_conductor: usuario.nombre, 
        origen: inicio, 
        destino: fin,
        ...infoExtra 
      })
    });
    
    if (res.ok) {
      alert("¡Ruta publicada con éxito!");
      setInicio(null); setFin(null);
      fetchRutas(); 
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioRutaX');
    window.location.href = "/login";
  };

  if (!usuario) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-bold">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* NAVBAR INTEGRADA */}
      <Navbar usuario={usuario} alCerrarSesion={cerrarSesion} />

      {/* Ajuste de padding horizontal para mobile (px-4) y desktop (md:px-10) */}
      <main className="container mx-auto px-4 md:px-10 py-6 md:py-10 grid grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: STATS Y FORMULARIO */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* STATS CARD - Con contraste alto y gradiente */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-100"
          >
             <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Viajes Activos</p>
             <h2 className="text-5xl font-black mb-4 italic">{rutas.length}</h2>
             <div className="flex items-center gap-2 text-blue-50 text-sm font-medium">
               <TrendingUp size={16} /> 
               <span>{usuario.rol === 'conductor' ? 'Gestionando tus rutas' : 'Rutas disponibles en Medellín'}</span>
             </div>
          </motion.div>

          {/* PANEL DE ACCIONES / LISTA */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            {usuario.rol === 'conductor' ? (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-gray-900 mb-2 italic">Publicar Ruta</h3>
                <input 
                  placeholder="Placa (ej: ABC-123)" 
                  className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400" 
                  onChange={(e) => setInfoExtra({...infoExtra, placa: e.target.value})} 
                />
                <input 
                  type="time" 
                  className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                  onChange={(e) => setInfoExtra({...infoExtra, hora: e.target.value})} 
                />
                <button 
                  onClick={publicarRuta} 
                  className="w-full p-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
                >
                  Publicar Ruta
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-6 italic">Viajes Disponibles</h3>
                <div className="space-y-4">
                  {rutas.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 font-medium">No hay rutas publicadas hoy...</div>
                  ) : (
                    rutas.map(r => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        key={r.id} 
                        className="bg-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors"
                      >
                        <p className="font-black text-blue-700 uppercase text-sm tracking-tight">{r.nombre_conductor}</p>
                        <p className="text-sm text-gray-600 font-medium">Placa: {r.placa} | Hora: {r.hora_salida}</p>
                        <button className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl text-xs font-black hover:bg-black transition-colors uppercase tracking-widest">
                          Solicitar Cupo
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: MAPA */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 italic">Mapa de Cobertura</h3>
                <p className="text-sm text-gray-500 font-medium">Selecciona tus puntos de origen y destino</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-black border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                SISTEMA ACTIVO
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
              <Mapa 
                rol={usuario.rol} 
                inicio={inicio} setInicio={setInicio} 
                fin={fin} setFin={setFin} 
              />
            </div>

            {/* FOOTER DEL MAPA - Reforzado con contraste */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Estado Tráfico</p>
                  <p className="text-sm text-green-700 font-black">Fluido</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Actualización</p>
                  <p className="text-sm text-gray-900 font-black flex items-center gap-2">
                    <Clock size={16} className="text-blue-600"/> 2m
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}