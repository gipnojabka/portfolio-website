import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#home', label: 'Home', hideOnMobile: true },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services', hideOnMobile: true },
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
      className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-center py-4 px-4 md:px-6"
      style={{
        width: '100%',
        background: 'rgba(12,12,12,0.9)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-center w-full py-1">
        {LINKS.map(({ href, label, hideOnMobile }, i) => {
          const id = href.slice(1)
          const isActive = activeId === id
          const isFirst = i === 0
          return (
            <span
              key={href}
              className={`inline-flex items-center flex-shrink-0 ${hideOnMobile ? 'hidden md:inline-flex' : 'inline-flex'}`}
            >
              {!isFirst && (
                <span className="mx-4 md:mx-6 text-[#666] text-[8px] md:text-[10px]" aria-hidden>·</span>
              )}
              <a
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="transition-colors duration-200 hover:opacity-90 text-[10px] md:text-[12px] tracking-[1px] md:tracking-[2px] uppercase no-underline"
                style={{ color: isActive ? '#4A9EFF' : '#F0F0F0' }}
              >
                {label}
              </a>
            </span>
          )
        })}
      </div>
    </nav>
  )
}
