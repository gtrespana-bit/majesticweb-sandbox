'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader, GradientBorder } from '@/components/ui-premium'
import { CheckCircle2, ArrowRight, Globe, Zap, Rocket, Code2 } from 'lucide-react'

const services = [
  { icon: <Globe className="w-6 h-6" />, title: "Web para tu negocio", desc: "Restaurantes, clínicas, talleres, abogados... Una página clara y profesional.", features: ["Diseño adaptado a tu sector", "Formulario de contacto o reservas", "Preparada para Google", "Lista en 7-10 días"] },
  { icon: <Zap className="w-6 h-6" />, title: "Tienda online fácil de usar", desc: "Catálogo, carrito y pagos seguros. Sin complicaciones técnicas.", features: ["Sube productos en 2 clics", "Pasarela de pago segura", "Gestión de stock sencilla", "Panel intuitivo"] },
  { icon: <Rocket className="w-6 h-6" />, title: "Que te encuentren en Google", desc: "No es magia. Es estructura y palabras clave que buscan tus clientes.", features: ["Análisis de tu competencia", "Textos optimizados", "Ficha de Google Business", "Informe mensual claro"] },
  { icon: <Code2 className="w-6 h-6" />, title: "Mantenimiento sin estrés", desc: "Actualizaciones, seguridad y cambios de texto o fotos. Nosotros nos encargamos.", features: ["Copias de seguridad diarias", "Protección contra ataques", "Cambios ilimitados (texto/fotos)", "Soporte por WhatsApp/email"] }
]

const plans = [
  { name: "Esencial", price: "Desde 950€", desc: "Para empezar con buen pie", features: ["Web de hasta 5 secciones", "Diseño profesional y responsive", "Formulario de contacto", "Entrega en 7-10 días", "1 mes de soporte incluido"], popular: false },
  { name: "Profesional", price: "Desde 1.950€", desc: "El más elegido por negocios reales", features: ["Hasta 10 secciones + Blog", "Optimización para Google", "Animaciones suaves y modernas", "Panel para editar textos/fotos", "3 meses de soporte incluido"], popular: true },
  { name: "A medida", price: "Hablamos", desc: "Proyectos con necesidades específicas", features: ["Tienda online completa", "Reservas / citas / integraciones", "Diseño 100% personalizado", "Formación para tu equipo", "Soporte prioritario"], popular: false }
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-24">
      <PageHeader title="Lo que hacemos por tu negocio" subtitle="Opciones claras para negocios que quieren vender más online, sin perder tiempo ni dinero." />

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[hsl(var(--fg))]">Servicios pensados para resultados</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GradientBorder className="h-full">
                <div className="bg-[hsl(var(--card))] rounded-xl p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))] mb-3">{s.icon}</div>
                  <h3 className="text-xl font-bold text-[hsl(var(--fg))] mb-2">{s.title}</h3>
                  <p className="text-[hsl(var(--muted-fg))] mb-4 text-sm">{s.desc}</p>
                  <ul className="space-y-2 mt-auto">{s.features.map((f, j) => (<li key={j} className="flex items-center gap-2 text-sm text-[hsl(var(--fg))]"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}</li>))}</ul>
                </div>
              </GradientBorder>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[hsl(var(--card))/0.2] border border-[hsl(var(--border))] rounded-2xl p-6 md:p-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--fg))]">Planes claros, sin sorpresas</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className={p.popular ? "relative" : ""}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))] text-xs font-bold px-3 py-1 rounded-full shadow-lg">Más elegido</div>}
              <GradientBorder className="h-full">
                <div className={`bg-[hsl(var(--card))] rounded-xl p-6 h-full flex flex-col ${p.popular ? 'ring-2 ring-[hsl(var(--primary))]' : ''}`}>
                  <div className="text-center pb-4"><h3 className="text-lg font-bold text-[hsl(var(--fg))]">{p.name}</h3><div className="text-3xl font-bold text-[hsl(var(--fg))] mt-2">{p.price}</div><p className="text-sm text-[hsl(var(--muted-fg))] mt-1">{p.desc}</p></div>
                  <ul className="space-y-3 mb-6 flex-1">{p.features.map((f, j) => (<li key={j} className="flex items-start gap-2 text-sm text-[hsl(var(--fg))]"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" /> {f}</li>))}</ul>
                  <Link href="/contacto" className="block"><button className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${p.popular ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))] hover:bg-[hsl(var(--primary))/0.9]' : 'bg-[hsl(var(--bg))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] text-[hsl(var(--fg))]'}`}>Pedir presupuesto</button></Link>
                </div>
              </GradientBorder>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">¿No sabes qué necesitas exactamente?</h2>
        <p className="text-[hsl(var(--muted-fg))] max-w-xl mx-auto mb-6">Agenda una llamada gratuita. Te escuchamos y te decimos qué conviene a tu negocio.</p>
        <Link href="/contacto"><button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-xl shadow-purple-500/20 group">Hablar con un experto <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></button></Link>
      </motion.div>
    </div>
  )
}