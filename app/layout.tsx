import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingCTA from "@/components/floating-cta"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "MajesticWeb | Estudio de Diseño Digital Premium",
  description: "Creamos experiencias web inmersivas con diseño 3D, tecnología de punta y estrategia digital.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-[var(--font-inter)]">
        <Providers>
          <Navbar />
          <FloatingCTA />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}