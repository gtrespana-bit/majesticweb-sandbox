'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader, GradientBorder } from '@/components/ui-premium'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  { id: 1, title: "Tienda de moda local", cat: "Tienda Online", img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800", metrics: "+210% ventas online", year: "2024" },
  { id: 2, title: "Clínica dental", cat: "Negocio Local", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", metrics: "Reservas +150%", year: "2023" },
  { id: 3, title: "Estudio de arquitectura", cat: "Portfolio", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800", metrics: "Contactos cualificados x3", year: "2024" },
  { id: 4, title: "Consultoría financiera", cat: "Servicios", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", metrics: "340% más contactos", year: "2023" },
  { id: 5, title: "Restaurante familiar", cat: "Negocio Local", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", metrics: "Carta digital + pedidos", year: "2024" },
  { id: 6, title: "Academia online", cat: "Educación", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800", metrics: "12k alumnos activos", year: "2023" }
]
const categories = ["Todos", "Tienda Online", "Negocio Local", "Portfolio", "Servicios", "Educación"]

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Todos")
  const filtered = filter === "Todos" ? projects : projects.filter(p => p.cat === filter)

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Proyectos reales, resultados reales" subtitle="Cada web está pensada para resolver un problema concreto: vender más, recibir reservas o generar confianza." />
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (<button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${filter === cat ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))] border-transparent' : 'bg-transparent border-[hsl(var(--border))] text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))]'}`}>{cat}</button>))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <GradientBorder className="rounded-xl overflow-hidden">
                <div className="bg-[hsl(var(--card))] h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      quality={85}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--muted-fg))] text-xs">{p.cat}</span>
                      <span className="text-xs text-[hsl(var(--muted-fg))]">{p.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[hsl(var(--fg))] mb-2">{p.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted-fg))] mt-auto flex items-center gap-1">📈 {p.metrics}</p>
                    <Link href="/contacto" className="mt-4 block w-full"><button className="w-full px-4 py-2 rounded-lg bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-[hsl(var(--fg))] hover:bg-[hsl(var(--muted))] transition-all text-sm">Ver Proyecto <ArrowUpRight className="inline ml-1 w-3.5 h-3.5" /></button></Link>
                  </div>
                </div>
              </GradientBorder>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--fg))]">¿Quieres resultados así para tu negocio?</h3>
        <Link href="/contacto"><button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-xl shadow-purple-500/20">Empezar mi proyecto</button></Link>
      </div>
    </div>
  )
}