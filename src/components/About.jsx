import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function About({ registerReveal }) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    if (!registerReveal || !sectionRef.current) return
    registerReveal(sectionRef.current, [textRef.current, statsRef.current])
  }, [registerReveal])

  const stats = [
    { value: '6+', label: 'YEARS IN MARKETING' },
    { value: '10+', label: 'INDUSTRIES' },
    { value: '200M+', label: 'VIEWS GENERATED' },
  ]

  return (
    <section ref={sectionRef} id="about" className="pt-20 pb-24 sm:pb-32 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <span className="section-label">About</span>
        <p
          ref={textRef}
          className="mt-4 text-text-primary font-body max-w-2xl text-[24px] leading-relaxed"
        >
          I don't run campaigns — I build the infrastructure behind them. Email systems that generate 40% YoY revenue growth. Content pipelines producing 120+ pieces a month. Communities of 3 million users built in 5 months. I work at the intersection of strategy, creative, and operations. Give me a goal and I'll build the system that hits it.
        </p>
        <div
          ref={statsRef}
          className="mt-[60px] grid grid-cols-1 sm:grid-cols-3 justify-items-start"
          style={{ gap: '80px' }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-left">
              <div
                className="font-display font-bold text-accent"
                style={{
                  display: 'inline-block',
                  fontSize: '80px',
                  lineHeight: 1,
                  verticalAlign: 'baseline',
                  fontVariantNumeric: 'normal',
                }}
              >
                {value}
              </div>
              <div
                className="uppercase"
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: '#666',
                  marginTop: '8px',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="font-body hover:opacity-90 transition-opacity"
            style={{ color: '#4A9EFF' }}
          >
            Interested in working together? → Get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
