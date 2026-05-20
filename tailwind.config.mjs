import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ✅ Tipografía fluida: escala matemáticamente de móvil a 4K
      fontSize: {
        'fluid-sm': 'clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)',
        'fluid-base': 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
        'fluid-lg': 'clamp(1.125rem, 0.61vw + 0.97rem, 1.46rem)',
        'fluid-xl': 'clamp(1.25rem, 1vw + 1rem, 1.8rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.56vw + 1.11rem, 2.36rem)',
        'fluid-3xl': 'clamp(1.875rem, 2.38vw + 1.28rem, 3.19rem)',
        'fluid-4xl': 'clamp(2.25rem, 3.54vw + 1.36rem, 4.2rem)',
      },
      // ✅ Curva de animación profesional (Apple/Linear standard)
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config