'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader, GradientBorder } from '@/components/ui-premium'
import { Code2, Palette, Zap, ShieldCheck, Rocket, ArrowRight } from 'lucide-react'

const values = [
  { icon: <Palette className="w-6 h-6" />, title: "Diseño con propósito", desc: "Cada color, foto y texto tiene un objetivo: que tu cliente confíe y actúe." },
  { icon: <Zap className="w-6 h-6" />, title: "Tecnología que no notas", desc: "Usamos herramientas modernas para que tu web sea rápida y segura. Tú solo disfrutas del resultado." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Transparencia total", desc: "Plazos reales, precios claros y comunicación directa. Sin letra pequeña." },
  { icon: <Rocket className="w-6 h-6" />, title: "Resultados, no promesas", desc: "Medimos contactos, visitas y conversiones. Si no funciona, lo ajustamos." }
]
const stack = ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Figma", "Spline", "Vercel", "Stripe"]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-20">
      <PageHeader title="Sobre nosotros" subtitle="Un equipo que habla claro, cumple plazos y se preocupa por tu negocio." />
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[hsl(var(--fg))]">Nuestros Pilares</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}>
              <GradientBorder className="h-full">
                <div className="bg-[hsl(var(--card))] rounded-xl p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))] mb-3">{v.icon}</div>
                  <h3 className="text-lg font-bold text-[hsl(var(--fg))] mb-2">{v.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-fg))] leading-relaxed flex-1">{v.desc}</p>
                </div>
              </GradientBorder>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[hsl(var(--fg))]">Herramientas que usamos</h2>
        <p className="text-[hsl(var(--muted-fg))] max-w-2xl mx-auto mb-8">Tecnología probada, rápida y segura. Tú no tienes que entenderla, solo notar que funciona.</p>
        <div className="flex flex-wrap justify-center gap-3">{stack.map((tech, i) => (<motion.div key={i} initial={{ scale:0.9, opacity:0 }} whileInView={{ scale:1, opacity:1 }} viewport={{ once:true }} transition={{ delay: i*0.05 }}><span className="px-4 py-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-sm text-[hsl(var(--fg))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors cursor-default inline-block">{tech}</span></motion.div>))}</div>
      </section>
      <section className="bg-[hsl(var(--card))/0.2] border border-[hsl(var(--border))] rounded-2xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[hsl(var(--fg))]">De la idea al lanzamiento en 4 pasos</h2>
            <ul className="space-y-4">{["Escuchamos y planificamos", "Diseñamos y validamos contigo", "Construimos y probamos", "Lanzamos y te acompañamos"].map((step, i) => (<li key={i} className="flex items-start gap-3"><div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center text-sm font-bold mt-0.5">{i+1}</div><p className="text-[hsl(var(--fg))]">{step}</p></li>))}</ul>
            <Link href="/contacto"><button className="mt-6 px-6 py-3 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))] hover:bg-[hsl(var(--primary))/0.9] font-semibold transition-all">Empezar ahora <ArrowRight className="inline ml-2 w-4 h-4" /></button></Link>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[hsl(var(--border))] aspect-square md:aspect-auto bg-gradient-to-br from-[hsl(var(--primary))/0.1] to-[hsl(var(--accent))/0.1] flex items-center justify-center"><Code2 className="w-24 h-24 text-[hsl(var(--primary))/0.3]" /></div>
        </div>
      </section>
    </div>
  )
}