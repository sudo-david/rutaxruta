"use client";
import { useState } from 'react';
import Link from 'next/link';
import { User, Car, Mail, Lock, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistroPage() {
  const [rol, setRol] = useState('pasajero');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
    placa: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rol }),
      });

      if (response.ok) {
        alert("¡Registro exitoso en RutaXRuta!");
        window.location.href = "/"; 
      } else {
        const error = await response.json();
        alert("Error: " + error.error);
      }
    } catch (error) {
      alert("Hubo un fallo en la conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Fondo Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[15%] -right-[5%] w-[45%] h-[45%] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[35%] h-[35%] bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-gray-100 relative"
      >
        <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-blue-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black italic text-gray-900 tracking-tighter">
            Ruta<span className="text-blue-600">X</span>Ruta
          </h2>
          <p className="mt-2 text-gray-500 font-bold text-sm uppercase tracking-widest">
            Crea tu cuenta gratis
          </p>
        </div>

        {/* SELECTOR DE ROL REFORZADO */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => setRol('pasajero')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${
              rol === 'pasajero' 
              ? 'bg-white text-blue-600 shadow-sm border border-blue-50' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={18} /> Pasajero
          </button>
          <button
            type="button"
            onClick={() => setRol('conductor')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${
              rol === 'conductor' 
              ? 'bg-white text-blue-600 shadow-sm border border-blue-50' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Car size={18} /> Conductor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <InputField 
              icon={<User size={20} />} 
              name="nombre" 
              type="text" 
              placeholder="Nombre completo" 
              value={formData.nombre} 
              onChange={handleChange} 
            />
            
            <InputField 
              icon={<Mail size={20} />} 
              name="correo" 
              type="email" 
              placeholder="Correo electrónico" 
              value={formData.correo} 
              onChange={handleChange} 
            />

            <InputField 
              icon={<Phone size={20} />} 
              name="telefono" 
              type="text" 
              placeholder="Teléfono móvil" 
              value={formData.telefono} 
              onChange={handleChange} 
            />

            <AnimatePresence mode="wait">
              {rol === 'conductor' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <InputField 
                    icon={<CheckCircle2 size={20} />} 
                    name="placa" 
                    type="text" 
                    placeholder="Placa del vehículo" 
                    value={formData.placa} 
                    onChange={handleChange} 
                    highlight 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField 
              icon={<Lock size={20} />} 
              name="password" 
              type="password" 
              placeholder="Contraseña segura" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 mt-4 uppercase tracking-tighter"
          >
            Registrarme ahora
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-8 font-medium text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-600 font-black hover:text-blue-800 transition-colors underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// Sub-componente para mantener la limpieza y el contraste
function InputField({ icon, name, type, placeholder, value, onChange, highlight = false }) {
  return (
    <div className="relative group">
      <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${highlight ? 'text-blue-500' : 'text-gray-400 group-focus-within:text-blue-600'}`}>
        {icon}
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-900 font-medium transition-all placeholder:text-gray-400 ${highlight ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'}`}
        required
      />
    </div>
  );
}