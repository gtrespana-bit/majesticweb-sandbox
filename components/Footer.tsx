'use client'

import Link from 'next/link'
import { Code2 } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))/0.6] backdrop-blur-md py-10 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-[hsl(var(--fg))]">MajesticWeb</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[hsl(var(--muted-fg))]">
          <Link href="/servicios" className="hover:text-[hsl(var(--fg))] transition-colors">Servicios</Link>
          <Link href="/portfolio" className="hover:text-[hsl(var(--fg))] transition-colors">Portfolio</Link>
          <Link href="/sobre-nosotros" className="hover:text-[hsl(var(--fg))] transition-colors">Nosotros</Link>
          <Link href="/contacto" className="hover:text-[hsl(var(--fg))] transition-colors">Contacto</Link>
        </div>
        <div className="text-xs text-[hsl(var(--muted-fg))]">© {year} MajesticWeb Studio.</div>
      </div>
    </footer>
  )
}