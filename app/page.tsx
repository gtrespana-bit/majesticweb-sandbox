'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* Track invisible que controla la animación 3D */}
      <div className="scroll-track h-[400vh] w-full relative">
        
        {/* HERO */}
        <section className="h-screen flex items-center justify-center sticky top-0 pointer-events-none">
          <div className="text-center z-10 px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold tracking-tight mb-4"
            >
              Majestic<span className="text-cyan-400">Web</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.7 }} 
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl max-w-xl mx-auto font-light"
            >
              Creamos experiencias digitales que trascienden fronteras
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
              className="mt-8 animate-bounce text-white/30"
            >
              ↓ Scroll para explorar
            </motion.div>
          </div>
        </section>

        {/* SECCIÓN 2: SERVICIOS */}
        <section className="h-screen flex items-center justify-center sticky top-0 pointer-events-none">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl px-6 w-full z-10">
            {[
              { t: 'Diseño UI/UX', d: 'Interfaces que capturan y convierten' },
              { t: 'Desarrollo Web', d: 'Arquitectura escalable y segura' },
              { t: 'Estrategia Digital', d: 'Datos, SEO y crecimiento real' }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                <p className="text-white/60 text-sm">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 3: CONTACTO */}
        <section className="h-screen flex items-center justify-center sticky top-0 pointer-events-none">
          <div className="text-center z-10 px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">¿Listo para escalar?</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">Hablemos de tu próximo proyecto. Juntos crearemos algo extraordinario.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
            >
              Iniciar Proyecto
            </motion.button>
          </div>
        </section>

      </div>

      <footer className="relative z-20 py-8 border-t border-white/10 text-center text-white/40 text-sm bg-black">
        © 2025 MajesticWeb Studio. Todos los derechos reservados.
      </footer>
    </main>
  )
}