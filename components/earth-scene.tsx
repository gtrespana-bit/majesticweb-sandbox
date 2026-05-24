'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cities = [
  { name: "New York", country: "Estados Unidos", lat: 40.7128, lon: -74.0060, pop: "8.3M", tz: "UTC-5" },
  { name: "London", country: "Reino Unido", lat: 51.5074, lon: -0.1278, pop: "9.0M", tz: "UTC+0" },
  { name: "Tokyo", country: "Japón", lat: 35.6762, lon: 139.6503, pop: "14.0M", tz: "UTC+9" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, pop: "5.3M", tz: "UTC+11" },
  { name: "São Paulo", country: "Brasil", lat: -23.5505, lon: -46.6333, pop: "12.3M", tz: "UTC-3" },
  { name: "Dubai", country: "Emiratos Árabes", lat: 25.2048, lon: 55.2708, pop: "3.5M", tz: "UTC+4" },
  { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777, pop: "20.7M", tz: "UTC+5:30" },
  { name: "Paris", country: "Francia", lat: 48.8566, lon: 2.3522, pop: "2.2M", tz: "UTC+1" },
  { name: "Moscow", country: "Rusia", lat: 55.7558, lon: 37.6173, pop: "12.6M", tz: "UTC+3" },
  { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074, pop: "21.5M", tz: "UTC+8" },
  { name: "Cape Town", country: "Sudáfrica", lat: -33.9249, lon: 18.4241, pop: "4.6M", tz: "UTC+2" },
  { name: "Mexico City", country: "México", lat: 19.4326, lon: -99.1332, pop: "9.2M", tz: "UTC-6" },
  { name: "Singapore", country: "Singapur", lat: 1.3521, lon: 103.8198, pop: "5.7M", tz: "UTC+8" },
  { name: "Los Angeles", country: "Estados Unidos", lat: 34.0522, lon: -118.2437, pop: "4.0M", tz: "UTC-8" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, pop: "3.1M", tz: "UTC-3" },
  { name: "Berlin", country: "Alemania", lat: 52.5200, lon: 13.4050, pop: "3.7M", tz: "UTC+1" },
  { name: "Seoul", country: "Corea del Sur", lat: 37.5665, lon: 126.9780, pop: "9.7M", tz: "UTC+9" },
  { name: "Cairo", country: "Egipto", lat: 30.0444, lon: 31.2357, pop: "10.1M", tz: "UTC+2" },
  { name: "Toronto", country: "Canadá", lat: 43.6532, lon: -79.3832, pop: "2.9M", tz: "UTC-5" },
  { name: "Bangkok", country: "Tailandia", lat: 13.7563, lon: 100.5018, pop: "10.5M", tz: "UTC+7" },
  { name: "Istanbul", country: "Turquía", lat: 41.0082, lon: 28.9784, pop: "15.5M", tz: "UTC+3" },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, pop: "15.4M", tz: "UTC+1" },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456, pop: "10.6M", tz: "UTC+7" },
  { name: "Nairobi", country: "Kenia", lat: -1.2921, lon: 36.8219, pop: "4.7M", tz: "UTC+3" },
  { name: "Lima", country: "Perú", lat: -12.0464, lon: -77.0428, pop: "10.0M", tz: "UTC-5" },
  { name: "Oslo", country: "Noruega", lat: 59.9139, lon: 10.7522, pop: "1.0M", tz: "UTC+1" },
  { name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693, pop: "6.2M", tz: "UTC-4" },
  { name: "Stockholm", country: "Suecia", lat: 59.3293, lon: 18.0686, pop: "1.0M", tz: "UTC+1" },
  { name: "Rio de Janeiro", country: "Brasil", lat: -22.9068, lon: -43.1729, pop: "6.7M", tz: "UTC-3" },
  { name: "Madrid", country: "España", lat: 40.4168, lon: -3.7038, pop: "3.3M", tz: "UTC+1" }
]

const connections = [
  [0,1],[0,2],[0,11],[0,13],[0,18],[1,7],[1,5],[1,8],[1,15],[1,20],
  [2,3],[2,9],[2,12],[2,16],[3,12],[4,14],[5,6],[5,19],[6,11],[7,29],
  [8,9],[9,22],[10,23],[11,14],[13,24],[14,26],[15,27],[17,23],[18,25],[19,22]
]

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

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
  const triggersRef = useRef<ScrollTrigger[]>([])
  
  const isDraggingRef = useRef(false)
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const targetRotRef = useRef({ x: 0, y: 0 })
  const rotVelRef = useRef({ x: 0, y: 0 })
  const autoRotateRef = useRef(true)
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const mouseNormRef = useRef({ x: 0, y: 0 })
  const isHoveringEarthRef = useRef(false) // ✅ Nuevo: control de hover
  const nightMatRef = useRef<THREE.MeshPhongMaterial | null>(null)
  const dayMatRef = useRef<THREE.MeshPhongMaterial | null>(null)

  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; city: any }>({ visible: false, x: 0, y: 0, city: null })
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

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

    // Stars
    const starsGeo = new THREE.BufferGeometry()
    const starCount = 3000
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 100 + Math.random() * 200
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i*3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i*3+2] = r * Math.cos(phi)
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ size: 0.15, color: 0xffffff, transparent: true, opacity: 0.8, sizeAttenuation: true, blending: THREE.AdditiveBlending }))
    scene.add(stars)

    // Earth Group
    const earthGroup = new THREE.Group()
    scene.add(earthGroup)
    earthGroupRef.current = earthGroup

    const R = 1.5
    const texLoader = new THREE.TextureLoader()
    const dayMat = new THREE.MeshPhongMaterial({ bumpScale: 0.04, specular: new THREE.Color(0x333333), shininess: 20 })
    dayMatRef.current = dayMat
    const earthGeo = new THREE.SphereGeometry(R, 128, 128)
    const earth = new THREE.Mesh(earthGeo, dayMat)
    earthGroup.add(earth)
    earthRef.current = earth

    const loadTex = (url: string) => new Promise<THREE.Texture>((res) => texLoader.load(url, res))
    Promise.all([
      loadTex('https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'),
      loadTex('https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'),
      loadTex('https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg')
    ]).then(([day, bump, night]) => {
      dayMat.map = day; dayMat.bumpMap = bump; dayMat.needsUpdate = true
      const nMat = new THREE.MeshPhongMaterial({
        map: night, emissiveMap: night, emissive: new THREE.Color(0xffddaa), emissiveIntensity: 1.2,
        color: new THREE.Color(0x0a0a15), specular: new THREE.Color(0x111111), shininess: 5, bumpMap: bump, bumpScale: 0.04
      })
      nightMatRef.current = nMat
    })

    // Atmosphere
    const atmoGeo = new THREE.SphereGeometry(R * 1.08, 128, 128)
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vNormal;void main(){float intensity=pow(0.72-dot(vNormal,vec3(0.0,0.0,1.0)),3.0);vec3 atmosphere=vec3(0.3,0.6,1.0)*intensity;gl_FragColor=vec4(atmosphere,intensity*0.9);}`,
      blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false
    })
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat))

    // Clouds
    const cloudGroup = new THREE.Group()
    earthGroup.add(cloudGroup)
    cloudGroupRef.current = cloudGroup
    texLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png', (tex) => {
      cloudGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.01, 64, 64), new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide })))
      cloudGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.03, 64, 64), new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide })))
    })

    // Lights
    const ambient = new THREE.AmbientLight(0x222244, 0.5)
    scene.add(ambient)
    ambientLightRef.current = ambient
    const sun = new THREE.DirectionalLight(0xffffff, 1.8)
    sun.position.set(5, 3, 5)
    scene.add(sun)
    sunLightRef.current = sun

    // Cities
    const cityGroup = new THREE.Group()
    earthGroup.add(cityGroup)
    cityGroupRef.current = cityGroup
    const cityMeshes: THREE.Mesh[] = []

    cities.forEach((city) => {
      const pos = latLonToVec3(city.lat, city.lon, R * 1.01)
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.95 }))
      dot.position.copy(pos)
      dot.userData = { city }
      cityGroup.add(dot)
      cityMeshes.push(dot)

      const ring = new THREE.Mesh(new THREE.RingGeometry(0.025, 0.04, 24), new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4, side: THREE.DoubleSide }))
      ring.position.copy(pos)
      ring.lookAt(new THREE.Vector3(0, 0, 0))
      ring.userData = { type: 'pulse', phase: Math.random() * Math.PI * 2 }
      cityGroup.add(ring)
    })
    cityMeshesRef.current = cityMeshes

    // Connections
    const arcGroup = new THREE.Group()
    earthGroup.add(arcGroup)
    arcGroupRef.current = arcGroup
    const travelDots: typeof travelDotsRef.current = []

    connections.forEach(([a, b]) => {
      const start = latLonToVec3(cities[a].lat, cities[a].lon, R * 1.01)
      const end = latLonToVec3(cities[b].lat, cities[b].lon, R * 1.01)
      const mid = start.clone().add(end).multiplyScalar(0.5)
      const dist = start.distanceTo(end)
      mid.normalize().multiplyScalar(R * 1.01 + dist * 0.4)
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      arcGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)), new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.12 })))

      const td = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 8), new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.9 }))
      travelDots.push({ mesh: td, curve, progress: Math.random(), speed: 0.0008 + Math.random() * 0.0015 })
      arcGroup.add(td)
    })
    travelDotsRef.current = travelDots

    // Animation Loop
    const clock = new THREE.Clock()
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      if (!isDraggingRef.current) {
        targetRotRef.current.x += rotVelRef.current.x
        targetRotRef.current.y += rotVelRef.current.y
        rotVelRef.current.x *= 0.95
        rotVelRef.current.y *= 0.95

        if (autoRotateRef.current && Math.abs(rotVelRef.current.x) < 0.001 && Math.abs(rotVelRef.current.y) < 0.001) {
          // ✅ SOLO rota si el cursor NO está sobre la Tierra
          if (!isHoveringEarthRef.current) {
            targetRotRef.current.y += 0.0005 + mouseNormRef.current.x * 0.002
            targetRotRef.current.x += -mouseNormRef.current.y * 0.001 // ✅ Eje Y invertido
          }
        }
      }

      earthGroup.rotation.x += (targetRotRef.current.x - earthGroup.rotation.x) * 0.15
      earthGroup.rotation.y += (targetRotRef.current.y - earthGroup.rotation.y) * 0.15

      cloudGroup.children.forEach((child, i) => { if (child instanceof THREE.Mesh) child.rotation.y = time * (0.006 + i * 0.003) })
      
      cityGroup.children.forEach(child => {
        if (child.userData?.type === 'pulse' && child instanceof THREE.Mesh) {
          const t = child.userData.phase + time * 2
          const scale = 1 + Math.sin(t) * 0.6
          child.scale.setScalar(scale)
          child.material.opacity = Math.max(0, 0.4 - (scale - 1) * 0.3)
        }
      })

      travelDots.forEach(td => {
        td.progress += td.speed
        if (td.progress > 1) td.progress = 0
        td.mesh.position.copy(td.curve.getPoint(td.progress))
      })

      stars.rotation.y = time * 0.0003
      renderer.render(scene, camera)
    }
    animate()

    // Events
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      autoRotateRef.current = false
      clearTimeout(autoRotateTimerRef.current)
      prevMouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseUp = () => {
      isDraggingRef.current = false
      autoRotateTimerRef.current = setTimeout(() => { autoRotateRef.current = true }, 4000)
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouseNormRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNormRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1

      if (isDraggingRef.current) {
        const dx = e.clientX - prevMouseRef.current.x
        const dy = e.clientY - prevMouseRef.current.y
        rotVelRef.current.x = dy * 0.005
        rotVelRef.current.y = dx * 0.005
        targetRotRef.current.x += rotVelRef.current.x
        targetRotRef.current.y += rotVelRef.current.y
        prevMouseRef.current = { x: e.clientX, y: e.clientY }
      }

      if (containerRef.current && earthRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseVecRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseVecRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycasterRef.current.setFromCamera(mouseVecRef.current, camera)

        // ✅ Detectar si el cursor está sobre la Tierra
        const earthHits = raycasterRef.current.intersectObject(earthRef.current)
        isHoveringEarthRef.current = earthHits.length > 0

        // Tooltips
        const cityHits = raycasterRef.current.intersectObjects(cityMeshesRef.current)
        if (cityHits.length > 0) {
          setTooltip({ visible: true, x: e.clientX, y: e.clientY, city: cityHits[0].object.userData.city })
        } else {
          setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev)
        }
      }
    }

    containerRef.current.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // ScrollTrigger
    const sections = document.querySelectorAll('section')
    if (sections.length > 0) {
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
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    function moveCamera(index: number) {
      const positions = [
        { z: 5, x: 0, y: 0 },
        { z: 6.5, x: 2.5, y: 0.5 },
        { z: 5, x: -2.5, y: 0 },
        { z: 5.5, x: 0, y: 0 }
      ]
      const pos = positions[index] || positions[0]
      gsap.to(camera.position, { z: pos.z, x: pos.x, y: pos.y, duration: 2.5, ease: 'power3.inOut' })
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeEventListener('mousedown', handleMouseDown)
      clearTimeout(autoRotateTimerRef.current)
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
          else obj.material?.dispose()
        }
      })
      renderer.dispose()
    }
  }, [])

  // Night Mode Sync
  useEffect(() => {
    if (!earthRef.current || !sunLightRef.current || !ambientLightRef.current || !cloudGroupRef.current) return
    if (isNight) {
      earthRef.current.material = nightMatRef.current || earthRef.current.material
      sunLightRef.current.intensity = 0.05
      ambientLightRef.current.intensity = 0.1
      cloudGroupRef.current.children.forEach((c, i) => { if (c instanceof THREE.Mesh && c.material) c.material.opacity = i === 0 ? 0.2 : 0.1 })
    } else {
      earthRef.current.material = dayMatRef.current || earthRef.current.material
      sunLightRef.current.intensity = 1.8
      ambientLightRef.current.intensity = 0.5
      cloudGroupRef.current.children.forEach((c, i) => { if (c instanceof THREE.Mesh && c.material) c.material.opacity = i === 0 ? 0.8 : 0.3 })
    }
  }, [isNight])

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-auto" />
      
      {tooltip.visible && tooltip.city && (
        <div className="fixed z-50 pointer-events-none bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 min-w-[240px] shadow-2xl shadow-cyan-500/10 transition-opacity duration-200"
          style={{ left: tooltip.x + 20, top: tooltip.y - 15 }}>
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