import EarthScene from "@/components/earth-scene"
// ... tus otros imports

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-[var(--font-inter)]">
        <Providers>
          <EarthScene /> {/* 🌍 Fondo 3D interactivo */}
          <Navbar />
          <FloatingCTA />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
          <ThemeSwitcher />
          <ReactiveAudio />
        </Providers>
      </body>
    </html>
  )
}