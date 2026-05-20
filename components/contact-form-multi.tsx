'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, GradientBorder } from '@/components/ui-premium'
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, ArrowLeft, Clock } from 'lucide-react'

export default function ContactFormMulti() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}
    if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email no válido'
    }
    if (currentStep === 2) {
      if (!form.type) newErrors.type = 'Selecciona un tipo de proyecto'
    }
    if (currentStep === 3) {
      if (form.message.trim().length < 20) newErrors.message = 'Mínimo 20 caracteres para entender tu proyecto'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => { if (validateStep(step)) setStep(s => Math.min(s + 1, 3)) }
  const prevStep = () => { setErrors({}); setStep(s => Math.max(s - 1, 1)) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(3)) return
    setStatus('sending')
    setTimeout(() => setStatus('success'), 1500)
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg bg-[hsl(var(--bg))] border ${errors[field] ? 'border-red-500' : 'border-[hsl(var(--border))]'} text-[hsl(var(--fg))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))/0.5] focus:border-transparent transition-all placeholder:text-[hsl(var(--muted-fg))]`

  if (status === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg mx-auto">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[hsl(var(--fg))] mb-2">¡Mensaje enviado!</h2>
          <p className="text-[hsl(var(--muted-fg))] mb-6">Gracias {form.name}. Te contactaremos en menos de 24 horas.</p>
          <button onClick={() => { setStatus('idle'); setStep(1); setForm({ name: '', email: '', type: '', budget: '', message: '' }) }} className="px-6 py-3 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))] hover:bg-[hsl(var(--primary))/0.9] font-semibold transition-all">Enviar otro mensaje</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Hablemos de tu proyecto" subtitle="Cuéntanos qué necesitas. Respondemos en menos de 24h, sin compromiso ni tecnicismos." />
      <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto mt-8">
        {/* Sidebar Info */}
        <motion.div className="lg:col-span-2 space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <GradientBorder><div className="bg-[hsl(var(--card))] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[hsl(var(--fg))] mb-1">Estamos aquí para ayudarte</h3>
            <p className="text-[hsl(var(--muted-fg))] text-sm mb-4">Sin presión. Sin letra pequeña. Solo soluciones claras.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[hsl(var(--muted-fg))]"><div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))]"><Mail className="w-5 h-5" /></div><div><div className="text-sm font-medium text-[hsl(var(--fg))]">Email</div><div>hola@majesticweb.studio</div></div></div>
              <div className="flex items-center gap-3 text-[hsl(var(--muted-fg))]"><div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))]"><Phone className="w-5 h-5" /></div><div><div className="text-sm font-medium text-[hsl(var(--fg))]">Teléfono / WhatsApp</div><div>+34 612 345 678</div></div></div>
              <div className="flex items-center gap-3 text-[hsl(var(--muted-fg))]"><div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center text-[hsl(var(--primary))]"><MapPin className="w-5 h-5" /></div><div><div className="text-sm font-medium text-[hsl(var(--fg))]">Dónde estamos</div><div>Madrid, España (Trabajamos remoto con toda España)</div></div></div>
            </div>
          </div></GradientBorder>
          <GradientBorder><div className="bg-gradient-to-br from-[hsl(var(--primary))/0.1] to-[hsl(var(--accent))/0.1] border border-[hsl(var(--primary))/0.3] rounded-xl p-6">
            <h4 className="font-semibold text-[hsl(var(--fg))] mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> Horario</h4>
            <p className="text-[hsl(var(--fg))]">Lunes a Viernes: 9:00 - 19:00</p>
            <p className="text-sm text-[hsl(var(--muted-fg))] mt-1">Consultas urgentes: Soporte 24/7 para clientes activos.</p>
          </div></GradientBorder>
        </motion.div>

        {/* Multi-step Form */}
        <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <GradientBorder><div className="bg-[hsl(var(--card))] rounded-xl p-6 md:p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-[hsl(var(--muted-fg))] mb-2"><span>Paso {step} de 3</span><span>{Math.round((step / 3) * 100)}% completado</span></div>
              <div className="h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" initial={{ width: '33%' }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} /></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-[hsl(var(--fg))]">1. Datos de contacto</h3>
                    <div><label className="block text-sm font-medium text-[hsl(var(--fg))] mb-2">Nombre</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass('name')} placeholder="Tu nombre" /></div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    <div><label className="block text-sm font-medium text-[hsl(var(--fg))] mb-2">Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass('email')} placeholder="Cómo contactarte" /></div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-[hsl(var(--fg))]">2. Tipo de proyecto</h3>
                    <div><label className="block text-sm font-medium text-[hsl(var(--fg))] mb-2">¿Qué necesitas?</label>
                      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className={`${inputClass('type')} appearance-none`}>
                        <option value="">Selecciona una opción</option>
                        <option value="web">Web para mi negocio</option>
                        <option value="ecommerce">Tienda online</option>
                        <option value="app">Aparecer en Google</option>
                        <option value="3d">Mejorar mi web actual</option>
                        <option value="other">Otra cosa</option>
                      </select>
                    </div>
                    {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type}</p>}
                    <div><label className="block text-sm font-medium text-[hsl(var(--fg))] mb-2">Presupuesto orientativo (opcional)</label>
                      <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} className={`${inputClass('budget')} appearance-none`}>
                        <option value="">Selecciona rango</option>
                        <option value="1k-3k">1.000€ - 3.000€</option>
                        <option value="3k-6k">3.000€ - 6.000€</option>
                        <option value="6k+">+6.000€</option>
                      </select>
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-[hsl(var(--fg))]">3. Cuéntanos brevemente tu idea</h3>
                    <div><label className="block text-sm font-medium text-[hsl(var(--fg))] mb-2">Detalles del proyecto</label><textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputClass('message')} resize-none`} placeholder="Ej: Tengo una clínica dental y necesito que los pacientes pidan cita online. Presupuesto orientativo: 1.500€" /></div>
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-[hsl(var(--border))] mt-6">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="px-5 py-2.5 rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--fg))] hover:bg-[hsl(var(--muted))] transition-all flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Atrás</button>
                ) : <div />}
                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="px-5 py-2.5 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-fg))] hover:bg-[hsl(var(--primary))/0.9] transition-all flex items-center gap-2">Siguiente <ArrowRight className="w-4 h-4" /></button>
                ) : (
                  <button type="submit" disabled={status === 'sending'} className="hover-lift btn-press focus-ring px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2">{status === 'sending' ? 'Enviando...' : <>Enviar mensaje <Send className="w-4 h-4" /></>}</button>
                )}
              </div>
            </form>
          </div></GradientBorder>
        </motion.div>
      </div>
    </div>
  )
}