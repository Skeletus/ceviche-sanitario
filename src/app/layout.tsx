import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ceviche Sanitario",
  description:
    "Plataforma web para consultar puestos autorizados y apoyar la supervision sanitaria municipal de vendedores de ceviche de pota."
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
