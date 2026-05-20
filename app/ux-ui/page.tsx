import { Metadata } from 'next'
import UxUiContent from '@/components/ux-ui-content'

export const metadata: Metadata = {
  title: "Diseño UX/UI Centrado en Conversión | MajesticWeb",
  description: "Creamos interfaces intuitivas, atractivas y orientadas a resultados. Prototipado, testing y diseño sistemático que convierte visitantes en clientes.",
  openGraph: {
    title: "Diseño UX/UI Centrado en Conversión | MajesticWeb",
    description: "Interfaces intuitivas y prototipado validado que reducen el rebote y multiplican conversiones.",
    url: "https://majesticweb.studio/ux-ui",
    siteName: "MajesticWeb",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño UX/UI Centrado en Conversión | MajesticWeb",
    description: "Prototipado, testing y diseño visual que guían al usuario hacia la conversión.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Diseño UX/UI Centrado en Conversión",
  "provider": { "@type": "Organization", "name": "MajesticWeb", "url": "https://majesticweb.studio" },
  "description": "Diseño de experiencias de usuario e interfaces visuales validadas con testing, enfocadas en reducir la fricción y aumentar conversiones."
}

export default function UXUIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UxUiContent />
    </>
  )
}