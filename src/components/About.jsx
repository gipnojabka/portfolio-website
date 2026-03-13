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
    <section ref={sectionRef} className="pt-20 pb-24 sm:pb-32 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <span className="section-label">About</span>
        <p
          ref={textRef}
          className="mt-4 text-text-primary font-body max-w-2xl text-[24px] leading-relaxed"
        >
          I build content systems that generate revenue. From brand identity to AI-augmented production pipelines — I turn creative ideas into measurable business outcomes.
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
      </div>
    </section>
  )
}
