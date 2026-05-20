import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingCTA from "@/components/floating-cta"
import {
  CustomCursor,
  CursorTrail,
  DynamicBackground,
  AuroraBackground,
  CinematicGrain,
  CinematicVignette,
  LiquidEffect,
  ThemeSwitcher,
  ReactiveAudio
} from "@/components/global-ui"
import EarthScene from "@/components/earth-scene"

// ✅ Configuración de la fuente Inter
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
  title: "MajesticWeb | Webs que venden, sin complicaciones",
  description: "Diseñamos páginas web profesionales, rápidas y fáciles de gestionar. Para que tú te centres en tu negocio y nosotros en la tecnología.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-[var(--font-inter)]">
        <Providers>
          {/* 🌍 Fondo 3D interactivo (Tierra + Scroll) */}
          <EarthScene />

          {/* 🎨 Efectos Globales */}
          <DynamicBackground />
          <AuroraBackground />
          <CinematicGrain />
          <CinematicVignette />
          <LiquidEffect />

          {/* 🖱️ Cursor & Trail */}
          <CustomCursor />
          <CursorTrail />

          {/* 🧭 Layout Principal */}
          <Navbar />
          <FloatingCTA />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />

          {/* 🎛️ Controles & Audio */}
          <ThemeSwitcher />
          <ReactiveAudio />
        </Providers>
      </body>
    </html>
  )
}