import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import SmoothScroll from "@/components/smoothScroll/smothScroll";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Sistema de gerenciamento de Jogos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <SmoothScroll />
        {children}</body>
    </html>
  );
}
