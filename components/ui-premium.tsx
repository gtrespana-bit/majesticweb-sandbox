'use client'

import { useRef, useCallback, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pt-28 pb-12 text-center">
    <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--fg))] mb-4">{title}</h1>
    {subtitle && <p className="text-lg text-[hsl(var(--muted-fg))] max-w-2xl mx-auto">{subtitle}</p>}
    <div className="mt-6 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
  </motion.div>
)

export const MagneticButton = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const move = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.transform = `translate(${(e.clientX - rect.left - rect.width/2)*0.2}px, ${(e.clientY - rect.top - rect.height/2)*0.2}px)`
  }, [])
  const leave = useCallback(() => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }, [])
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`magnetic-wrap inline-block ${className}`}>{children}</div>
}

export const HoloCard = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const move = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${((e.clientX - rect.left)/rect.width)*100}%`)
    ref.current.style.setProperty('--my', `${((e.clientY - rect.top)/rect.height)*100}%`)
  }, [])
  return <div ref={ref} onMouseMove={move} className={`holo-card relative ${className}`}>{children}</div>
}

export const GradientBorder = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`gradient-border ${className}`}>{children}</div>
)

export const ParallaxLayer = ({ children, speed = 0.5, className = '' }: { children: ReactNode; speed?: number; className?: string }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -speed * 200])
  return <motion.div className={className} style={{ y }}>{children}</motion.div>
}