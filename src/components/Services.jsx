import { useRef, useEffect } from 'react'

const CARDS = [
  {
    icon: '📈',
    title: 'Email & Revenue Marketing',
    description: 'I build email systems from scratch — segmentation, copywriting, automation, and reporting. My campaigns have generated 40% YoY revenue growth and $940K+ in a single year.',
    cta: 'See the results →',
    href: '#work',
  },
  {
    icon: '🎬',
    title: 'Content & Social Strategy',
    description: 'Full content pipelines that scale. 120+ pieces/month, 48M+ views generated across platforms, for sports, Web3, and B2B brands.',
    cta: 'See the work →',
    href: '#work',
  },
  {
    icon: '⚙️',
    title: 'Marketing Operations',
    description: 'I replace 3 hires. CRM setup, workflow automation, team training, AI-augmented processes. $1M+ saved in payroll through operational redesign.',
    cta: "Let's talk →",
    href: '#contact',
  },
]

function ChartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F0F0F0]">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

export default function Services({ registerReveal }) {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!registerReveal || !sectionRef.current) return
    registerReveal(sectionRef.current, cardsRef.current.filter(Boolean))
  }, [registerReveal])

  const handleCta = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="services" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <span className="section-label">Services</span>
        <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-text-primary">
          What I Do
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="rounded-xl border transition-all duration-300 hover:border-[#4A9EFF] hover:shadow-[0_0_30px_rgba(74,158,255,0.1)]"
              style={{
                background: '#141414',
                border: '1px solid #222',
                padding: '32px',
              }}
            >
              <div className="text-[32px] mb-4" style={{ lineHeight: 1 }}>
                {card.icon === '📈' ? <ChartIcon /> : card.icon}
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#F0F0F0]">{card.title}</h3>
              <p
                className="mt-3 font-body"
                style={{ fontSize: '15px', color: '#888', lineHeight: 1.7 }}
              >
                {card.description}
              </p>
              <a
                href={card.href}
                onClick={(e) => handleCta(e, card.href)}
                className="inline-block mt-4 font-body transition-colors hover:opacity-90"
                style={{ color: '#4A9EFF', fontSize: '13px' }}
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
