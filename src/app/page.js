"use client"; // Necesario para las animaciones
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Users, ShieldCheck, MapPin, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* SECCIÓN HERO CON ANIMACIÓN */}
      <section className="relative overflow-hidden bg-blue-600 py-24 sm:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Ruta<span className="text-blue-200">X</span>Ruta
          </h1>
          <p className="mt-6 text-xl leading-8 text-blue-100 max-w-2xl mx-auto">
            La red de confianza para compartir tus viajes en Medellín. Ahorra, llega a tiempo y cuida el Valle de Aburrá.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/buscar" className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-all transform hover:scale-105">
              Buscar Viaje
            </Link>
            <Link href="/publicar" className="text-lg font-semibold leading-6 text-white hover:text-blue-200 transition">
              Ofrecer mi vehículo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECCIÓN "CÓMO FUNCIONA" (NUEVA) */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">¿Cómo funciona?</h2>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {[
              { icon: <MapPin className="w-10 h-10 text-blue-600" />, title: "Elige tu ruta", desc: "Indica tu punto de origen y destino en Medellín." },
              { icon: <Users className="w-10 h-10 text-blue-600" />, title: "Conecta", desc: "Encuentra conductores o pasajeros con tu mismo horario." },
              { icon: <ShieldCheck className="w-10 h-10 text-blue-600" />, title: "Viaja Seguro", desc: "Perfiles verificados para tu tranquilidad." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-full">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE DATOS (MENCIONADOS EN TU PDF) */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-around gap-10">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">50 min</div>
            <p className="text-blue-300">Tiempo ahorrado promedio</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">30%</div>
            <p className="text-blue-300">Menos gastos mensuales</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">100%</div>
            <p className="text-blue-300">Hecho en Medellín</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 border-t">
        <div className="text-center text-gray-500">
          <p className="font-semibold text-gray-900">RutaXRuta</p>
          <p className="mt-2">Desarrollado por David, Daniela y Anderson</p>
        </div>
      </footer>
    </div>
  );
}