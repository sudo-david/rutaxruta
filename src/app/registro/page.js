"use client";
import { useState } from 'react';
import { User, Car, Mail, Lock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegistroPage() {
  const [rol, setRol] = useState('pasajero');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
    placa: ''
  });

  // Función para capturar los cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar los datos a la API
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
        window.location.href = "/"; // Redirige a la landing
      } else {
        const error = await response.json();
        alert("Error: " + error.error);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un fallo en la conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Únete a RutaXRuta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Elige cómo quieres viajar hoy en Medellín
          </p>
        </div>

        {/* SELECTOR DE ROL */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRol('pasajero')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold transition ${rol === 'pasajero' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            <User size={18} /> Pasajero
          </button>
          <button
            type="button"
            onClick={() => setRol('conductor')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold transition ${rol === 'conductor' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            <Car size={18} /> Conductor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-4">
            {/* Campo Nombre */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="nombre"
                type="text"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Campo Correo */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="correo"
                type="email"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Campo Teléfono */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="telefono"
                type="text"
                placeholder="Teléfono (ej: 300...)"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* CAMPOS EXTRA PARA CONDUCTOR */}
            {rol === 'conductor' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Car className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    name="placa"
                    type="text"
                    placeholder="Placa del vehículo"
                    value={formData.placa}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 border-blue-200 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Campo Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg mt-6"
          >
            Registrarme ahora
          </button>
        </form>
      </motion.div>
    </div>
  );
}