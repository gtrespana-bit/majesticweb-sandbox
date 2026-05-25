'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="scroll-container bg-black min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </section>

      {/* Services Section */}
      <section className="h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black to-neutral-950">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Diseño UI/UX', desc: 'Interfaces que cautivan', icon: '🎨' },
              { title: 'Desarrollo Web', desc: 'Código de élite', icon: '💻' },
              { title: 'Estrategia Digital', desc: 'Resultados medibles', icon: '📈' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="h-screen flex items-center justify-center px-8 bg-neutral-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">¿Listo para empezar?</h2>
          <p className="text-xl text-white/60 mb-10">Transformemos tu visión en realidad digital</p>
          <button className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform">
            Hablemos de tu proyecto
          </button>
        </motion.div>
      </section>

      <footer className="py-8 border-t border-white/10 text-center text-white/40 text-sm">
        © 2025 MajesticWeb Studio. Todos los derechos reservados.
      </footer>
    </div>
  )
}