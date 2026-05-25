'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EarthScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const earthGroupRef = useRef<THREE.Group | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const glowRef = useRef<THREE.Mesh | null>(null)
  const rafRef = useRef<number>(0)
  const isNightRef = useRef(false)

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 8)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 🌟 STARFIELD
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 3000
    const posArray = new Float32Array(starsCount * 3)
    for(let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starsMesh)

    // 🌍 EARTH GROUP
    const earthGroup = new THREE.Group()
    scene.add(earthGroup)
    earthGroupRef.current = earthGroup

    // Earth Sphere (Estilizada - sin texturas problemáticas)
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a4d8c,
      emissive: 0x000000,
      specular: 0x111111,
      shininess: 10,
      transparent: true,
      opacity: 0.95
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    earthGroup.add(earth)

    // Wireframe overlay (Tech look)
    const wireframeGeometry = new THREE.WireframeGeometry(earthGeometry)
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00f2fe, 
      transparent: true, 
      opacity: 0.05 
    })
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)
    earthGroup.add(wireframe)

    // 🌟 CITY LIGHTS (Particles instead of textures)
    const citiesCount = 200
    const citiesGeometry = new THREE.BufferGeometry()
    const citiesPos = new Float32Array(citiesCount * 3)
    
    for(let i = 0; i < citiesCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.01
      citiesPos[i*3] = r * Math.sin(phi) * Math.cos(theta)
      citiesPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      citiesPos[i*3+2] = r * Math.cos(phi)
    }
    citiesGeometry.setAttribute('position', new THREE.BufferAttribute(citiesPos, 3))
    const citiesMaterial = new THREE.PointsMaterial({
      color: 0xffaa00,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
    const citiesMesh = new THREE.Points(citiesGeometry, citiesMaterial)
    earthGroup.add(citiesMesh)
    particlesRef.current = citiesMesh

    // 🌟 ATMOSPHERE GLOW
    const glowGeometry = new THREE.SphereGeometry(2.2, 64, 64)
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 0.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    scene.add(glow)
    glowRef.current = glow

    // ☀️ LIGHTING
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)
    
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    // 🎥 SCROLL ANIMATION
    gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
          
          // Day/Night transition
          if (self.progress > 0.5 && !isNightRef.current) {
            isNightRef.current = true
            // Night mode
            gsap.to(earthMaterial.color, { r: 0.02, g: 0.02, b: 0.05, duration: 1 })
            gsap.to(earthMaterial, { emissiveIntensity: 0.3, duration: 1 })
            gsap.to(citiesMaterial, { opacity: 1, size: 0.05, duration: 1 })
            gsap.to(sunLight, { intensity: 0.05, duration: 1 })
            gsap.to(ambientLight, { intensity: 0.1, duration: 1 })
            gsap.to(glowMaterial.uniforms, { value: { intensity: 0.8 }, duration: 1 })
          } else if (self.progress <= 0.5 && isNightRef.current) {
            isNightRef.current = false
            // Day mode
            gsap.to(earthMaterial.color, { r: 0.1, g: 0.3, b: 0.55, duration: 1 })
            gsap.to(earthMaterial, { emissiveIntensity: 0, duration: 1 })
            gsap.to(citiesMaterial, { opacity: 0.3, size: 0.03, duration: 1 })
            gsap.to(sunLight, { intensity: 1.5, duration: 1 })
            gsap.to(ambientLight, { intensity: 0.5, duration: 1 })
          }
        }
      }
    }).to(camera.position, { z: 6, duration: 1 }, 0)
      .to(earthGroup.rotation, { y: Math.PI * 2, duration: 2 }, 0)

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Smooth rotation
      earthGroup.rotation.y += 0.001
      starsMesh.rotation.y = time * 0.02
      
      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.05
      }

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-0" />
      
      {/* UI Overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-center items-center">
        <div className={`text-center transition-all duration-1000 ${scrollProgress < 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            Majestic<span className="text-cyan-400">Web</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Creamos experiencias digitales que trascienden fronteras
          </p>
        </div>

        <div className={`text-center transition-all duration-1000 ${scrollProgress >= 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Conexión Global</h2>
          <p className="text-2xl text-cyan-400 font-light mb-8">Te conectamos con el mundo</p>
          <button className="pointer-events-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all">
            Iniciar Proyecto
          </button>
        </div>
      </div>
    </>
  )
}