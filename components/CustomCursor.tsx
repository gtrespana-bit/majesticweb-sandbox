'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ mx: 0, my: 0, dx: 0, dy: 0, gx: 0, gy: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loop = () => {
      pos.current.dx += (pos.current.mx - pos.current.dx) * 0.18
      pos.current.dy += (pos.current.my - pos.current.dy) * 0.18
      pos.current.gx += (pos.current.mx - pos.current.gx) * 0.06
      pos.current.gy += (pos.current.my - pos.current.gy) * 0.06

      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.current.mx}px, ${pos.current.my}px, 0)`
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${pos.current.dx}px, ${pos.current.dy}px, 0)`
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${pos.current.gx}px, ${pos.current.gy}px, 0)`
      requestAnimationFrame(loop)
    }

    const move = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
    }

    const hoverIn = () => ringRef.current?.classList.add('hover')
    const hoverOut = () => ringRef.current?.classList.remove('hover')

    window.addEventListener('mousemove', move)
    // Delay para evitar que el selector falle en hidratación
    const initHover = setTimeout(() => {
      document.querySelectorAll('a, button, input, textarea, [role="button"], .holo-card, .magnetic-wrap').forEach(el => {
        el.addEventListener('mouseenter', hoverIn)
        el.addEventListener('mouseleave', hoverOut)
      })
    }, 100)

    requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      clearTimeout(initHover)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  )
}