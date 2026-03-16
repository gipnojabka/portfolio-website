import { useRef, useEffect, useState } from 'react'

const METRICS = [
  { value: 2, label: 'Revenue Generated', format: (n) => `$${n}M+` },
  { value: 40, label: 'YoY Growth', format: (n) => `${n}%` },
  { value: 3, label: 'Community Users Built', format: (n) => `${n}M` },
]

function AnimatedNumber({ target, format, duration = 1500 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animatedRef.current) return
        animatedRef.current = true
        const start = 0
        const startTime = performance.now()
        const tick = (now) => {
          const elapsed = now - startTime
          const t = Math.min(elapsed / duration, 1)
          const eased = 1 - (1 - t) ** 2
          const current = Math.round(start + (target - start) * eased)
          setDisplay(current)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      {format(display)}
    </span>
  )
}

export default function MetricsStrip() {
  return (
    <section
      className="border-t border-b py-12"
      style={{
        background: '#0a0a0a',
        borderColor: '#1a1a1a',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 flex flex-wrap justify-between gap-8 md:gap-0">
        {METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className="flex-1 min-w-[140px] flex flex-col items-center text-center md:items-center md:pr-8 md:last:pr-0"
            style={i < METRICS.length - 1 ? { borderRight: '1px solid #1a1a1a' } : {}}
          >
            <div
              className="font-display font-bold text-4xl sm:text-5xl"
              style={{ color: '#4A9EFF', fontSize: '48px', fontWeight: 700 }}
            >
              <AnimatedNumber target={metric.value} format={metric.format} />
            </div>
            <div
              className="mt-2 uppercase font-display font-semibold"
              style={{ fontSize: '11px', letterSpacing: '2px', color: '#666' }}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
