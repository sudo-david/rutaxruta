import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          RutaXRuta
        </Link>
        
        <div className="space-x-6">
          <Link href="/buscar" className="hover:text-blue-200 transition">
            Buscar Viaje
          </Link>
          <Link href="/publicar" className="hover:text-blue-200 transition">
            Ofrecer Viaje
          </Link>
          <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;