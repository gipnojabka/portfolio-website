import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Contact({ registerReveal }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!registerReveal || !sectionRef.current) return
    registerReveal(sectionRef.current, [contentRef.current])
  }, [registerReveal])

  return (
    <section ref={sectionRef} id="contact" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <span className="section-label">Contact</span>
        <h2
          ref={contentRef}
          className="mt-4 font-display font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-text-primary"
        >
          Let's Work Together
        </h2>
        <p className="mt-6 text-text-muted font-body text-body-lg">
          Say hello. I'm always open to a conversation about your next project.
        </p>
        <a
          href="mailto:fedya.lapin@gmail.com"
          className="mt-8 inline-block text-accent font-body text-xl sm:text-2xl font-medium hover:brightness-110 transition-all underline underline-offset-4 decoration-accent/60 hover:decoration-accent"
        >
          fedya.lapin@gmail.com
        </a>
        <div className="mt-10 flex justify-center gap-6 text-text-muted text-sm">
          <a
            href="https://www.linkedin.com/in/theodore-lapin-3ba7ba259/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <span aria-hidden>·</span>
          <a href="tel:+16462211695" className="hover:text-accent transition-colors">
            +1 (646) 221-1695
          </a>
        </div>
      </div>
    </section>
  )
}
