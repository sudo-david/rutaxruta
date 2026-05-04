"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [formData, setFormData] = useState({ correo: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('usuarioRutaX', JSON.stringify(data.usuario));
        window.location.href = "/dashboard"; 
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Elementos decorativos de fondo para mejorar el UI */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-[440px] w-full space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-gray-100 relative"
      >
        {/* Botón para volver a la Landing */}
        <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-blue-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center space-y-2">
          <motion.h2 
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-4xl font-black italic text-gray-900 tracking-tighter"
          >
            Ruta<span className="text-blue-600">X</span>Ruta
          </motion.h2>
          <p className="text-gray-500 font-bold text-sm md:text-base uppercase tracking-widest">
            Bienvenido de nuevo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Mail size={20} />
              </div>
              <input
                name="correo"
                type="email"
                placeholder="Correo electrónico"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-900 font-medium transition-all placeholder:text-gray-400"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Lock size={20} />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-900 font-medium transition-all placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-tight">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 uppercase tracking-tighter"
          >
            <LogIn size={22} /> Iniciar Sesión
          </motion.button>
        </form>

        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm font-medium">
            ¿Aún no eres parte?{" "}
            <Link href="/registro" className="text-blue-600 font-black hover:text-blue-800 transition-colors underline-offset-4 hover:underline">
              Crea una cuenta gratis
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}