"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* SECCIÓN HERO - TEXTOS EN BLANCO */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-600 py-32 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-10 text-center"
        >
          <h1 className="text-6xl font-black mb-6 tracking-tight">
            Viaja por Medellín <br />
            <span className="text-blue-200 text-7xl italic">ahorrando tiempo</span>
          </h1>
          <p className="mt-8 text-2xl text-blue-100 max-w-3xl mx-auto font-light">
            La plataforma de confianza que conecta a conductores y pasajeros en el Valle de Aburrá.
          </p>

          {/* En src/app/page.js, busca la parte de los botones y actualízala así: */}

          <div className="mt-12 flex justify-center gap-8">
            <Link
              href="/registro"
              className="bg-white text-blue-700 px-10 py-5 rounded-full font-black text-xl shadow-2xl hover:bg-blue-50 transition-transform hover:-translate-y-1"
            >
              BUSCAR VIAJE
            </Link>
            <Link
              href="/registro"
              className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-colors"
            >
              OFRECER CUPO
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECCIÓN "CÓMO FUNCIONA" */}
      <section className="py-24 bg-gray-50 px-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-20">¿Cómo funciona RutaXRuta?</h2>

          <div className="grid grid-cols-3 gap-16">
            {[
              { icon: <MapPin className="w-12 h-12 text-blue-600" />, title: "Define tu Ruta", desc: "Usa nuestro mapa basado en OpenStreetMap para marcar origen y destino." },
              { icon: <Users className="w-12 h-12 text-blue-600" />, title: "Conecta", desc: "Mira los perfiles de otros estudiantes o trabajadores antes de viajar." },
              { icon: <ShieldCheck className="w-12 h-12 text-blue-600" />, title: "Seguridad Total", desc: "Registro verificado para que tu viaje sea 100% confiable." }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center"
              >
                <div className="inline-block p-4 bg-blue-50 rounded-2xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-12 text-white px-10">
        <div className="container mx-auto flex justify-between items-center opacity-80">
          <p className="text-lg">2026 - 1 RutaXRuta - Proyecto para CES WEB</p>
          <div className="flex gap-8">
            <span>David Duque</span>
            <span>Daniela</span>
            <span>Anderson</span>
          </div>
        </div>
      </footer>
    </div>
  );
}