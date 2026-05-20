'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader, GradientBorder } from '@/components/ui-premium'
import { Zap, Clock, Monitor, ArrowRight, CheckCircle2 } from 'lucide-react'

const metrics = [
  { icon: <Zap className="w-6 h-6" />, title: "Carga al instante", desc: "Hacemos que tu web abra rápido, incluso en móviles." },
  { icon: <Clock className="w-6 h-6" />, title: "Responde al primer clic", desc: "Botones y enlaces que funcionan al tocarlos. Sin esperas." },
  { icon: <Monitor className="w-6 h-6" />, title: "Nada se mueve ni salta raro", desc: "Todo estable y predecible desde el primer segundo." }
]

export default function PerformanceContent() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-20">
      <PageHeader title="Webs rápidas que no pierden clientes" subtitle="La velocidad no es un lujo. Es tu primer filtro de venta. Optimizamos cada detalle para que nada frene a tu cliente." />
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">Por qué la velocidad importa</h2>
        <p className="text-[hsl(var(--muted-fg))] leading-relaxed mb-6">Si tarda más de 3 segundos, más de la mitad de los visitantes se van. No se trata de "que vaya rápido", sino de que tu cliente no se frustre y se quede.</p>
      </section>
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[hsl(var(--fg))]">Métricas que Optimizamos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GradientBorder className="h-full"><div className="bg-[hsl(var(--card))] rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))] mb-3">{m.icon}</div>
                <h3 className="text-lg font-bold text-[hsl(var(--fg))] mb-2">{m.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-fg))] flex-1">{m.desc}</p>
              </div></GradientBorder>
            </motion.div>
          ))}
        </div>
      </section>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">¿Tu web tarda o se traba?</h2>
        <p className="text-[hsl(var(--muted-fg))] max-w-xl mx-auto mb-6">La revisamos y te decimos exactamente qué frena las ventas. Sin tecnicismos.</p>
        <Link href="/contacto"><button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-xl shadow-purple-500/20 group">Quiero una web rápida <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></button></Link>
      </motion.div>
            {/* 🔗 ENLAZADO INTERNO ESTRATÉGICO */}
      <section className="max-w-4xl mx-auto pt-10 border-t border-[hsl(var(--border))]">
        <h3 className="text-xl font-bold mb-4 text-[hsl(var(--fg))]">Recursos relacionados</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/seo" className="link-underline text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">🔍 SEO y velocidad: cómo Google usa LCP para rankear</a>
          <a href="/ux-ui" className="link-underline text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">🎨 UX/UI: convierte la velocidad en retención real</a>
        </div>
      </section>
    </div>
  )
}