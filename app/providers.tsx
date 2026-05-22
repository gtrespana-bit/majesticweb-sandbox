'use client'

import { useState, useEffect, createContext, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomCursor, CursorTrail, DynamicBackground, AuroraBackground, CinematicGrain, CinematicVignette, LiquidEffect, ThemeSwitcher, ReactiveAudio } from '@/components/global-ui'

// ✅ Tipo actualizado: solo 'dark' | 'cyber'
export const ThemeContext = createContext<{ theme: 'dark' | 'cyber'; setTheme: (t: 'dark' | 'cyber') => void }>({ theme: 'dark', setTheme: () => {} })

export function Providers({ children }: { children: ReactNode }) {
  // ✅ Estado actualizado: solo 'dark' | 'cyber'
  const [theme, setTheme] = useState<'dark' | 'cyber'>('dark')
  const [mobile, setMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent))
    }
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DynamicBackground theme={theme} mobile={mobile} />
        <AuroraBackground />
        <CinematicGrain />
        <CinematicVignette />
      </div>

      {!mobile && <CustomCursor />}
      <CursorTrail mobile={mobile} />
      <LiquidEffect />
      
      <ThemeSwitcher />
      <ReactiveAudio />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 min-h-screen flex flex-col overflow-x-hidden transition-colors duration-500"
          style={{ color: 'hsl(var(--fg))' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </ThemeContext.Provider>
  )
}