import { Metadata } from 'next'
import SeoContent from '@/components/seo-content'

export const metadata: Metadata = {
  title: "SEO Técnico y Estratégico | MajesticWeb",
  description: "Posiciona tu web en Google con auditorías técnicas, optimización de contenido y estrategia de keywords. Resultados medibles y tráfico cualificado.",
  openGraph: {
    title: "SEO Técnico y Estratégico | MajesticWeb",
    description: "Posiciona tu web en Google con auditorías técnicas, optimización de contenido y estrategia de keywords.",
    url: "https://majesticweb.studio/seo",
    siteName: "MajesticWeb",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Técnico y Estratégico | MajesticWeb",
    description: "Auditorías, keywords y SEO on-page que escalan tu tráfico orgánico.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "SEO Técnico y Estratégico",
      "provider": { "@type": "Organization", "name": "MajesticWeb", "url": "https://majesticweb.studio" },
      "description": "Posicionamiento web con auditorías técnicas, estrategia de keywords, SEO on-page y construcción de autoridad."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "¿Cuánto tiempo tarda en verse resultados con SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Los primeros movimientos técnicos se reflejan en 2-4 semanas. El crecimiento orgánico sostenido suele consolidarse entre los 3 y 6 meses." } },
        { "@type": "Question", "name": "¿El SEO sigue funcionando en 2024/2025?", "acceptedAnswer": { "@type": "Answer", "text": "Más que nunca. Google prioriza la experiencia del usuario, la autoridad temática y la calidad del contenido." } },
        { "@type": "Question", "name": "¿Trabajáis con WordPress, Shopify o desarrollos a medida?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Adaptamos la estrategia a tu stack técnico, aplicando SEO avanzado en WordPress, Shopify o Next.js/React." } }
      ]
    }
  ]
}

export default function SEOPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoContent />
    </>
  )
}