import "./globals.css";
import Navbar from "@/components/Navbar"; // Importamos tu nuevo Navbar

export const metadata = {
  title: "RutaXRuta - Medellín",
  description: "Compartir transporte nunca fue tan fácil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar /> {/* El Navbar ahora aparecerá arriba en todas las pantallas */}
        {children}
      </body>
    </html>
  );
}