'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader, GradientBorder } from '@/components/ui-premium'
import { Search, BarChart3, Code2, FileText, ArrowRight, CheckCircle2 } from 'lucide-react'

const steps = [
  { icon: <Search className="w-6 h-6" />, title: "Vemos qué busca tu clientela", desc: "Analizamos qué escriben en Google, qué hace tu competencia y dónde hay oportunidad real para ti." },
  { icon: <FileText className="w-6 h-6" />, title: "Ajustamos tu página para Google", desc: "Preparamos títulos, textos, velocidad y estructura para que Google la entienda y la muestre." },
  { icon: <Code2 className="w-6 h-6" />, title: "Escribimos textos que atraen visitas", desc: "Páginas y artículos que responden preguntas reales. Sin relleno. Con intención de compra o reserva." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Te contamos los resultados cada mes", desc: "Recibes un informe claro. Qué funciona, qué mejoramos y cuántos contactos llegan desde Google." }
]
const faqs = [
  { q: "¿Cuánto tarda en funcionar?", a: "Los primeros movimientos se ven en 3-6 semanas. El crecimiento estable llega en 2-4 meses. Es una inversión, no un gasto." },
  { q: "¿Necesito saber de informática?", a: "Para nada. Nosotros nos encargamos de todo. Tú solo nos cuentas cómo es tu negocio y qué quieres conseguir." },
  { q: "¿Sirve para negocios locales?", a: "Sí, especialmente. Optimizamos tu ficha de Google, tu zona y las búsquedas de 'cerca de mí'." }
]

export default function SeoContent() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-20">
      <PageHeader title="Que te encuentren en Google" subtitle="Si tu web no aparece cuando buscan lo que ofreces, estás perdiendo clientes. Hacemos que te vean." />
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">Por qué importa aparecer en Google</h2>
        <p className="text-[hsl(var(--muted-fg))] leading-relaxed">El 80% de las personas buscan en internet antes de comprar o reservar. Si no estás ahí, eligen a otro. No se trata de trucos, sino de estructurar bien tu web y usar las palabras que busca tu clientela.</p>
      </section>
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[hsl(var(--fg))]">Cómo lo hacemos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GradientBorder className="h-full"><div className="bg-[hsl(var(--card))] rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))] mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold text-[hsl(var(--fg))] mb-2">{s.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-fg))] flex-1">{s.desc}</p>
              </div></GradientBorder>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="bg-[hsl(var(--card))/0.2] border border-[hsl(var(--border))] rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[hsl(var(--fg))]">Preguntas Frecuentes</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <GradientBorder key={i}><div className="bg-[hsl(var(--card))] rounded-xl p-5">
              <h3 className="text-lg font-semibold text-[hsl(var(--fg))] mb-2 flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" /> {faq.q}</h3>
              <p className="text-sm text-[hsl(var(--muted-fg))] leading-relaxed pl-7">{faq.a}</p>
            </div></GradientBorder>
          ))}
        </div>
      </section>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">¿Tu web no aparece cuando te buscan?</h2>
        <p className="text-[hsl(var(--muted-fg))] max-w-xl mx-auto mb-6">Te decimos exactamente qué falta y cómo solucionarlo. Sin compromiso.</p>
        <Link href="/contacto"><button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-xl shadow-purple-500/20 group">Quiero aparecer en Google <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></button></Link>
      </motion.div>
         {/* 🔗 ENLAZADO INTERNO ESTRATÉGICO */}
      <section className="max-w-4xl mx-auto pt-10 border-t border-[hsl(var(--border))]">
        <h3 className="text-xl font-bold mb-4 text-[hsl(var(--fg))]">Recursos relacionados</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/ux-ui" className="link-underline text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">🎨 Diseño UX/UI que retiene el tráfico que el SEO trae</a>
          <a href="/rendimiento-web" className="link-underline text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">⚡ Velocidad web: el factor técnico que Google premia</a>
        </div>
      </section>
    </div>
  )
}