'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 z-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent leading-tight">
              MajesticWeb
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
              Creamos ecosistemas digitales que escalan, conectan y convierten.
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all">
              Iniciar Proyecto
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 🌍 SCROLL JOURNEY (Activa cámara lateral + zoom + día/noche) */}
      <div className="scroll-journey relative w-full z-20">
        <section className="h-screen flex items-center justify-center px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Frontend</h2>
            <p className="text-xl text-cyan-300 font-light">Interfaces que respiran y convierten.</p>
          </motion.div>
        </section>

        <section className="h-screen flex items-center justify-center px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Backend</h2>
            <p className="text-xl text-violet-300 font-light">Arquitectura invisible y robusta.</p>
          </motion.div>
        </section>

        <section className="h-screen flex items-center justify-center px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Cloud</h2>
            <p className="text-xl text-amber-300 font-light">Despliegue global sin latencia.</p>
          </motion.div>
        </section>

        <section className="h-screen flex items-center justify-center px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-6">Conexión</h2>
            <p className="text-2xl text-emerald-300 font-light mb-10">Te conectamos con el mundo.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl shadow-lg shadow-cyan-500/30">
              Hablemos de tu proyecto
            </motion.button>
          </motion.div>
        </section>
      </div>

      <footer className="relative py-12 border-t border-white/10 text-center text-white/40 text-sm z-20 bg-black/20 backdrop-blur-sm">
        © 2025 MajesticWeb Studio. Todos los derechos reservados.
      </footer>
    </>
  )
}