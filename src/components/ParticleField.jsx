import { useEffect, useRef } from 'react'

const COLORS = ['#4A9EFF', '#7EC8FF', '#1a6fd4', '#ffffff']
const CONNECTION_MAX_DIST = 100
const PARTICLE_COUNT = 120

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createParticles(width, height) {
  const centerX = width * 0.5
  const centerY = height * 0.35
  const clusterRadius = Math.min(width, height) * 0.38
  const particles = []

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const inCluster = Math.random() < 0.78
    let x, y
    if (inCluster) {
      const angle = Math.random() * Math.PI * 2
      const r = clusterRadius * Math.sqrt(Math.random()) * (0.4 + 0.6 * Math.random())
      x = centerX + Math.cos(angle) * r
      y = centerY + Math.sin(angle) * r * 0.9
    } else {
      x = randomBetween(0, width)
      y = randomBetween(0, height)
    }
    const distFromCenter = Math.hypot(x - centerX, y - centerY)
    const isOutside = distFromCenter > clusterRadius * 1.1
    const opacity = isOutside
      ? randomBetween(0.1, 0.2)
      : randomBetween(0.2, 0.9)

    particles.push({
      x,
      y,
      r: randomBetween(1, 3),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity,
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.3, 0.3),
    })
  }
  return particles
}

export default function ParticleField({ className = '' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let particles = []

    function resize() {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === width && h === height) return
      width = w
      height = h
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(width, height)
      particlesRef.current = particles
    }

    function loop() {
      const p = particlesRef.current
      if (!p || width === 0 || height === 0) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < p.length; i++) {
        p[i].x += p[i].vx
        p[i].y += p[i].vy
        if (p[i].x < 0) { p[i].x = 0; p[i].vx = -p[i].vx }
        if (p[i].x > width) { p[i].x = width; p[i].vx = -p[i].vx }
        if (p[i].y < 0) { p[i].y = 0; p[i].vy = -p[i].vy }
        if (p[i].y > height) { p[i].y = height; p[i].vy = -p[i].vy }
      }

      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[j].x - p[i].x
          const dy = p[j].y - p[i].y
          const dist = Math.hypot(dx, dy)
          if (dist < CONNECTION_MAX_DIST) {
            const alpha = (1 - dist / CONNECTION_MAX_DIST) * 0.5
            ctx.strokeStyle = `rgba(74, 158, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p[i].x, p[i].y)
            ctx.lineTo(p[j].x, p[j].y)
            ctx.stroke()
          }
        }
      }

      for (let i = 0; i < p.length; i++) {
        const pt = p[i]
        const hex = pt.color.startsWith('#') ? pt.color.slice(1) : pt.color
        const r = parseInt(hex.slice(0, 2), 16)
        const g = parseInt(hex.slice(2, 4), 16)
        const b = parseInt(hex.slice(4, 6), 16)
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pt.opacity})`
        ctx.fill()
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(12, 12, 12, 0)')
      gradient.addColorStop(0.5, 'rgba(12, 12, 12, 0)')
      gradient.addColorStop(0.75, 'rgba(12, 12, 12, 0.4)')
      gradient.addColorStop(1, 'rgba(12, 12, 12, 1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}
