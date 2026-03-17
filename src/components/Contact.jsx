import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const EMAIL = 'lapintheodore@gmail.com'

export default function Contact({ registerReveal }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastFading, setToastFading] = useState(false)
  const toastTimeoutsRef = useRef([])

  useEffect(() => {
    if (!registerReveal || !sectionRef.current) return
    registerReveal(sectionRef.current, [contentRef.current])
  }, [registerReveal])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setToastFading(false)
      setToastVisible(true)
      toastTimeoutsRef.current.forEach(clearTimeout)
      toastTimeoutsRef.current = [
        setTimeout(() => setToastFading(true), 2500),
        setTimeout(() => {
          setToastVisible(false)
          setToastFading(false)
        }, 2500 + 400),
      ]
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

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
        <div className="mt-6 font-body text-center" style={{ fontSize: '18px', color: '#888', lineHeight: 2 }}>
          <p className="mb-0">Need a growth system that actually converts?</p>
          <p className="mb-0">Looking for strategy, content, or email infrastructure?</p>
          <p className="mb-0">Have a project that needs clearer execution and measurable results?</p>
        </div>
        <p className="font-body text-center" style={{ fontSize: '20px', color: '#F0F0F0', fontWeight: 600, marginTop: '24px' }}>
          If yes — I want to hear about it.
        </p>
        <button
          type="button"
          onClick={handleCopyEmail}
          title="Click to copy"
          className="mt-8 font-body text-xl sm:text-2xl font-medium hover:brightness-110 transition-all underline underline-offset-4 decoration-accent/60 hover:decoration-accent border-0 bg-transparent text-accent cursor-pointer"
        >
          {EMAIL}
        </button>
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

      {toastVisible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 font-body font-semibold transition-opacity duration-300 ease-out"
          style={{
            bottom: '32px',
            transform: 'translateX(-50%)',
            background: '#4A9EFF',
            color: '#000',
            fontWeight: 600,
            borderRadius: '8px',
            padding: '12px 24px',
            opacity: toastFading ? 0 : 1,
            animation: toastFading ? 'none' : 'contactToastFadeIn 0.3s ease-out',
          }}
        >
          Email copied to clipboard ✓
        </div>
      )}
    </section>
  )
}
