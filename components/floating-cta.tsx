'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      
      // Mostrar tras 40% de scroll, ocultar al acercarse al footer (~últimos 350px)
      const shouldShow = scrollY > docHeight * 0.4
      const nearFooter = scrollY > docHeight - windowHeight - 350
      setVisible(shouldShow && !nearFooter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        >
          <Link href="/contacto">
            <button className="hover-lift btn-press focus-ring px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-xl shadow-purple-500/25 flex items-center gap-2 text-sm whitespace-nowrap">
              ¿Hablamos de tu proyecto? <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}