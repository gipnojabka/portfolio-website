import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ParticleField from './ParticleField'

export default function Hero() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current
    const photo = photoRef.current

    const ctx = gsap.context(() => {
      gsap.set([title, subtitle, cta], { opacity: 0, y: 24 })
      gsap.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })
      gsap.to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 })

      if (photo) {
        gsap.set(photo, { opacity: 0 })
        gsap.to(photo, { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-20 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column: text */}
        <div className="max-w-xl pt-[120px]">
          <h1
            ref={titleRef}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-text-primary text-left"
          >
            Theodore Lapin
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 text-[28px] font-normal text-text-primary font-body max-w-xl text-left"
          >
            Marketing Strategist
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-6 py-3 rounded border border-border bg-surface text-text-primary font-body text-sm font-medium hover:border-accent hover:brightness-110 transition-all duration-300"
            >
              View Work
            </a>
            <a
              href="mailto:fedya.lapin@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded bg-accent text-background font-body text-sm font-medium hover:brightness-110 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right column: particle field + photo (hidden on mobile) */}
        <div className="hidden lg:flex relative overflow-visible justify-center w-full h-[80vh] min-h-[400px]">
          {/* Canvas particle field — behind photo, fills column, transparent bg */}
          <ParticleField className="z-0" />

          <img
            ref={photoRef}
            src="/images/Me.png"
            alt="Theodore Lapin"
            className="absolute z-10 w-auto max-w-full"
            style={{
              bottom: 0,
              right: 0,
              top: 'auto',
              height: '100vh',
              objectFit: 'contain',
              objectPosition: 'bottom',
            }}
          />

          {/* Bottom gradient fade into page background */}
          <div
            className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to top, #0C0C0C 0%, transparent 40%)',
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Scroll indicator — above bottom fade on desktop, visible against dark */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest uppercase bottom-8 lg:bottom-[320px]"
        style={{ color: '#F0F0F0', opacity: 0.8 }}
      >
        <span>Scroll</span>
        <div className="w-px h-12 bg-current" style={{ opacity: 0.8 }} />
      </div>
    </section>
  )
}
