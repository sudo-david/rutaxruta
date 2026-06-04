"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';

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
        window.location.href = '/dashboard';
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo decorativo — CSS puro */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[440px] bg-white p-7 sm:p-10 rounded-[2rem] shadow-2xl shadow-blue-100/50 border border-gray-100 relative z-10">
        <Link href="/" className="absolute top-5 left-5 text-gray-400 hover:text-blue-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center space-y-1.5 mb-8">
          <h2 className="text-3xl sm:text-4xl font-black italic text-gray-900 tracking-tighter">
            Ruta<span className="text-blue-600">X</span>Ruta
          </h2>
          <p className="text-gray-500 font-bold text-xs sm:text-sm uppercase tracking-widest">
            Bienvenido de nuevo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                name="correo"
                type="email"
                placeholder="Correo electrónico"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-900 font-medium transition-all placeholder:text-gray-400 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-900 font-medium transition-all placeholder:text-gray-400 text-sm"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-tight">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-black text-base hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 uppercase tracking-tighter"
          >
            <LogIn size={20} /> Iniciar Sesión
          </button>
        </form>

        <div className="pt-5 border-t border-gray-100 text-center mt-6">
          <p className="text-gray-600 text-sm font-medium">
            ¿Aún no eres parte?{' '}
            <Link href="/registro" className="text-blue-600 font-black hover:text-blue-800 transition-colors underline-offset-4 hover:underline">
              Crea una cuenta gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}