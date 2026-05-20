'use client'

import { useEffect, useRef } from 'react'
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
  const cloudGroupRef = useRef<THREE.Group | null>(null)
  const rafRef = useRef<number>(0)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    // 1. Escena, Cámara, Renderer
    const scene = new THREE.Scene()
    sceneRef.current = scene
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(0, 0, 5)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 2. Estrellas
    const starsGeo = new THREE.BufferGeometry()
    const starCount = 3000
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 100 + Math.random() * 200
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = r * Math.cos(phi)
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({
      size: 0.15, color: 0xffffff, transparent: true, opacity: 0.8, sizeAttenuation: true, blending: THREE.AdditiveBlending
    }))
    scene.add(stars)

    // 3. Grupo Tierra
    const earthGroup = new THREE.Group()
    scene.add(earthGroup)
    earthGroupRef.current = earthGroup

    const R = 1.5
    const texLoader = new THREE.TextureLoader()

    const earthDayMat = new THREE.MeshPhongMaterial({ bumpScale: 0.04, specular: new THREE.Color(0x333333), shininess: 20 })
    const earthGeo = new THREE.SphereGeometry(R, 128, 128)
    const earth = new THREE.Mesh(earthGeo, earthDayMat)
    earthGroup.add(earth)

    // Carga segura de texturas
    const loadTex = (url: string) => new Promise<THREE.Texture>((resolve) => texLoader.load(url, resolve))
    Promise.all([
      loadTex('https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'),
      loadTex('https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'),
      loadTex('https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg')
    ]).then(([day, bump, night]) => {
      earthDayMat.map = day
      earthDayMat.bumpMap = bump
      earthDayMat.needsUpdate = true
      earth.userData.nightMat = new THREE.MeshPhongMaterial({
        map: night, emissiveMap: night, emissive: new THREE.Color(0xffddaa), emissiveIntensity: 1.2,
        color: new THREE.Color(0x0a0a15), specular: new THREE.Color(0x111111), shininess: 5
      })
    })

    // Atmósfera (Shader)
    const atmoGeo = new THREE.SphereGeometry(R * 1.08, 128, 128)
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vNormal;void main(){float intensity=pow(0.72-dot(vNormal,vec3(0.0,0.0,1.0)),3.0);vec3 atmosphere=vec3(0.3,0.6,1.0)*intensity;gl_FragColor=vec4(atmosphere,intensity*0.9);}`,
      blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false
    })
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat))

    // Nubes
    const cloudGroup = new THREE.Group()
    earthGroup.add(cloudGroup)
    cloudGroupRef.current = cloudGroup
    texLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png', (tex) => {
      cloudGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.01, 64, 64), new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide })))
      cloudGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.03, 64, 64), new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide })))
    })

    // Luces
    scene.add(new THREE.AmbientLight(0x222244, 0.5))
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    // 4. Loop de animación
    const clock = new THREE.Clock()
    let targetRotX = 0, targetRotY = 0

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      targetRotY += 0.0005
      earthGroup.rotation.x += (targetRotX - earthGroup.rotation.x) * 0.15
      earthGroup.rotation.y += (targetRotY - earthGroup.rotation.y) * 0.15

      cloudGroup.children.forEach((child, i) => {
        child.rotation.y = time * (0.006 + i * 0.003)
      })

      stars.rotation.y = time * 0.0003
      renderer.render(scene, camera)
    }
    animate()

    // 5. GSAP ScrollTrigger
    const sections = document.querySelectorAll('section')
    sections.forEach((_, index) => {
      const trigger = ScrollTrigger.create({
        trigger: sections[index],
        start: 'top center',
        end: 'bottom center',
        onEnter: () => moveCamera(index),
        onEnterBack: () => moveCamera(index)
      })
      triggersRef.current.push(trigger)
    })

    const moveCamera = (index: number) => {
      const positions = [
        { z: 5, x: 0, y: 0 },
        { z: 6.5, x: 2.5, y: 0.5 },
        { z: 5, x: -2.5, y: 0 },
        { z: 5.5, x: 0, y: 0 }
      ]
      const pos = positions[index] || positions[0]
      gsap.to(camera.position, { z: pos.z, x: pos.x, y: pos.y, duration: 2.5, ease: 'power3.inOut' })
    }

    // 6. Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // 7. Cleanup estricto
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose())
          } else {
            obj.material?.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}