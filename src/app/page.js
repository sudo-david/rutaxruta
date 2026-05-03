"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, ShieldCheck, MapPin, Users, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* NAV SIMPLE */}
      <nav className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter">
          Ruta<span className="text-blue-600">X</span>Ruta
        </h1>
        <Link 
          href="/login" 
          className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
        >
          Iniciar Sesión
        </Link>
      </nav>

      {/* HERO SECTION RESPONSIVE */}
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
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/registro" className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all group">
              Empezar ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#info" className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all">
              Saber más
            </Link>
          </div>
        </motion.div>

        {/* ILUSTRACIÓN / IMAGEN (Oculta en móviles muy pequeños o simplificada) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative hidden md:block"
        >
          <div className="absolute -inset-4 bg-blue-100/50 rounded-[40px] blur-3xl" />
          <div className="relative bg-white border border-gray-100 p-4 rounded-[32px] shadow-2xl">
             <div className="bg-gray-50 rounded-[24px] h-[300px] lg:h-[400px] flex items-center justify-center">
                <Car size={120} className="text-blue-600 opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 mb-4 border border-blue-50">
                    <div className="w-10 h-10 bg-green-500 rounded-full animate-pulse" />
                    <div className="space-y-1">
                      <div className="h-2 w-24 bg-gray-200 rounded" />
                      <div className="h-2 w-16 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 ml-20 border border-blue-50">
                    <MapPin className="text-red-500" />
                    <span className="text-xs font-bold">Llegando a El Poblado</span>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </header>

      {/* SECCIÓN DE CARACTERÍSTICAS (GRID RESPONSIVO) */}
      <section id="info" className="bg-gray-50 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-black mb-4 italic">¿Por qué usar RutaXRuta?</h3>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-600" size={32} />} 
              title="Seguridad" 
              desc="Verificación de perfiles y roles específicos para conductores y pasajeros."
            />
            <FeatureCard 
              icon={<MapPin className="text-blue-600" size={32} />} 
              title="Rutas Locales" 
              desc="Optimizado para Medellín y el área metropolitana con mapas precisos."
            />
            <FeatureCard 
              icon={<Users className="text-blue-600" size={32} />} 
              title="Comunidad" 
              desc="Conecta con personas que realizan tu mismo trayecto diario."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 RutaXRuta Medellín. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="mb-6">{icon}</div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}