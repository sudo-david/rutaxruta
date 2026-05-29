import "./globals.css";


export const metadata = {
  title: "RutaXRuta - Medellín",
  description: "Compartir transporte nunca fue tan fácil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}