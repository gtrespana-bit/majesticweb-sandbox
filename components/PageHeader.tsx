'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="pt-28 pb-12 text-center"
    >
      <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--fg))] mb-4">{title}</h1>
      {subtitle && <p className="text-lg text-[hsl(var(--muted-fg))] max-w-2xl mx-auto">{subtitle}</p>}
      <div className="mt-6 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
    </motion.div>
  )
}