import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const sections = LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.getAttribute('id') || ''
          setActiveId(id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-center gap-6 sm:gap-8 py-4 px-6"
      style={{
        width: '100%',
        background: 'rgba(12,12,12,0.9)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {LINKS.map(({ href, label }, i) => {
        const id = href.slice(1)
        const isActive = activeId === id
        return (
          <span key={href} className="inline-flex items-center gap-6 sm:gap-8">
            {i > 0 && <span className="text-[#666]" aria-hidden>·</span>}
            <a
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="transition-colors duration-200 hover:opacity-90"
              style={{
                color: isActive ? '#4A9EFF' : '#F0F0F0',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          </span>
        )
      })}
    </nav>
  )
}
