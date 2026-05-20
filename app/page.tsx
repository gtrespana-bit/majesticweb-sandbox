'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Sparkles, ArrowUpRight, Globe, Zap, Rocket, Users, Star } from "lucide-react"
import { MagneticButton, HoloCard, GradientBorder, ParallaxLayer } from '@/components/ui-premium'
import EarthScene from "@/components/earth-scene"

export default function HomePage() {
  const services = [
    { icon: <Globe className="w-7 h-7" />, title: "Web para tu negocio", description: "Página clara, profesional y que genere confianza desde el primer clic." },
    { icon: <Zap className="w-7 h-7" />, title: "Diseño que no confunde", description: "Todo intuitivo y directo al contacto o la compra." },
    { icon: <Rocket className="w-7 h-7" />, title: "Que te encuentren en Google", description: "Hacemos que tu negocio aparezca cuando la gente busca lo que ofreces." },
    { icon: <Users className="w-7 h-7" />, title: "Mantenimiento sin estrés", description: "Nos encargamos de las actualizaciones y cambios para que tú no pares." }
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 z-10">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>
              <Badge className="bg-[hsl(var(--primary))/0.2] text-[hsl(var(--primary))] border-[hsl(var(--primary))/0.3] px-4 py-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 mr-2" /> Webs para negocios reales
              </Badge>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[hsl(var(--fg))]">
              Tu negocio merece una <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">web que venda</span>
            </h1>
            
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }} className="text-lg text-[hsl(var(--muted-fg))] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sin tecnicismos. Sin complicaciones. Hacemos tu página web profesional para que tú solo te preocupes de atender a tus clientes.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}>
              <MagneticButton><Link href="/contacto"><Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg shadow-xl shadow-purple-500/25 group">Quiero mi web <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Button></Link></MagneticButton>
              <MagneticButton><Link href="/portfolio"><Button size="lg" variant="outline" className="border-[hsl(var(--border))] hover:bg-[hsl(var(--card))] px-8 py-6 text-lg backdrop-blur-sm">Ver proyectos</Button></Link></MagneticButton>
            </motion.div>
          </div>
          
          {/* 🌍 TIERRA 3D (ÚNICA ESCENA) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20"
          >
            <EarthScene />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <ParallaxLayer speed={0.15}>
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4 text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--primary))/0.2] text-[hsl(var(--primary))] border-[hsl(var(--primary))/0.3]">Lo que hacemos</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[hsl(var(--fg))]">Opciones claras para <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">tu negocio</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s,i)=>(
              <motion.div key={i} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.15 }}>
                <GradientBorder className="h-full"><HoloCard className="h-full"><div className="bg-[hsl(var(--card))] rounded-xl p-6 h-full group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <h3 className="text-lg font-bold text-[hsl(var(--fg))] mb-2">{s.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-fg))]">{s.description}</p>
                </div></HoloCard></GradientBorder>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxLayer>

      {/* PORTFOLIO PREVIEW */}
      <ParallaxLayer speed={0.1}>
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div><Badge className="mb-4 bg-pink-500/20 text-pink-400 border-pink-500/30">Proyectos reales</Badge><h2 className="text-3xl md:text-5xl font-bold text-[hsl(var(--fg))]">Resultados que <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">se notan</span></h2></div>
              <MagneticButton className="mt-4 md:mt-0"><Link href="/portfolio"><Button variant="ghost" className="text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))] group">Ver más <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Button></Link></MagneticButton>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[{t:"Tienda de moda local",c:"Tienda Online",i:"https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800"},{t:"Clínica dental",c:"Negocio Local",i:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"}].map((p,i)=>(
                <motion.div key={i} initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}>
                  <GradientBorder className="rounded-2xl overflow-hidden group"><HoloCard className="rounded-2xl overflow-hidden"><div className="bg-[hsl(var(--card))] h-full">
                    <div className="relative aspect-video overflow-hidden"><img src={p.i} alt={p.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"><Button size="sm" className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20">Ver Proyecto</Button></div></div>
                    <div className="p-6"><Badge variant="secondary" className="mb-2 text-xs">{p.c}</Badge><h3 className="text-xl font-semibold text-[hsl(var(--fg))] group-hover:text-purple-400 transition-colors">{p.t}</h3></div>
                  </div></HoloCard></GradientBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxLayer>

      {/* TESTIMONIALS PREVIEW */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 text-center mb-12">
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">Lo que dicen</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-[hsl(var(--fg))]">Opiniones de <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">negocios como el tuyo</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[{n:"María G.",r:"CEO, InnovateLab",t:"Resultados superiores a expectativas.",s:5},{n:"Carlos M.",r:"Founder, TechStart",t:"La experiencia 3D es espectacular.",s:5},{n:"Ana R.",r:"Director, LuxeBrand",t:"Conversiones +340% tras el rediseño.",s:5}].map((t,i)=>(
            <motion.div key={i} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.15 }}>
              <GradientBorder className="rounded-2xl h-full"><HoloCard className="rounded-2xl h-full"><div className="bg-[hsl(var(--card))] rounded-xl p-6 h-full">
                <div className="flex gap-1 mb-3">{[...Array(t.s)].map((_,j)=><Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-[hsl(var(--muted-fg))] italic mb-4 text-sm">"{t.t}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-[hsl(var(--border))]"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">{t.n[0]}</div><div className="text-left"><div className="text-sm font-semibold text-[hsl(var(--fg))]">{t.n}</div><div className="text-xs text-[hsl(var(--muted-fg))]">{t.r}</div></div></div>
              </div></HoloCard></GradientBorder>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <ParallaxLayer speed={0.05}>
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <GradientBorder className="rounded-3xl max-w-4xl mx-auto"><HoloCard className="rounded-3xl"><div className="bg-[hsl(var(--card))] rounded-3xl p-8 md:p-12">
                <Sparkles className="w-12 h-12 mx-auto text-purple-400 animate-float mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--fg))] mb-4">¿Quieres una web que trabaje por ti?</h2>
                <p className="text-[hsl(var(--muted-fg))] text-lg max-w-xl mx-auto mb-8">Cuéntanos tu idea. Te respondemos en menos de 24h con un plan claro y sin compromiso.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton><Link href="/contacto"><Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg shadow-xl shadow-purple-500/20">Cuéntanos tu idea <ChevronRight className="ml-2 w-5 h-5" /></Button></Link></MagneticButton>
                  <MagneticButton><Link href="/sobre-nosotros"><Button size="lg" variant="outline" className="border-[hsl(var(--border))] hover:bg-[hsl(var(--card))] px-8 py-6 text-lg backdrop-blur-sm">Ver cómo trabajamos</Button></Link></MagneticButton>
                </div>
              </div></HoloCard></GradientBorder>
            </motion.div>
          </div>
        </section>
      </ParallaxLayer>
    </>
  )
}