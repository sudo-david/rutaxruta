"use client";
import { useState } from 'react';
import Link from 'next/link';
import { User, Car, Mail, Lock, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function RegistroPage() {
  const [rol, setRol] = useState('pasajero');
  const [formData, setFormData] = useState({
    nombre: '', correo: '', telefono: '', password: '', placa: ''
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
        alert('¡Registro exitoso en RutaXRuta!');
        window.location.href = '/';
      } else {
        const error = await response.json();
        alert('Error: ' + error.error);
      }
    } catch (error) {
      alert('Hubo un fallo en la conexión con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Fondo decorativo — CSS puro */}
      <div className="absolute -top-[15%] -right-[5%] w-[45%] h-[45%] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[10%] -left-[5%] w-[35%] h-[35%] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[480px] w-full bg-white p-7 sm:p-10 rounded-[2rem] shadow-2xl shadow-blue-100/50 border border-gray-100 relative z-10">
        <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-blue-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-7">
          <h2 className="text-3xl sm:text-4xl font-black italic text-gray-900 tracking-tighter">
            Ruta<span className="text-blue-600">X</span>Ruta
          </h2>
          <p className="mt-1.5 text-gray-500 font-bold text-xs uppercase tracking-widest">
            Crea tu cuenta gratis
          </p>
        </div>

        {/* Selector de rol */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRol('pasajero')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${
              rol === 'pasajero'
                ? 'bg-white text-blue-600 shadow-sm border border-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={17} /> Pasajero
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
            <Car size={17} /> Conductor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <InputField icon={<User size={18} />} name="nombre" type="text" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} />
          <InputField icon={<Mail size={18} />} name="correo" type="email" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} />
          <InputField icon={<Phone size={18} />} name="telefono" type="text" placeholder="Teléfono móvil" value={formData.telefono} onChange={handleChange} />

          {/* Campo placa — visible sin animación, controlado por CSS */}
          <div className={`overflow-hidden transition-all duration-300 ${rol === 'conductor' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
            <InputField icon={<CheckCircle2 size={18} />} name="placa" type="text" placeholder="Placa del vehículo" value={formData.placa} onChange={handleChange} highlight />
          </div>

          <InputField icon={<Lock size={18} />} name="password" type="password" placeholder="Contraseña segura" value={formData.password} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 mt-2 uppercase tracking-tighter"
          >
            Registrarme ahora
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 font-medium text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-blue-600 font-black hover:text-blue-800 transition-colors underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

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
        className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-900 font-medium transition-all placeholder:text-gray-400 text-sm ${highlight ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'}`}
        required
      />
    </div>
  );
}