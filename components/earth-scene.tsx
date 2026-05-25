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
  const cloudGroupRef = useRef<THREE.Group | null>(null)
  const cityGroupRef = useRef<THREE.Group | null>(null)
  const arcGroupRef = useRef<THREE.Group | null>(null)
  const earthRef = useRef<THREE.Mesh | null>(null)
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null)
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null)
  const cityMeshesRef = useRef<THREE.Mesh[]>([])
  const travelDotsRef = useRef<{ mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[]>([])
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseVecRef = useRef(new THREE.Vector2())
  const rafRef = useRef<number>(0)
  
  const isDraggingRef = useRef(false)
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const targetRotRef = useRef({ x: 0, y: 0 })
  const rotVelRef = useRef({ x: 0, y: 0 })
  const autoRotateRef = useRef(true)
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const mouseNormRef = useRef({ x: 0, y: 0 })
  const isHoveringEarthRef = useRef(false)
  const isNightRef = useRef(false)

  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; city: any }>({ visible: false, x: 0, y: 0, city: null })
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(0, 0, 5.5)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1 // Exposición equilibrada para que las luces de noche resalten
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Stars
    const starsGeo = new THREE.BufferGeometry()
    const starCount = 4000
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 80 + Math.random() * 150
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i*3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i*3+2] = r * Math.cos(phi)
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ 
      size: 0.12, color: 0xffffff, transparent: true, opacity: 0.7, sizeAttenuation: true, blending: THREE.AdditiveBlending 
    }))
    scene.add(stars)

    // Earth Group
    const earthGroup = new THREE.Group()
    scene.add(earthGroup)
    earthGroupRef.current = earthGroup

    const R = 1.5
    const texLoader = new THREE.TextureLoader()
    
    // Cargamos texturas en paralelo
    Promise.all([
      new Promise<THREE.Texture>((res) => texLoader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg', res)),
      new Promise<THREE.Texture>((res) => texLoader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png', res)),
      new Promise<THREE.Texture>((res) => texLoader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg', res))
    ]).then(([day, bump, night]) => {
      // ✅ MATERIAL UNIFICADO (Soluciona el color verde raro)
      // Usamos el mapa de día como base y el de noche como capa de brillo (emissive)
      const earthMat = new THREE.MeshPhongMaterial({
        map: day,
        bumpMap: bump,
        bumpScale: 0.04,
        emissiveMap: night,      // Aquí está el truco: la textura de noche controla qué brilla
        emissive: new THREE.Color(0xffaa00), // Color de las luces de ciudad (Naranja cálido)
        emissiveIntensity: 0.0,  // Empieza en 0 (Día)
        color: 0xffffff,         // Base blanca para que los colores del día sean reales
        specular: new THREE.Color(0x333333),
        shininess: 15
      })
      
      const earthGeo = new THREE.SphereGeometry(R, 128, 128)
      const earth = new THREE.Mesh(earthGeo, earthMat)
      earthGroup.add(earth)
      earthRef.current = earth
    })

    // Atmosphere (Sutil, como pediste)
    const atmoGeo = new THREE.SphereGeometry(R * 1.06, 128, 128)
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `
        varying vec3 vNormal;
        void main(){
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.2, 0.4, 0.9, intensity * 0.12); // Opacidad muy baja (0.12)
        }
      `,
      blending: THREE.AdditiveBlending, 
      side: THREE.BackSide, 
      transparent: true, 
      depthWrite: false, 
      depthTest: false
    })
    const atmo = new THREE.Mesh(atmoGeo, atmoMat)
    atmo.renderOrder = 2
    earthGroup.add(atmo)

    // Clouds
    const cloudGroup = new THREE.Group()
    earthGroup.add(cloudGroup)
    cloudGroupRef.current = cloudGroup
    texLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png', (tex) => {
      cloudGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.008, 64, 64), new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide })))
    })

    // Lights
    const ambient = new THREE.AmbientLight(0x444466, 0.6)
    scene.add(ambient)
    ambientLightRef.current = ambient
    const sun = new THREE.DirectionalLight(0xffffff, 1.6)
    sun.position.set(5, 3, 5)
    scene.add(sun)
    sunLightRef.current = sun

    // Cities & Connections
    const cityGroup = new THREE.Group()
    earthGroup.add(cityGroup)
    cityGroupRef.current = cityGroup
    const cities = [
      { name: "New York", lat: 40.7128, lon: -74.0060 }, { name: "London", lat: 51.5074, lon: -0.1278 },
      { name: "Tokyo", lat: 35.6762, lon: 139.6503 }, { name: "Sydney", lat: -33.8688, lon: 151.2093 },
      { name: "São Paulo", lat: -23.5505, lon: -46.6333 }, { name: "Dubai", lat: 25.2048, lon: 55.2708 },
      { name: "Mumbai", lat: 19.0760, lon: 72.8777 }, { name: "Paris", lat: 48.8566, lon: 2.3522 },
      { name: "Moscow", lat: 55.7558, lon: 37.6173 }, { name: "Beijing", lat: 39.9042, lon: 116.4074 }
    ]
    const cityMeshes: THREE.Mesh[] = []

    cities.forEach(c => {
      const phi = (90 - c.lat) * (Math.PI / 180)
      const theta = (c.lon + 180) * (Math.PI / 180)
      const pos = new THREE.Vector3(-R*1.01*Math.sin(phi)*Math.cos(theta), R*1.01*Math.cos(phi), R*1.01*Math.sin(phi)*Math.sin(theta))
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.95 }))
      dot.position.copy(pos); dot.userData = { city: c }; cityGroup.add(dot); cityMeshes.push(dot)
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.025, 0.04, 24), new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4, side: THREE.DoubleSide }))
      ring.position.copy(pos); ring.lookAt(0,0,0); cityGroup.add(ring)
    })
    cityMeshesRef.current = cityMeshes

    const arcGroup = new THREE.Group()
    earthGroup.add(arcGroup)
    arcGroupRef.current = arcGroup
    const travelDots: typeof travelDotsRef.current = []
    const conns = [[0,1],[0,2],[1,7],[2,3],[3,4],[5,6],[7,8],[8,9]]
    conns.forEach(([a,b]) => {
      const phiA = (90-cities[a].lat)*(Math.PI/180), thetaA = (cities[a].lon+180)*(Math.PI/180)
      const phiB = (90-cities[b].lat)*(Math.PI/180), thetaB = (cities[b].lon+180)*(Math.PI/180)
      const start = new THREE.Vector3(-R*Math.sin(phiA)*Math.cos(thetaA), R*Math.cos(phiA), R*Math.sin(phiA)*Math.sin(thetaA))
      const end = new THREE.Vector3(-R*Math.sin(phiB)*Math.cos(thetaB), R*Math.cos(phiB), R*Math.sin(phiB)*Math.sin(thetaB))
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R*1.25)
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      arcGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)), new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.15 })))
      const td = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 8), new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.9 }))
      travelDots.push({ mesh: td, curve, progress: Math.random(), speed: 0.0008 + Math.random() * 0.0015 })
      arcGroup.add(td)
    })
    travelDotsRef.current = travelDots

    // 🎥 SCROLL-DRIVEN CAMERA + TRIGGER NIGHT MODE
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-journey',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            // 🌗 Trigger día/noche basado en posición del scroll
            if (self.progress > 0.5 && !isNightRef.current) {
              isNightRef.current = true
              setIsNight(true)
            } else if (self.progress <= 0.5 && isNightRef.current) {
              isNightRef.current = false
              setIsNight(false)
            }
          }
        }
      })

      // Recorrido lateral + zoom
      tl.to(camera.position, { x: -2.4, z: 4.0, duration: 1, ease: 'power2.inOut' })
        .to(earthGroup.rotation, { y: 0.6, duration: 1 }, '<')
        .to(camera.position, { x: 2.4, z: 5.2, duration: 1, ease: 'power2.inOut' })
        .to(earthGroup.rotation, { y: 1.8, duration: 1 }, '<')
        .to(camera.position, { x: 0, z: 4.5, duration: 1, ease: 'power2.inOut' })
        .to(earthGroup.rotation, { y: 3.0, duration: 1 }, '<')
    }, containerRef)

    // Animation Loop
    const clock = new THREE.Clock()
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      if (!isDraggingRef.current) {
        targetRotRef.current.x += rotVelRef.current.x
        targetRotRef.current.y += rotVelRef.current.y
        rotVelRef.current.x *= 0.94
        rotVelRef.current.y *= 0.94

        if (autoRotateRef.current && Math.abs(rotVelRef.current.x) < 0.0005 && Math.abs(rotVelRef.current.y) < 0.0005) {
          if (!isHoveringEarthRef.current) {
            const x = mouseNormRef.current.x
            const y = mouseNormRef.current.y
            const deadZone = 0.12
            const maxSpeed = 0.018
            if (Math.abs(x) > deadZone) targetRotRef.current.y += Math.sign(x) * Math.pow((Math.abs(x)-deadZone)/(1-deadZone), 2) * maxSpeed
            if (Math.abs(y) > deadZone) targetRotRef.current.x -= Math.sign(y) * Math.pow((Math.abs(y)-deadZone)/(1-deadZone), 2) * maxSpeed * 0.5
          }
        }
      }

      earthGroup.rotation.x += (targetRotRef.current.x - earthGroup.rotation.x) * 0.15
      earthGroup.rotation.y += (targetRotRef.current.y - earthGroup.rotation.y) * 0.15

      cityMeshesRef.current.forEach((m, i) => {
        const pulse = 1 + Math.sin(t*2 + i)*0.4
        m.scale.setScalar(pulse)
        const mat = m.material as THREE.MeshBasicMaterial
        mat.opacity = 0.6 + Math.sin(t*2+i)*0.3
      })

      travelDotsRef.current.forEach(td => {
        td.progress += td.speed
        if (td.progress > 1) td.progress = 0
        td.mesh.position.copy(td.curve.getPoint(td.progress))
      })

      stars.rotation.y = t * 0.0002
      renderer.render(scene, camera)
    }
    animate()

    // Events
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true; autoRotateRef.current = false; clearTimeout(autoRotateTimerRef.current)
      prevMouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseUp = () => {
      isDraggingRef.current = false; autoRotateTimerRef.current = setTimeout(() => { autoRotateRef.current = true }, 4000)
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouseNormRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNormRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1

      if (isDraggingRef.current) {
        const dx = e.clientX - prevMouseRef.current.x
        const dy = e.clientY - prevMouseRef.current.y
        rotVelRef.current.x = dy * 0.005; rotVelRef.current.y = dx * 0.005
        targetRotRef.current.x += rotVelRef.current.x; targetRotRef.current.y += rotVelRef.current.y
        prevMouseRef.current = { x: e.clientX, y: e.clientY }
      }

      if (containerRef.current && earthRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseVecRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseVecRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycasterRef.current.setFromCamera(mouseVecRef.current, camera)
        isHoveringEarthRef.current = raycasterRef.current.intersectObject(earthRef.current).length > 0
        const cityHits = raycasterRef.current.intersectObjects(cityMeshesRef.current)
        if (cityHits.length > 0) setTooltip({ visible: true, x: e.clientX, y: e.clientY, city: cityHits[0].object.userData.city })
        else setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev)
      }
    }

    containerRef.current.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    return () => {
      cancelAnimationFrame(rafRef.current); ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('mouseup', handleMouseUp); window.removeEventListener('mousemove', handleMouseMove)
      containerRef.current?.removeEventListener('mousedown', handleMouseDown)
      clearTimeout(autoRotateTimerRef.current)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) containerRef.current.removeChild(renderer.domElement)
      scene.traverse(obj => { if (obj instanceof THREE.Mesh) { obj.geometry?.dispose(); if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose()); else obj.material?.dispose() } })
      renderer.dispose()
    }
  }, [])

  // 🌗 Sincronización Día/Noche (Controla luces + brillo del material)
  useEffect(() => {
    if (!earthRef.current || !sunLightRef.current || !ambientLightRef.current || !cloudGroupRef.current) return
    
    if (isNight) {
      // 🌑 NOCHE: Apagamos el sol y encendemos el brillo de las ciudades
      gsap.to(sunLightRef.current, { intensity: 0.05, duration: 1.2, ease: 'power2.inOut' }) 
      gsap.to(ambientLightRef.current, { intensity: 0.05, duration: 1.2, ease: 'power2.inOut' })
      
      // Subimos la intensidad emisiva para que las ciudades brillen
      if (earthRef.current.material instanceof THREE.MeshPhongMaterial) {
        gsap.to(earthRef.current.material, { emissiveIntensity: 1.8, duration: 1.2, ease: 'power2.inOut' })
      }
      
      // Nubes casi invisibles de noche
      cloudGroupRef.current.children.forEach((c, i) => { 
        if (c instanceof THREE.Mesh && c.material) gsap.to(c.material, { opacity: 0.05, duration: 1.2 }) 
      })
    } else {
      // ☀️ DIA: Encendemos el sol y apagamos el brillo nocturno
      gsap.to(sunLightRef.current, { intensity: 1.6, duration: 1.2, ease: 'power2.inOut' })
      gsap.to(ambientLightRef.current, { intensity: 0.6, duration: 1.2, ease: 'power2.inOut' })
      
      // Bajamos la intensidad emisiva a 0 para que no se vean luces de día
      if (earthRef.current.material instanceof THREE.MeshPhongMaterial) {
        gsap.to(earthRef.current.material, { emissiveIntensity: 0.0, duration: 1.2, ease: 'power2.inOut' })
      }

      // Nubes visibles
      cloudGroupRef.current.children.forEach((c, i) => { 
        if (c instanceof THREE.Mesh && c.material) gsap.to(c.material, { opacity: i === 0 ? 0.5 : 0.3, duration: 1.2 }) 
      })
    }
  }, [isNight])

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-auto" />
      {tooltip.visible && tooltip.city && (
        <div className="fixed z-50 pointer-events-none bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 min-w-[240px] shadow-2xl shadow-cyan-500/10" style={{ left: tooltip.x + 20, top: tooltip.y - 15 }}>
          <h4 className="text-cyan-400 font-semibold text-lg mb-1">📍 {tooltip.city.name}</h4>
          <p className="text-white/50 text-sm mb-3">{tooltip.city.country}</p>
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-3" />
          <div className="space-y-1 text-xs text-white/40">
            <div className="flex justify-between"><span>Población</span><span className="text-white font-medium">{tooltip.city.pop}</span></div>
            <div className="flex justify-between"><span>Latitud</span><span className="text-white font-medium">{Math.abs(tooltip.city.lat).toFixed(2)}°{tooltip.city.lat >= 0 ? 'N' : 'S'}</span></div>
            <div className="flex justify-between"><span>Longitud</span><span className="text-white font-medium">{Math.abs(tooltip.city.lon).toFixed(2)}°{tooltip.city.lon >= 0 ? 'E' : 'W'}</span></div>
            <div className="flex justify-between"><span>Zona horaria</span><span className="text-white font-medium">{tooltip.city.tz}</span></div>
          </div>
        </div>
      )}
      <button onClick={() => setIsNight(p => !p)} className="fixed top-24 right-6 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all" title="Modo Noche">
        {isNight ? '☀️' : '🌙'}
      </button>
    </>
  )
}