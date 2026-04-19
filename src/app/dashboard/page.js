"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Car, Search, MapPin, PlusCircle, LogOut, ShieldCheck, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
    const res = await fetch('/api/rutas');
    const data = await res.json();
    setRutas(data);
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
      fetchRutas(); // Actualizar lista
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioRutaX');
    window.location.href = "/login";
  };

  if (!usuario) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-6 px-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black italic text-gray-900">Ruta<span className="text-blue-600">X</span>Ruta</h1>
          <button onClick={cerrarSesion} className="bg-white border border-gray-200 text-red-500 font-bold flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors">
            <LogOut size={18}/> Salir
          </button>
        </div>
      </header>

      <main className="container mx-auto px-10 py-10 grid grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* STATS CARD */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl">
             <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Viajes Activos</p>
             <h2 className="text-5xl font-black mb-4 italic">{rutas.length}</h2>
             <div className="flex items-center gap-2 text-blue-100 text-sm">
               <TrendingUp size={16} /> <span>{usuario.rol === 'conductor' ? 'Gestionando rutas' : 'Disponibles hoy'}</span>
             </div>
          </div>

          {/* PANEL DE ACCIONES / LISTA */}
          {usuario.rol === 'conductor' ? (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Publicar Ruta</h3>
              <div className="space-y-4">
                <input 
                  placeholder="Placa (ej: ABC-123)" 
                  className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none" 
                  onChange={(e) => setInfoExtra({...infoExtra, placa: e.target.value})} 
                />
                <input 
                  type="time" 
                  className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none" 
                  onChange={(e) => setInfoExtra({...infoExtra, hora: e.target.value})} 
                />
                <button onClick={publicarRuta} className="w-full p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  Publicar Ruta
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Viajes Disponibles</h3>
              {rutas.length === 0 ? <p className="text-gray-400">No hay rutas publicadas...</p> : 
                rutas.map(r => (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={r.id} className="bg-gray-50 p-5 rounded-2xl mb-4 border border-gray-200">
                    <p className="font-bold text-blue-600">{r.nombre_conductor}</p>
                    <p className="text-sm text-gray-600">Placa: {r.placa} | Hora: {r.hora_salida}</p>
                    <button className="mt-4 w-full bg-black text-white py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">Solicitar Cupo</button>
                  </motion.div>
                ))
              }
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: MAPA */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Mapa de Cobertura</h3>
                <p className="text-sm text-gray-500">Área metropolitana</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black border border-green-100 animate-pulse">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> SISTEMA ACTIVO
              </div>
            </div>
            
            <Mapa 
              rol={usuario.rol} 
              inicio={inicio} setInicio={setInicio} 
              fin={fin} setFin={setFin} 
            />

            {/* FOOTER DEL MAPA */}
            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Estado Tráfico</p>
                  <p className="text-sm text-green-600 font-bold">Fluido</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Última actualización</p>
                  <p className="text-sm text-gray-900 font-bold flex items-center gap-2"><Clock size={16}/> Hace 2 min</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}