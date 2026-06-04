"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  TrendingUp, Clock, MapPin, Navigation,
  PlusCircle, Users, CheckCircle, AlertCircle,
  ArrowRight, Car, Zap
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

const Mapa = dynamic(() => import('@/components/Mapa'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[280px] bg-gray-100 animate-pulse rounded-[1.5rem] flex flex-col items-center justify-center text-gray-400 gap-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="font-black uppercase tracking-tighter text-xs">Sincronizando satélites...</p>
    </div>
  ),
});

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
  const [vistaMovil, setVistaMovil] = useState('panel');

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
        <p className="text-blue-600 font-black text-2xl italic animate-pulse">
          Ruta<span className="text-gray-900">X</span>Ruta
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-6 lg:pb-12">
      <Navbar usuario={usuario} alCerrarSesion={cerrarSesion} />

      {/* Tabs móvil — solo < lg */}
      <div className="lg:hidden flex gap-2 px-4 pt-4 pb-2">
        <button
          onClick={() => setVistaMovil('panel')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-black uppercase tracking-tight transition-all ${
            vistaMovil === 'panel' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200'
          }`}
        >
          Panel
        </button>
        <button
          onClick={() => setVistaMovil('mapa')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-black uppercase tracking-tight transition-all ${
            vistaMovil === 'mapa' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200'
          }`}
        >
          Mapa
        </button>
      </div>

      <main className="container mx-auto px-4 lg:px-8 py-4 lg:py-6 grid grid-cols-12 gap-4 lg:gap-6">

        {/* ── COLUMNA IZQUIERDA ── */}
        <div className={`col-span-12 lg:col-span-4 space-y-4 lg:space-y-5 ${vistaMovil === 'mapa' ? 'hidden lg:block' : 'block'}`}>

          {/* Tarjeta saludo */}
          <div className="bg-gray-900 p-5 md:p-7 rounded-[1.75rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-6 opacity-[0.07] group-hover:scale-110 transition-transform duration-500">
              <Navigation size={110} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />

            <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2">
              Panel de Control
            </p>
            <h2 className="text-3xl md:text-4xl font-black italic leading-none mb-4">
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

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Rutas hoy</p>
                <p className="text-2xl font-black text-white mt-0.5">{rutas.length}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Zona</p>
                <p className="text-sm font-black text-white mt-0.5 leading-tight">Valle de<br />Aburrá</p>
              </div>
            </div>
          </div>

          {/* Panel de acciones */}
          <div className="bg-white p-5 md:p-6 rounded-[1.75rem] shadow-lg shadow-blue-900/5 border border-gray-100">
            {usuario.rol === 'conductor' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PlusCircle className="text-blue-600" size={18} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 italic">Nueva Ruta</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-1">Vehículo</label>
                    <input
                      placeholder="Placa (ej: ABC-123)"
                      className="w-full p-3.5 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all font-bold placeholder:text-gray-300 text-sm"
                      onChange={(e) => setInfoExtra({ ...infoExtra, placa: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-1">Hora de Salida</label>
                    <input
                      type="time"
                      className="w-full p-3.5 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all font-bold text-sm"
                      onChange={(e) => setInfoExtra({ ...infoExtra, hora: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100 space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Puntos en mapa</p>
                  <div className="flex items-center gap-2">
                    {inicio ? <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />}
                    <span className={`text-sm font-bold ${inicio ? 'text-green-600' : 'text-gray-400'}`}>{inicio ? 'Origen marcado' : 'Marca el origen'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fin ? <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />}
                    <span className={`text-sm font-bold ${fin ? 'text-green-600' : 'text-gray-400'}`}>{fin ? 'Destino marcado' : 'Marca el destino'}</span>
                  </div>
                </div>

                {(!inicio || !fin) && (
                  <button
                    onClick={() => setVistaMovil('mapa')}
                    className="w-full lg:hidden p-3.5 rounded-2xl font-black text-sm uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center gap-2"
                  >
                    <MapPin size={15} /> Ir al mapa
                  </button>
                )}

                <button
                  onClick={publicarRuta}
                  disabled={!inicio || !fin}
                  className={`w-full p-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    inicio && fin ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <MapPin size={16} />
                  {inicio && fin ? 'Publicar ruta' : 'Completa el mapa'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="text-blue-600" size={18} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 italic">Viajes</h3>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tight border border-blue-100">
                    {rutas.length} disponibles
                  </span>
                </div>

                <div className="space-y-3 max-h-[50vh] lg:max-h-[420px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {rutas.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="text-gray-300" size={24} />
                        </div>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">Esperando rutas...</p>
                        <p className="text-gray-300 text-xs mt-1">Los conductores publicarán pronto</p>
                      </div>
                    ) : (
                      rutas.map((r) => (
                        <div
                          key={r.id}
                          className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                                {(r.origen ?? r.nombre_conductor ?? '?').charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-black text-gray-900 text-sm leading-none group-hover:text-blue-600 transition-colors italic truncate max-w-[120px]">
                                  {r.origen ?? r.nombre_conductor ?? 'Conductor'}
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold mt-0.5 flex items-center gap-1">
                                  <Car size={10} /> {r.destino}
                                </p>
                              </div>
                            </div>
                            <span className="bg-gray-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg tabular-nums flex-shrink-0">
                              {formatHora(r.hora_salida)}
                            </span>
                          </div>
                          <button className="w-full bg-gray-50 group-hover:bg-blue-600 text-gray-500 group-hover:text-white py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest flex items-center justify-center gap-1.5">
                            Solicitar cupo <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── COLUMNA DERECHA: MAPA ── */}
        <div className={`col-span-12 lg:col-span-8 ${vistaMovil === 'panel' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white p-4 md:p-6 rounded-[1.75rem] shadow-lg shadow-blue-900/5 border border-gray-100 flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4 px-1">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 italic tracking-tighter">Explorar Medellín</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-green-500" /> Tráfico optimizado hoy
                </p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black border border-green-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Sistema en vivo
              </div>
            </div>

            <div className="rounded-[1.25rem] overflow-hidden border border-gray-100 relative"
              style={{ height: 'clamp(280px, 45vw, 480px)' }}>
              <Mapa
                rol={usuario.rol}
                inicio={inicio} setInicio={setInicio}
                fin={fin} setFin={setFin}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-3 md:p-4 bg-blue-50/60 rounded-2xl border border-blue-100/60">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Puntos marcados</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    {inicio ? <CheckCircle size={12} className="text-green-500 flex-shrink-0" /> : <div className="w-3 h-3 rounded-full border-2 border-blue-200 flex-shrink-0" />}
                    <span className={`text-xs font-bold ${inicio ? 'text-green-600' : 'text-blue-400'}`}>Origen</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {fin ? <CheckCircle size={12} className="text-green-500 flex-shrink-0" /> : <div className="w-3 h-3 rounded-full border-2 border-blue-200 flex-shrink-0" />}
                    <span className={`text-xs font-bold ${fin ? 'text-green-600' : 'text-blue-400'}`}>Destino</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block p-3 md:p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Zona de operación</p>
                <p className="text-sm font-black text-gray-900 uppercase leading-tight">Valle de Aburrá</p>
                <p className="text-[10px] text-gray-400 font-bold mt-1">Medellín · Área metro</p>
              </div>

              <div className="p-3 md:p-4 bg-gray-900 rounded-2xl border border-gray-800 relative overflow-hidden">
                <div className="absolute -right-3 -bottom-3 opacity-10"><Zap size={50} /></div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Próxima salida</p>
                {rutas.length > 0 ? (
                  <>
                    <p className="text-base md:text-lg font-black text-white tabular-nums">{formatHora(rutas[0].hora_salida)}</p>
                    <p className="text-[10px] text-gray-500 font-bold mt-0.5 italic truncate">{rutas[0].origen ?? 'Conductor'}</p>
                  </>
                ) : (
                  <>
                    <p className="text-base font-black text-gray-600 italic">--:--</p>
                    <p className="text-[10px] text-gray-600 font-bold mt-0.5">Sin rutas aún</p>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => setVistaMovil('panel')}
              className="mt-3 lg:hidden w-full py-3 rounded-2xl text-sm font-black uppercase tracking-tight text-gray-500 bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-all"
            >
              ← Volver al panel
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}