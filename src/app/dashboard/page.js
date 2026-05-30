"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  TrendingUp, Clock, MapPin, Navigation,
  PlusCircle, Users, CheckCircle, AlertCircle,
  ArrowRight, Car, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

const Mapa = dynamic(() => import('@/components/Mapa'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[400px] bg-gray-100 animate-pulse rounded-[2rem] flex flex-col items-center justify-center text-gray-400 gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="font-black uppercase tracking-tighter text-sm">Sincronizando satélites...</p>
    </div>
  ),
});

// Helper para formatear hora_salida desde DATETIME de MySQL
const formatHora = (valor) => {
  if (!valor) return '--:--';
  const date = new Date(valor);
  if (isNaN(date)) return '--:--';
  return date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
};

export default function DashboardPage() {
  const [usuario, setUsuario] = useState(null);
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [rutas, setRutas] = useState([]);
  const [infoExtra, setInfoExtra] = useState({ placa: '', hora: '' });
  const [hora, setHora] = useState('');

  useEffect(() => {
    const userGuardado = localStorage.getItem('usuarioRutaX');
    if (userGuardado) {
      const user = JSON.parse(userGuardado);
      setUsuario(user);
      fetchRutas();
    } else {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    const tick = () =>
      setHora(new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fetchRutas = async () => {
    try {
      const res = await fetch('/api/rutas');
      const data = await res.json();
      setRutas(data);
    } catch (error) {
      console.error('Error al obtener rutas:', error);
    }
  };

  const publicarRuta = async () => {
    if (!inicio || !fin) return alert('Marca el inicio y fin en el mapa');
    if (!infoExtra.placa || !infoExtra.hora) return alert('Completa la placa y la hora');
    const res = await fetch('/api/rutas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id: usuario.id,
        nombre_conductor: usuario.nombre,
        origen: inicio,
        destino: fin,
        ...infoExtra,
      }),
    });
    if (res.ok) {
      setInicio(null);
      setFin(null);
      fetchRutas();
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioRutaX');
    window.location.href = '/login';
  };

  if (!usuario)
    return (
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
    <div className="min-h-screen bg-[#F4F6FA] pb-12">
      <Navbar usuario={usuario} alCerrarSesion={cerrarSesion} />

      <main className="container mx-auto px-4 lg:px-8 py-6 grid grid-cols-12 gap-6">

        {/* ── COLUMNA IZQUIERDA ── */}
        <div className="col-span-12 lg:col-span-4 space-y-5">

          {/* Tarjeta saludo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 p-7 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute -bottom-6 -right-6 opacity-[0.07] group-hover:scale-110 transition-transform duration-500">
              <Navigation size={130} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />

            <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-3">
              Panel de Control
            </p>
            <h2 className="text-4xl font-black italic leading-none mb-4">
              Hola,<br />
              <span className="text-white">{usuario.nombre.split(' ')[0]}</span>
            </h2>

            <div className="flex items-center gap-3">
              <span className="bg-blue-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {usuario.rol}
              </span>
              <span className="flex items-center gap-1.5 text-gray-400 text-xs font-bold tabular-nums">
                <Clock size={13} /> {hora}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-white/10">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Rutas hoy</p>
                <p className="text-2xl font-black text-white mt-0.5">{rutas.length}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Zona</p>
                <p className="text-sm font-black text-white mt-0.5 leading-tight">Valle de<br />Aburrá</p>
              </div>
            </div>
          </motion.div>

          {/* Panel de acciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-[2rem] shadow-lg shadow-blue-900/5 border border-gray-100"
          >
            {usuario.rol === 'conductor' ? (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                    <PlusCircle className="text-blue-600" size={18} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 italic">Nueva Ruta</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-1">
                      Vehículo
                    </label>
                    <input
                      placeholder="Placa (ej: ABC-123)"
                      className="w-full p-3.5 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all font-bold placeholder:text-gray-300 text-sm"
                      onChange={(e) => setInfoExtra({ ...infoExtra, placa: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-1">
                      Hora de Salida
                    </label>
                    <input
                      type="time"
                      className="w-full p-3.5 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all font-bold text-sm"
                      onChange={(e) => setInfoExtra({ ...infoExtra, hora: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Puntos en mapa</p>
                  <div className="flex items-center gap-2">
                    {inicio
                      ? <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />}
                    <span className={`text-sm font-bold ${inicio ? 'text-green-600' : 'text-gray-400'}`}>
                      {inicio ? 'Origen marcado' : 'Marca el origen'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fin
                      ? <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />}
                    <span className={`text-sm font-bold ${fin ? 'text-green-600' : 'text-gray-400'}`}>
                      {fin ? 'Destino marcado' : 'Marca el destino'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={publicarRuta}
                  disabled={!inicio || !fin}
                  className={`w-full p-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    inicio && fin
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <MapPin size={16} />
                  {inicio && fin ? 'Publicar ruta' : 'Completa el mapa'}
                </button>
              </div>
            ) : (
              /* ── PASAJERO ── */
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Users className="text-blue-600" size={18} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 italic">Viajes</h3>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tight border border-blue-100">
                    {rutas.length} disponibles
                  </span>
                </div>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {rutas.length === 0 ? (
                      <div className="text-center py-14 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="text-gray-300" size={24} />
                        </div>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">Esperando rutas...</p>
                        <p className="text-gray-300 text-xs mt-1">Los conductores publicarán pronto</p>
                      </div>
                    ) : (
                      rutas.map((r, index) => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all group cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                                {(r.origen ?? r.nombre_conductor ?? '?').charAt(0)}
                              </div>
                              <div>
                                <p className="font-black text-gray-900 text-sm leading-none group-hover:text-blue-600 transition-colors italic">
                                  {r.origen ?? r.nombre_conductor ?? 'Conductor'}
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold mt-0.5 flex items-center gap-1">
                                  <Car size={10} /> {r.destino}
                                </p>
                              </div>
                            </div>
                            {/* ✅ hora formateada en tarjetas de pasajero */}
                            <span className="bg-gray-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg tabular-nums">
                              {formatHora(r.hora_salida)}
                            </span>
                          </div>
                          <button className="w-full bg-gray-50 group-hover:bg-blue-600 text-gray-500 group-hover:text-white py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest flex items-center justify-center gap-1.5">
                            Solicitar cupo <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
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

        {/* ── COLUMNA DERECHA: MAPA ── */}
        <div className="col-span-12 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-5 md:p-6 rounded-[2rem] shadow-lg shadow-blue-900/5 border border-gray-100 h-full flex flex-col"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 mb-5 px-1">
              <div>
                <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter">Explorar Medellín</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-green-500" /> Tráfico optimizado hoy
                </p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-[10px] font-black border border-green-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Sistema en vivo
              </div>
            </div>

            <div className="flex-1 rounded-[1.5rem] overflow-hidden border border-gray-100 relative min-h-[380px]">
              <Mapa
                rol={usuario.rol}
                inicio={inicio} setInicio={setInicio}
                fin={fin} setFin={setFin}
              />
            </div>

            {/* Footer del mapa */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100/60">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2.5">Puntos marcados</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {inicio
                      ? <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                      : <div className="w-3 h-3 rounded-full border-2 border-blue-200 flex-shrink-0" />}
                    <span className={`text-xs font-bold ${inicio ? 'text-green-600' : 'text-blue-400'}`}>Origen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fin
                      ? <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                      : <div className="w-3 h-3 rounded-full border-2 border-blue-200 flex-shrink-0" />}
                    <span className={`text-xs font-bold ${fin ? 'text-green-600' : 'text-blue-400'}`}>Destino</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Zona de operación</p>
                <p className="text-sm font-black text-gray-900 uppercase leading-tight">Valle de Aburrá</p>
                <p className="text-[10px] text-gray-400 font-bold mt-1">Medellín · Área metro</p>
              </div>

              {/* Próxima salida — ✅ hora formateada */}
              <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800 relative overflow-hidden">
                <div className="absolute -right-3 -bottom-3 opacity-10">
                  <Zap size={60} />
                </div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Próxima salida</p>
                {rutas.length > 0 ? (
                  <>
                    <p className="text-lg font-black text-white tabular-nums">
                      {formatHora(rutas[0].hora_salida)}
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold mt-0.5 italic">
                      {rutas[0].origen ?? 'Conductor'}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-black text-gray-600 italic">--:--</p>
                    <p className="text-[10px] text-gray-600 font-bold mt-0.5">Sin rutas aún</p>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}