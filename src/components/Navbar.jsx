"use client";
import { useState } from 'react';
import { LogOut, Menu, X, Bell, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ usuario, alCerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 sticky top-0 z-[1010] shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO - Contraste alto: Negro e Itálico */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <h1 className="text-xl md:text-2xl font-black italic text-gray-900 tracking-tighter">
            Ruta<span className="text-blue-600">X</span>Ruta
          </h1>
        </motion.div>

        {/* DESKTOP NAV - Textos en Gray-900 y Gray-600 */}
        <div className="hidden md:flex items-center gap-8">
          <button className="text-gray-600 hover:text-blue-600 transition-colors relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="text-right">
              {/* Texto Negro (Gray-900) para máxima legibilidad */}
              <p className="text-sm font-black text-gray-900 leading-none mb-1">
                {usuario?.nombre || "Usuario"}
              </p>
              {/* Texto Azul fuerte sobre fondo blanco */}
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                {usuario?.rol || "Rol"}
              </p>
            </div>
            
            {/* Avatar con contraste: Fondo azul suave, inicial en azul fuerte */}
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black shadow-md shadow-blue-100">
              {usuario?.nombre?.charAt(0).toUpperCase()}
            </div>

            <button 
              onClick={alCerrarSesion}
              className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
              title="Cerrar Sesión"
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* BOTÓN MÓVIL (HAMBURGUESA) - Icono Negro */}
        <div className="md:hidden flex items-center gap-4">
           <button 
             onClick={() => setMenuAbierto(true)}
             className="p-2 text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
           >
             <Menu size={24} />
           </button>
        </div>
      </div>

      {/* MENÚ MÓVIL (SIDEBAR) */}
      <AnimatePresence>
        {menuAbierto && (
          <>
            {/* Backdrop con Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuAbierto(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[1020]"
            />
            
            {/* Panel del Menú - Fondo Blanco, Textos Oscuros */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[300px] bg-white z-[1030] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-black italic text-xl text-gray-900 tracking-tighter">
                  Ruta<span className="text-blue-600">X</span>
                </span>
                <button 
                  onClick={() => setMenuAbierto(false)} 
                  className="p-2 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 flex-1">
                {/* Perfil en el Menú Móvil - Contraste Reforzado */}
                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
                      {usuario?.nombre?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 leading-tight">{usuario?.nombre}</p>
                      <p className="text-xs font-bold text-blue-600 uppercase">{usuario?.rol}</p>
                    </div>
                  </div>
                </div>

                <nav className="space-y-2">
                   <SidebarLink icon={<User size={20}/>} label="Mi Perfil" />
                   <SidebarLink icon={<Settings size={20}/>} label="Configuración" />
                   <SidebarLink icon={<Bell size={20}/>} label="Notificaciones" />
                </nav>
              </div>

              {/* Botón Salir - Fondo Rojo Suave, Texto Rojo Fuerte */}
              <button 
                onClick={alCerrarSesion}
                className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-all border border-red-100"
              >
                <LogOut size={20} /> Cerrar Sesión
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Sub-componente para links del sidebar
function SidebarLink({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-2xl font-bold transition-all group">
      <span className="text-gray-400 group-hover:text-blue-600 transition-colors">{icon}</span>
      {label}
    </button>
  );
}