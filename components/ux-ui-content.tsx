'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader, GradientBorder } from '@/components/ui-premium'
import { Layout, MousePointer2, Eye, Users, ArrowRight } from 'lucide-react'

const pillars = [
  { icon: <Users className="w-6 h-6" />, title: "Entendemos a tu cliente", desc: "No diseñamos para nosotros. Diseñamos para quien va a comprar, reservar o contactarte." },
  { icon: <Layout className="w-6 h-6" />, title: "Todo a 3 clics o menos", desc: "Si el visitante no encuentra lo que busca rápido, se va. Estructuramos todo para que sea intuitivo." },
  { icon: <Eye className="w-6 h-6" />, title: "Diseño que genera confianza", desc: "Colores, fotos y textos alineados con tu negocio. Profesional, limpio y creíble desde el primer segundo." },
  { icon: <MousePointer2 className="w-6 h-6" />, title: "Probamos antes de lanzar", desc: "No adivinamos. Validamos con personas reales para asegurar que todo funciona como debe." }
]

export default function UxUiContent() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-20">
      <PageHeader title="Diseño claro que no confunde" subtitle="Una web bonita no sirve si el visitante no sabe dónde clicar. Hacemos que todo sea intuitivo y directo al contacto o la compra." />
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">¿Por qué algunas webs no venden?</h2>
        <p className="text-[hsl(var(--muted-fg))] leading-relaxed mb-6">Porque están pensadas para el dueño, no para el cliente. Menús infinitos, textos largos o botones escondidos matan las ventas. Nosotros eliminamos lo que sobra y dejamos solo lo necesario.</p>
      </section>
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[hsl(var(--fg))]">Los 4 Pilares de Nuestro Diseño</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GradientBorder className="h-full"><div className="bg-[hsl(var(--card))] rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))] mb-3">{p.icon}</div>
                <h3 className="text-lg font-bold text-[hsl(var(--fg))] mb-2">{p.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-fg))] flex-1">{p.desc}</p>
              </div></GradientBorder>
            </motion.div>
          ))}
        </div>
      </section>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">¿Tu web pierde visitantes por ser confusa?</h2>
        <p className="text-[hsl(var(--muted-fg))] max-w-xl mx-auto mb-6">Te decimos qué frena a tus clientes y cómo solucionarlo. Rápido y claro.</p>
        <Link href="/contacto"><button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-xl shadow-purple-500/20 group">Quiero una web clara <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></button></Link>
      </motion.div>
            {/* 🔗 ENLAZADO INTERNO ESTRATÉGICO */}
      <section className="max-w-4xl mx-auto pt-10 border-t border-[hsl(var(--border))]">
        <h3 className="text-xl font-bold mb-4 text-[hsl(var(--fg))]">Recursos relacionados</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/seo" className="link-underline text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">🔍 SEO Técnico: asegura que tu diseño sea encontrado</a>
          <a href="/rendimiento-web" className="link-underline text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">⚡ Core Web Vitals: velocidad que complementa la UX</a>
        </div>
      </section>
    </div>
  )
}