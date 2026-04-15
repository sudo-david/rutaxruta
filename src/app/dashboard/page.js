"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Car, Search, MapPin, PlusCircle, LogOut, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Cargamos el mapa de forma dinámica para evitar errores de SSR
// Pasamos el rol del usuario para que el mapa active las funciones de búsqueda/rutas
const Mapa = dynamic(() => import('@/components/Mapa'), { 
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400">
      Cargando mapa de Medellín...
    </div>
  )
});

export default function DashboardPage() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userGuardado = localStorage.getItem('usuarioRutaX');
    if (userGuardado) {
      setUsuario(JSON.parse(userGuardado));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioRutaX');
    window.location.href = "/login";
  };

  if (!usuario) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-6 px-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter italic">
              Ruta<span className="text-blue-600">X</span>Ruta
            </h1>
            <p className="text-gray-500 flex items-center gap-2">
              Bienvenido, <span className="font-bold text-blue-600 uppercase">{usuario.nombre}</span> 
              <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 font-bold uppercase">
                <ShieldCheck size={12} /> {usuario.rol}
              </span>
            </p>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cerrarSesion}
            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut size={18} /> Salir
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto px-10 py-10 grid grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: ACCIONES */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 lg:col-span-4 space-y-6"
        >
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Panel de Acciones</h3>
            <div className="grid gap-4">
              {usuario.rol === 'conductor' ? (
                <>
                  <motion.button 
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 w-full p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-200"
                  >
                    <PlusCircle size={24} /> Publicar nueva ruta
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.03, y: -4, backgroundColor: "#eff6ff" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 w-full p-4 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl font-bold transition-colors"
                  >
                    <Car size={24} /> Gestionar vehículo
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button 
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 w-full p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-200"
                  >
                    <Search size={24} /> Buscar viajes en Medellín
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.03, y: -4, backgroundColor: "#f9fafb" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 w-full p-4 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-bold transition-colors"
                  >
                    <MapPin size={24} /> Mis lugares frecuentes
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* CARD DE ESTADÍSTICAS */}
          <motion.div 
            whileHover={{ rotate: -1 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <p className="text-blue-100 mb-2 font-medium">Viajes completados</p>
              <p className="text-6xl font-black italic">0</p>
              <div className="mt-6 pt-4 border-t border-white/20 text-sm">
                ¡Tu próxima ruta en <span className="font-bold underline">Medellín</span> te espera!
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA: MAPA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-12 lg:col-span-8"
        >
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Mapa de Cobertura</h3>
                <p className="text-sm text-gray-500 italic font-medium uppercase tracking-wider">
                   {usuario.rol === 'conductor' ? 'Define tu ruta (Origen y Destino)' : 'Busca direcciones cercanas'}
                </p>
              </div>
              <span className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black border border-green-100">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span> SISTEMA ACTIVO
              </span>
            </div>
            
            {/* AQUÍ PASAMOS EL ROL AL COMPONENTE DEL MAPA */}
            <Mapa rol={usuario.rol} />
            
            <div className="mt-6 grid grid-cols-2 gap-4">
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Estado</p>
                  <p className="text-sm text-gray-700 font-bold">
                    {usuario.rol === 'conductor' ? 'Esperando trazado' : 'Listo para buscar'}
                  </p>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Zona actual</p>
                  <p className="text-sm text-blue-600 font-bold italic">Medellín, Antioquia</p>
               </div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}