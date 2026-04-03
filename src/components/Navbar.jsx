"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Search, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 border-b border-blue-500 shadow-md">
      <div className="container mx-auto px-10 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3"
        >
          <div className="bg-white p-2 rounded-lg">
            <Car className="text-blue-600 w-6 h-6" />
          </div>
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">
            Ruta<span className="text-blue-100">X</span>Ruta
          </Link>
        </motion.div>

        {/* LINKS ESCRITORIO - COLORES CORREGIDOS */}
        <div className="flex items-center space-x-10 font-semibold">
          <Link href="/buscar" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors">
            <Search size={20} /> Buscar Viaje
          </Link>
          <Link href="/publicar" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors">
            <Car size={20} /> Ofrecer Viaje
          </Link>
          
          {/* BOTÓN ENTRAR */}
          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-white text-blue-600 px-6 py-2.5 rounded-full font-bold hover:bg-blue-50 transition-all shadow-md transform active:scale-95"
          >
            <UserCircle size={22} /> Entrar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;