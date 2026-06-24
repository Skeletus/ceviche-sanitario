import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supervisión sanitaria de ceviche de pota",
  description:
    "MVP para registrar vendedores, puestos, reportes e inspecciones sanitarias municipales."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
