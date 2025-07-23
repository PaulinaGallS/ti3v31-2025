import "./globals.css";

export const metadata = {
  title: "Raíces Digitales – Inscripciones",
  description: "Gestión de talleres urbanos y artísticos",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
