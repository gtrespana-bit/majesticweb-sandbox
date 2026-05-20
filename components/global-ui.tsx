import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { Music, Volume2, VolumeX, Moon, Sun, Zap as ZapIcon } from 'lucide-react'
import { ThemeContext } from '@/app/providers'

/* 🖱️ CURSOR PERSONALIZADO */
export const CustomCursor = () => {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const pos = useRef({ mx: 0, my: 0, dx: 0, dy: 0, gx: 0, gy: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const loop = () => {
      pos.current.dx += (pos.current.mx - pos.current.dx) * 0.18
      pos.current.dy += (pos.current.my - pos.current.dy) * 0.18
      pos.current.gx += (pos.current.mx - pos.current.gx) * 0.06
      pos.current.gy += (pos.current.my - pos.current.gy) * 0.06
      if (dot.current) dot.current.style.transform = `translate3d(${pos.current.mx}px, ${pos.current.my}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${pos.current.dx}px, ${pos.current.dy}px, 0)`
      if (glow.current) glow.current.style.transform = `translate3d(${pos.current.gx}px, ${pos.current.gy}px, 0)`
      requestAnimationFrame(loop)
    }
    const move = (e: MouseEvent) => { pos.current.mx = e.clientX; pos.current.my = e.clientY }
    const hIn = () => ring.current?.classList.add('hover')
    const hOut = () => ring.current?.classList.remove('hover')
    window.addEventListener('mousemove', move)
    const init = setTimeout(() => {
      document.querySelectorAll('a, button, input, textarea, [role="button"], .holo-card, .magnetic-wrap').forEach(el => {
        el.addEventListener('mouseenter', hIn)
        el.addEventListener('mouseleave', hOut)
      })
    }, 100)
    requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); clearTimeout(init) }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      <div ref={glow} className="cursor-glow" />
    </>
  )
}

/* ✨ TRAIL DE PARTÍCULAS */
export const CursorTrail = ({ mobile }: { mobile: boolean }) => {
  const last = useRef({ x: 0, y: 0, t: 0 })
  const throttle = useRef(false)
  useEffect(() => {
    if (mobile) return
    const move = (e: MouseEvent) => {
      if (throttle.current) return
      const now = Date.now()
      const speed = Math.hypot(e.clientX - last.current.x, e.clientY - last.current.y) / (now - last.current.t) * 16
      last.current = { x: e.clientX, y: e.clientY, t: now }
      if (speed > 1.2) {
        throttle.current = true
        const el = document.createElement('div')
        el.className = 'cursor-trail'
        el.style.left = `${e.clientX + (Math.random() - 0.5) * 12}px`
        el.style.top = `${e.clientY + (Math.random() - 0.5) * 12}px`
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 700)
        setTimeout(() => throttle.current = false, 35)
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mobile])
  return null
}

/* 🌌 CANVAS DE FONDO (Estrellas / Figuras Reactivas) */
export const DynamicBackground = ({ theme, mobile }: { theme: string; mobile: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const els = useRef<any[]>([])
  const frame = useRef<number>(0)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')!
    let w = c.width = window.innerWidth
    let h = c.height = window.innerHeight

    if (!els.current.length || els.current[0]?.theme !== theme) {
      els.current = []
      if (theme === 'light') {
        for (let i = 0; i < (mobile ? 50 : 110); i++) {
          els.current.push({ t: 'p', x: Math.random() * w, y: Math.random() * h, w: Math.random() * 70 + 20, h: Math.random() * 70 + 20, a: Math.random() * Math.PI, o: Math.random() * 0.15 + 0.05, p: 0, theme })
        }
      } else {
        const hue = theme === 'cyber' ? '315, 85%, 60%' : '263, 70%, 60%'
        for (let i = 0; i < (mobile ? 40 : 100); i++) {
          els.current.push({ t: 'd', x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, s: Math.random() * 2 + 0.8, o: Math.random() * 0.4 + 0.2, hue, theme })
        }
      }
    }

    const anim = () => {
      ctx.clearRect(0, 0, w, h)
      els.current.forEach(el => {
        if (el.t === 'd') {
          el.x += el.vx; el.y += el.vy
          const dx = mouse.current.x - el.x, dy = mouse.current.y - el.y, dist = Math.hypot(dx, dy)
          if (dist < 100) { el.vx -= dx * 0.0004; el.vy -= dy * 0.0004 }
          if (el.x < 0 || el.x > w) el.vx *= -1
          if (el.y < 0 || el.y > h) el.vy *= -1
          ctx.beginPath(); ctx.arc(el.x, el.y, el.s, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${el.hue}, ${el.o})`; ctx.fill()
        } else {
          const mx = el.x + el.w / 2, my = el.y + el.h / 2, dist = Math.hypot(mx - mouse.current.x, my - mouse.current.y)
          const tp = dist < 150 ? 1 - dist / 150 : 0; el.p += (tp - el.p) * 0.15
          const pushX = (el.p > 0) ? (mouse.current.x - mx) * el.p * 0.4 : 0
          const pushY = (el.p > 0) ? (mouse.current.y - my) * el.p * 0.4 : 0
          const op = el.o * (1 - el.p * 0.5)
          ctx.save(); ctx.translate(el.x + el.w / 2 + pushX, el.y + el.h / 2 + pushY); ctx.rotate(el.a)
          ctx.strokeStyle = `hsla(222, 47%, 25%, ${op})`; ctx.lineWidth = 1.2; ctx.beginPath()
          if (el.t === 'p') { ctx.moveTo(-el.w / 2, 0); ctx.lineTo(0, -el.h / 2); ctx.lineTo(el.w / 2, 0); ctx.lineTo(0, el.h / 2); ctx.closePath() }
          else { ctx.moveTo(-el.w / 2, -el.h / 2); ctx.lineTo(el.w / 2, el.h / 2) }
          ctx.stroke(); ctx.restore()
        }
      })
      frame.current = requestAnimationFrame(anim)
    }
    anim()
    const res = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight }
    const mv = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    window.addEventListener('resize', res)
    window.addEventListener('mousemove', mv)
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener('resize', res); window.removeEventListener('mousemove', mv) }
  }, [theme, mobile])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}

/* 🎨 LUZ AMBIENTAL */
export const AuroraBackground = () => {
  const [c, setC] = useState({ x: '50%', y: '50%' })
  useEffect(() => {
    const m = (e: MouseEvent) => setC({ x: `${e.clientX}px`, y: `${e.clientY}px` })
    window.addEventListener('mousemove', m)
    return () => window.removeEventListener('mousemove', m)
  }, [])
  return <div className="aurora-bg" style={{ '--mx': c.x, '--my': c.y } as React.CSSProperties} />
}

/* 🎬 CINEMÁTICOS */
export const CinematicGrain = () => <div className="cinematic-grain" />
export const CinematicVignette = () => <div className="cinematic-vignette" />

/* 🌊 LÍQUIDO */
export const LiquidEffect = () => {
  const [r, setR] = useState<{ id: number; x: number; y: number }[]>([])
  useEffect(() => {
    const d = (e: PointerEvent) => {
      const id = Date.now()
      setR(p => [...p, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setR(p => p.filter(i => i.id !== id)), 800)
    }
    window.addEventListener('pointerdown', d)
    return () => window.removeEventListener('pointerdown', d)
  }, [])
  return <>{r.map(i => (<div key={i.id} className="liquid-ripple" style={{ left: i.x, top: i.y, width: 120, height: 120 }} />))}</>
}

/* 🎨 SWITCHER */
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  type ThemeId = 'dark' | 'light' | 'cyber'
  const themes: { id: ThemeId; icon: React.ReactNode }[] = [
    { id: 'dark', icon: <Moon className="w-4 h-4" /> },
    { id: 'light', icon: <Sun className="w-4 h-4" /> },
    { id: 'cyber', icon: <ZapIcon className="w-4 h-4" /> }
  ]
  return (
    <div className="fixed bottom-6 left-6 z-[100] flex gap-2 p-1 rounded-full bg-[hsl(var(--card))/0.5] border border-[hsl(var(--border))] backdrop-blur-md shadow-lg pointer-events-auto">
      {themes.map(t => (
        <button key={t.id} onClick={() => setTheme(t.id)} className={`p-2 rounded-full transition-all ${theme === t.id ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))]' : 'text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))]'}`}>
          {t.icon}
        </button>
      ))}
    </div>
  )
}

/* 🎵 AUDIO REACTIVO (Fix TS: o.current null check en setTimeout) */
export const ReactiveAudio = () => {
  const [a, s] = useState(false)
  const [m, sm] = useState(false)
  const c = useRef<AudioContext | null>(null)
  const g = useRef<GainNode | null>(null)
  const o = useRef<OscillatorNode | null>(null)
  const t = useRef<ReturnType<typeof setTimeout>>()

  const init = async () => {
    if (c.current) return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      c.current = ctx
      const gn = ctx.createGain(); gn.gain.value = 0.02; g.current = gn
      const os = ctx.createOscillator(); os.type = 'sine'; os.frequency.value = 85; o.current = os
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 600
      os.connect(f); f.connect(gn); gn.connect(ctx.destination); os.start()
      gn.gain.setTargetAtTime(0.02, ctx.currentTime, 0.1); s(true)
    } catch (e) { console.warn('Audio bloqueado:', e) }
  }

  const toggle = async () => {
    if (!c.current) { await init(); return }
    if (c.current.state === 'suspended') await c.current.resume()
    s(prev => !prev)
  }

  const mute = () => {
    if (!g.current || !c.current) return
    sm(prev => !prev)
    g.current.gain.setTargetAtTime(!m ? 0.02 : 0, c.current.currentTime, 0.05)
  }

  useEffect(() => {
    let lx = 0, ly = 0
    const mv = (e: MouseEvent) => {
      if (!a || m || !c.current || !g.current || !o.current) return
      clearTimeout(t.current)
      const sp = Math.hypot(e.clientX - lx, e.clientY - ly)
      lx = e.clientX; ly = e.clientY
      g.current.gain.setTargetAtTime(Math.min(0.09, sp * 0.0008) + 0.02, c.current.currentTime, 0.05)
      o.current.frequency.setTargetAtTime(85 + Math.min(70, sp * 0.9), c.current.currentTime, 0.1)
      t.current = setTimeout(() => {
        if (!g.current || !c.current || !o.current) return
        g.current.gain.setTargetAtTime(0.02, c.current.currentTime, 0.2)
        o.current.frequency.setTargetAtTime(85, c.current.currentTime, 0.3)
      }, 250)
    }
    window.addEventListener('mousemove', mv)
    return () => { window.removeEventListener('mousemove', mv); clearTimeout(t.current) }
  }, [a, m])

  useEffect(() => () => { o.current?.stop(); c.current?.close() }, [])

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 pointer-events-auto">
      {a && (
        <button onClick={mute} className="p-2.5 rounded-full bg-neutral-900/60 border border-white/10 hover:bg-neutral-800/80 transition-all backdrop-blur-md text-white shadow-lg cursor-pointer">
          {m ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
      <button onClick={toggle} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-lg flex items-center gap-2 cursor-pointer ${a ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-500/25'}`}>
        <Music className="w-3.5 h-3.5" /> {a ? (m ? 'Muteado' : 'Activo') : 'Activar Audio'}
      </button>
    </div>
  )
}