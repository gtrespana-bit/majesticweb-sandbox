import { Metadata } from 'next'
import PerformanceContent from '@/components/performance-content'

export const metadata: Metadata = {
  title: "Velocidad y Core Web Vitals | MajesticWeb",
  description: "Optimizamos la velocidad de carga, LCP, INP y CLS. Webs rápidas que retienen usuarios, mejoran el SEO y multiplican conversiones.",
  openGraph: {
    title: "Velocidad y Core Web Vitals | MajesticWeb",
    description: "Optimización de LCP, INP y CLS. Webs que cargan en <2s y retienen usuarios.",
    url: "https://majesticweb.studio/rendimiento-web",
    siteName: "MajesticWeb",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velocidad y Core Web Vitals | MajesticWeb",
    description: "Compresión moderna, lazy loading y edge caching para webs instantáneas.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Optimización de Velocidad y Core Web Vitals",
  "provider": { "@type": "Organization", "name": "MajesticWeb", "url": "https://majesticweb.studio" },
  "description": "Auditoría y optimización de LCP, INP y CLS. Implementación de compresión WebP/AVIF, code splitting, critical CSS y caching en Edge."
}

export default function PerformancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PerformanceContent />
    </>
  )
}