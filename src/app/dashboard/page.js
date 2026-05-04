"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  TrendingUp, Clock, MapPin, Navigation, 
  PlusCircle, Users, CheckCircle, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

// Carga dinámica del mapa para optimizar performance
const Mapa = dynamic(() => import('@/components/Mapa'), { 
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full bg-gray-100 animate-pulse rounded-3xl flex flex-col items-center justify-center text-gray-400 gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black uppercase tracking-tighter">Sincronizando satélites...</p>
    </div>
  )
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
      fetchRutas();
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
      setInicio(null); setFin(null);
      fetchRutas(); 
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioRutaX');
    window.location.href = "/login";
  };

  if (!usuario) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-blue-600 font-black text-2xl italic"
      >
        Ruta<span className="text-gray-900">X</span>Ruta
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      <Navbar usuario={usuario} alCerrarSesion={cerrarSesion} />

      <main className="container mx-auto px-4 lg:px-8 py-6 grid grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: CONTROLES */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* TARJETA DE ESTADO DINÁMICA */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
                <Navigation size={80} />
             </div>
             <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Panel de Control</p>
             <h2 className="text-4xl font-black mb-1 italic">Hola, {usuario.nombre.split(' ')[0]}</h2>
             <div className="flex items-center gap-3 mt-4">
                <div className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {usuario.rol}
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                  <Clock size={14} /> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
             </div>
          </motion.div>

          {/* ACCIONES SEGÚN ROL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100"
          >
            {usuario.rol === 'conductor' ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <PlusCircle className="text-blue-600" size={24} />
                  <h3 className="text-xl font-black text-gray-900 italic">Nueva Ruta</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Vehículo</label>
                    <input 
                      placeholder="Placa (ej: ABC-123)" 
                      className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold placeholder:text-gray-300" 
                      onChange={(e) => setInfoExtra({...infoExtra, placa: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Hora de Salida</label>
                    <input 
                      type="time" 
                      className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold" 
                      onChange={(e) => setInfoExtra({...infoExtra, hora: e.target.value})} 
                    />
                  </div>
                </div>

                <button 
                  onClick={publicarRuta} 
                  disabled={!inicio || !fin}
                  className={`w-full p-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3 ${
                    inicio && fin 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <MapPin size={18} /> {inicio && fin ? 'Publicar Ahora' : 'Marca puntos en mapa'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-gray-900 italic flex items-center gap-2">
                    <Users className="text-blue-600" size={22} /> Viajes
                  </h3>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {rutas.length} Disponibles
                  </span>
                </div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence>
                    {rutas.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <AlertCircle className="mx-auto text-gray-300 mb-2" size={32} />
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">Esperando rutas...</p>
                      </div>
                    ) : (
                      rutas.map((r, index) => (
                        <motion.div 
                          key={r.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all group cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-black text-gray-900 text-base leading-none group-hover:text-blue-600 transition-colors uppercase tracking-tighter italic">{r.nombre_conductor}</p>
                              <p className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-widest">{r.placa}</p>
                            </div>
                            <div className="bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                              {r.hora_salida}
                            </div>
                          </div>
                          <button className="w-full bg-gray-50 group-hover:bg-blue-600 text-gray-900 group-hover:text-white py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-[0.15em]">
                            Solicitar Cupo
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: MAPA INTERACTIVO */}
        <div className="col-span-12 lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 h-full flex flex-col"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 px-2">
              <div>
                <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter">Explorar Medellín</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                  <TrendingUp size={14} className="text-green-500" /> Tráfico optimizado hoy
                </p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-5 py-2 rounded-full text-[10px] font-black border border-green-100 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> 
                SISTEMA EN VIVO
              </div>
            </div>
            
            <div className="flex-1 rounded-[2rem] overflow-hidden border border-gray-100 shadow-inner relative min-h-[400px]">
              <Mapa 
                rol={usuario.rol} 
                inicio={inicio} setInicio={setInicio} 
                fin={fin} setFin={setFin} 
              />
            </div>

            {/* INFO EXTRA FOOTER */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
               <div className="p-4 bg-blue-50/50 rounded-2xl flex flex-col justify-center border border-blue-100/50">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Puntos Marcados</p>
                  <p className="text-sm text-blue-700 font-black flex items-center gap-2">
                    {inicio ? <CheckCircle size={14}/> : <div className="w-3.5 h-3.5 rounded-full border border-blue-200" />} Origen
                  </p>
                  <p className="text-sm text-blue-700 font-black flex items-center gap-2 mt-1">
                    {fin ? <CheckCircle size={14}/> : <div className="w-3.5 h-3.5 rounded-full border border-blue-200" />} Destino
                  </p>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl flex flex-col justify-center border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Zona de Operación</p>
                  <p className="text-sm text-gray-900 font-black uppercase">Valle de Aburrá</p>
               </div>
               <div className="p-4 bg-gray-900 rounded-2xl flex flex-col justify-center border border-gray-800 shadow-lg">
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Próxima Salida</p>
                  <p className="text-sm text-white font-black italic">--:--</p>
               </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}