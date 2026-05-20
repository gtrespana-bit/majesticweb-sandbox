'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Code2, Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/seo', label: 'SEO' },
  { href: '/ux-ui', label: 'UX/UI' },
  { href: '/rendimiento-web', label: 'Velocidad' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contacto', label: 'Contacto' }
]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] px-4 py-4 backdrop-blur-md bg-[hsl(var(--bg))/0.6] border-b border-[hsl(var(--border))/0.3]">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-20" onClick={() => setIsOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-[hsl(var(--fg))]">MajesticWeb</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => {
            const isActive = pathname === l.href
            return (
              <Link key={l.href} href={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))]' : 'text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))] hover:bg-[hsl(var(--muted))/0.5]'}`}>
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[hsl(var(--fg))] z-20 rounded-lg hover:bg-[hsl(var(--muted))/0.3] transition-colors">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[hsl(var(--card))/0.95] backdrop-blur-xl border-b border-[hsl(var(--border))] py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
          {links.map(l => {
            const isActive = pathname === l.href
            return (
              <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))]' : 'text-[hsl(var(--muted-fg))] hover:bg-[hsl(var(--muted))/0.4]'}`}>
                {l.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}