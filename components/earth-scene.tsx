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
  const earthRef = useRef<THREE.Mesh | null>(null)
  const starsRef = useRef<THREE.Points | null>(null)
  const rafRef = useRef<number>(0)
  
  // Refs para controlar el progreso del scroll sin re-renders
  const nightFactorRef = useRef(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return
    setIsMounted(true)

    // 🎬 SETUP BÁSICO
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 7)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 🌟 STARFIELD
    const starsGeo = new THREE.BufferGeometry()
    const starsCount = 2500
    const positions = new Float32Array(starsCount * 3)
    for(let i = 0; i < starsCount * 3; i++) positions[i] = (Math.random() - 0.5) * 80
    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starsMat = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending })
    const stars = new THREE.Points(starsGeo, starsMat)
    scene.add(stars)
    starsRef.current = stars

    // 🌍 EARTH SHADER (Día/Noche sin texturas problemáticas)
    const earthGeo = new THREE.SphereGeometry(2, 64, 64)
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNight: { value: 0 }, // 0 = Día, 1 = Noche
        uLightDir: { value: new THREE.Vector3(1, 0.5, 1).normalize() }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uNight;
        uniform vec3 uLightDir;
        varying vec3 vNormal;
        varying vec3 vPosition;

        // Función pseudo-aleatoria para ciudades
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + vec3(.1,.2,.3));
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        void main() {
          // Iluminación direccional
          float diff = max(dot(vNormal, uLightDir), 0.0);
          
          // Color base día (azul tecnológico profundo)
          vec3 dayColor = vec3(0.06, 0.15, 0.35);
          vec3 nightColor = vec3(0.02, 0.02, 0.05);
          
          // Mezcla día/noche
          vec3 baseColor = mix(dayColor, nightColor, uNight);
          
          // Luces de ciudad (procedurales, solo visibles de noche)
          float cityNoise = hash(floor(vPosition * 8.0));
          float cities = smoothstep(0.85, 0.95, cityNoise);
          vec3 cityLight = vec3(1.0, 0.75, 0.2) * cities * (uNight * 2.0);
          
          // Atmósfera Fresnel
          float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
          vec3 atmosphere = vec3(0.2, 0.5, 1.0) * fresnel * 0.4;
          
          // Composición final
          vec3 finalColor = baseColor * (0.3 + diff * 0.7) + cityLight + atmosphere;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide
    })

    const earth = new THREE.Mesh(earthGeo, earthMat)
    scene.add(earth)
    earthRef.current = earth

    // 🌫️ ATMOSPHERE GLOW
    const glowGeo = new THREE.SphereGeometry(2.15, 64, 64)
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vNormal;void main(){float i=pow(0.65-dot(vNormal,vec3(0,0,1)),2.5);gl_FragColor=vec4(0.3,0.6,1.0,i*0.25);}`,
      blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    scene.add(glow)

    // 📜 SCROLL DRIVER
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          nightFactorRef.current = self.progress
        }
      }
    })

    // Animación de cámara suave
    scrollTl.to(camera.position, { z: 5.5, duration: 1 }, 0)
             .to(earth.rotation, { y: Math.PI * 1.5, duration: 2 }, 0)

    // 🔄 RENDER LOOP
    const clock = new THREE.Clock()
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Actualizar uniforms desde refs (evita re-renders de React)
      if (earthMat) {
        earthMat.uniforms.uTime.value = elapsed
        earthMat.uniforms.uNight.value = nightFactorRef.current
      }

      // Rotación idle suave
      earth.rotation.y += 0.0005
      stars.rotation.y = elapsed * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // 📐 RESIZE
    const handleResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // 🧹 CLEANUP
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      scrollTl.scrollTrigger?.kill()
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      earthGeo.dispose()
      earthMat.dispose()
    }
  }, [])

  if (!isMounted) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-0" />
  )
}