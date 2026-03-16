import { useRef, useEffect } from 'react'

export default function WhoIWorkBestWith({ registerReveal }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!registerReveal || !sectionRef.current) return
    registerReveal(sectionRef.current, [contentRef.current])
  }, [registerReveal])

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          ref={contentRef}
          className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-text-primary"
        >
          Who I Work Best With
        </h2>
        <p className="mt-6 text-text-muted font-body text-lg leading-relaxed">
          I work best with companies that move fast and care about results. Whether you're a startup building from scratch, a tech or Web3 project needing a full marketing buildout, a sports or entertainment brand looking to grow an audience, or an e-commerce brand that needs content and retention systems that actually convert — I adapt to what the business needs and I own the outcome.
        </p>
        <a
          href="#contact"
          onClick={scrollToContact}
          className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded bg-[#4A9EFF] text-black font-body text-sm font-bold hover:bg-[#7EC8FF] transition-all duration-300"
        >
          Get In Touch →
        </a>
      </div>
    </section>
  )
}
