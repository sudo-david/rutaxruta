"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Users, ArrowRight, Leaf, Clock, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* NAV */}
      <nav className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter">
          Ruta<span className="text-blue-600">X</span>Ruta
        </h1>
        <div className="flex items-center gap-6">
          <Link href="#info" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
            ¿Cómo funciona?
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
          >
            Iniciar Sesión
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 inline-block mb-6">
            Movilidad Sostenible en Medellín
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6 italic">
            Comparte tu viaje, <span className="text-blue-600">reduce tu huella.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            La plataforma de carpooling diseñada para conectar a conductores y pasajeros en el Valle de Aburrá de forma segura y eficiente.
          </p>

          {/* TRUST INDICATOR */}
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-8 max-w-lg">
            <span className="text-xl mt-0.5">🎓</span>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-gray-900">Hecho por, para, y en beneficio</span> de los que estudiamos y trabajamos diariamente en el Valle de Aburrá.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/registro" className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all group">
              Empezar ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#info" className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all">
              Saber más
            </Link>
          </div>
        </motion.div>

        {/* TRIP CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative hidden md:flex justify-center items-center"
        >
          <div className="absolute -inset-6 bg-blue-100/50 rounded-[48px] blur-3xl pointer-events-none" />
          <TripCard />
        </motion.div>
      </header>

      {/* FEATURES */}
      <section id="info" className="bg-gray-50 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-black mb-4 italic">¿Por qué usar RutaXRuta?</h3>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck size={28} />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Seguridad"
              desc="Verificación de perfiles y roles específicos para conductores y pasajeros."
              benefit="→ Viaja con personas de confianza"
            />
            <FeatureCard
              icon={<MapPin size={28} />}
              iconBg="bg-green-50"
              iconColor="text-green-600"
              title="Rutas Locales"
              desc="Optimizado para Medellín y el área metropolitana con mapas precisos."
              benefit="→ Ideal para tu trayecto diario"
            />
            <FeatureCard
              icon={<Users size={28} />}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
              title="Comunidad"
              desc="Conecta con personas que realizan tu mismo trayecto diario."
              benefit="→ Menos carros, mejor ciudad"
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 inline-block mb-6">
              Únete hoy
            </span>
            <h3 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 italic">
              ¿Listo para tu <span className="text-blue-400">primer viaje?</span>
            </h3>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Regístrate gratis, encuentra compañeros de ruta y empieza a moverte de forma más inteligente por la ciudad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/registro"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all group"
              >
                Crear cuenta gratis <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Ya tengo cuenta
              </Link>
            </div>

            {/* Mini badges bajo los botones */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { icon: <Leaf size={14} />, label: 'Gratis para estudiantes' },
                { icon: <Clock size={14} />, label: 'Registro en minutos' },
                { icon: <Star size={14} />, label: 'Comunidad verificada' },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <span className="text-gray-500">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 RutaXRuta Medellín. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

/* ─── TRIP CARD ─────────────────────────────────────────────────────────────── */
function TripCard() {
  return (
    <div className="relative bg-white rounded-[28px] p-5 w-[300px] shadow-2xl border border-gray-100/80 z-10">
      <span className="absolute top-4 right-4 bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded-full">
        8 min
      </span>
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[11px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
          En camino
        </span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            CR
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-2 h-2" viewBox="0 0 10 10" fill="none">
              <path d="M2 5.5L4 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-none">Carlos Restrepo</p>
          <p className="text-xs text-gray-400 mt-0.5">⭐ 4.92 · 312 viajes</p>
        </div>
        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg whitespace-nowrap">
          KIA Sportage
        </span>
      </div>
      <div className="bg-gray-50 rounded-2xl p-3.5 mb-3 relative">
        <div
          className="absolute left-[27px] top-[44px] w-0.5 h-4"
          style={{ background: 'repeating-linear-gradient(to bottom, #CBD0D8 0px, #CBD0D8 4px, transparent 4px, transparent 8px)' }}
        />
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="4" fill="#378ADD" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900 leading-none">Laureles</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Recogida · 7:42 am</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M8 2C5.79 2 4 3.79 4 6c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 116.5 6 1.5 1.5 0 018 7.5z" fill="#E24B4A" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900 leading-none">Llegando a El Poblado</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Destino · est. 8:05 am</p>
          </div>
        </div>
      </div>
      <div className="mb-3 px-1">
        <div className="relative h-2 bg-gray-100 rounded-full mb-1">
          <div className="absolute left-0 top-0 h-2 w-[62%] rounded-full bg-gradient-to-r from-blue-400 to-green-500" />
          <div
            className="absolute top-1/2 text-base"
            style={{ left: '57%', transform: 'translateY(-65%)', animation: 'drive 2s ease-in-out infinite alternate' }}
          >
            🚗
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-2">
          <span>Laureles</span>
          <span>El Poblado</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { val: '4.2 km', lbl: 'Restantes' },
          { val: '8 min', lbl: 'ETA' },
          { val: '$4.800', lbl: 'Tu tarifa' },
        ].map(({ val, lbl }) => (
          <div key={lbl} className="bg-gray-50 rounded-xl py-2.5 text-center">
            <p className="text-[14px] font-bold text-gray-900 leading-none">{val}</p>
            <p className="text-[10px] text-gray-400 mt-1">{lbl}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mb-4">
        {[
          { initials: 'A', color: 'bg-blue-500' },
          { initials: 'M', color: 'bg-green-500' },
          { initials: 'T', color: 'bg-orange-500' },
        ].map(({ initials, color }, i) => (
          <div
            key={initials}
            className={`w-6 h-6 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold ${i > 0 ? '-ml-2' : ''}`}
          >
            {initials}
          </div>
        ))}
        <span className="text-xs text-gray-400 ml-1.5">3 pasajeros</span>
        <span className="ml-auto text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
          1 cupo libre
        </span>
      </div>
      <button className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v9M4 7l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Unirse al viaje
      </button>
      <style>{`
        @keyframes drive {
          from { transform: translateY(-65%) translateX(-2px); }
          to   { transform: translateY(-80%) translateX(2px); }
        }
      `}</style>
    </div>
  );
}

/* ─── FEATURE CARD ───────────────────────────────────────────────────────────── */
function FeatureCard({ icon, iconBg, iconColor, title, desc, benefit }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
    >
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-6 ${iconColor}`}>
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-gray-500 leading-relaxed mb-4">{desc}</p>
      <p className="text-sm font-semibold text-gray-400">{benefit}</p>
    </motion.div>
  );
}