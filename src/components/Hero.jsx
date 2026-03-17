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
    <section id="home" className="relative min-h-screen flex flex-col justify-start lg:justify-center px-6 sm:px-10 lg:px-20 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Photo column: above text on mobile, right on desktop */}
        <div className="order-1 lg:order-2 relative w-full h-[90vw] md:h-[80vh] md:min-h-[400px] overflow-hidden flex justify-center">
          {/* Canvas particle field — behind photo, same area */}
          <ParticleField className="absolute inset-0 z-0 w-full h-full" />

          <img
            ref={photoRef}
            src="/images/Me.png"
            alt="Theodore Lapin"
            className="block w-full h-full object-contain object-center md:absolute md:bottom-0 md:right-0 md:top-auto md:h-[100vh] md:w-auto md:max-w-full md:object-bottom z-10"
          />

          {/* Bottom gradient fade into page background */}
          <div
            className="absolute bottom-0 left-0 w-full h-[120px] md:h-[300px] pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to top, #0C0C0C 0%, transparent 40%)',
            }}
            aria-hidden
          />
        </div>

        {/* Text column: below photo on mobile, left on desktop */}
        <div className="order-2 lg:order-1 max-w-xl mt-0 pt-4 pb-20 md:pb-0 md:pt-[80px]">
          <h1
            ref={titleRef}
            className="font-display font-bold text-[13vw] md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-text-primary text-left"
          >
            Theodore Lapin
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 text-base md:text-[28px] font-normal text-text-primary font-body max-w-xl text-left"
          >
            I build marketing systems for startups — from zero to measurable growth.
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
            <a
              href="#work"
              className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 rounded border border-border bg-surface text-text-primary font-body text-sm font-medium hover:border-accent hover:brightness-110 transition-all duration-300"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 rounded bg-accent text-background font-body text-sm font-medium hover:brightness-110 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
