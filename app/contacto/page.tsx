import { Metadata } from 'next'
import ContactFormMulti from '@/components/contact-form-multi'

export const metadata: Metadata = {
  title: "Contacto | Agenda tu Consulta Gratuita",
  description: "Cuéntanos tu proyecto. Respondemos en menos de 24h con un plan de acción claro y presupuesto sin compromiso.",
  openGraph: {
    title: "Contacto | MajesticWeb",
    description: "Agenda tu consulta gratuita. Diseño, SEO y rendimiento web de alto impacto.",
    url: "https://majesticweb.studio/contacto",
    siteName: "MajesticWeb",
    locale: "es_ES",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactFormMulti />
}