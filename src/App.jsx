import { useRef, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import WhoIWorkBestWith from './components/WhoIWorkBestWith'
import About from './components/About'
import MetricsStrip from './components/MetricsStrip'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CursorFollower from './components/CursorFollower'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const revealRefs = useRef([])

  const registerReveal = useCallback((sectionEl, childEls = []) => {
    const els = Array.isArray(childEls) ? childEls : [childEls]
    revealRefs.current.push({ section: sectionEl, children: els.filter(Boolean) })
  }, [])

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        revealRefs.current.forEach(({ section, children }) => {
          if (!section) return
          const targets = children.length ? children.filter(Boolean) : [section]
          const safeTargets = targets.filter(Boolean)
          if (safeTargets.length === 0) return
          gsap.fromTo(
            safeTargets,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      } catch (err) {
        console.warn('Scroll animations skipped:', err)
      }
    }, 100)
    return () => {
      clearTimeout(id)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <CursorFollower />
      <main className="min-h-screen">
        <Hero />
        <Services registerReveal={registerReveal} />
        <WhoIWorkBestWith registerReveal={registerReveal} />
        <About registerReveal={registerReveal} />
        <MetricsStrip />
        <Work registerReveal={registerReveal} />
        <Skills registerReveal={registerReveal} />
        <Contact registerReveal={registerReveal} />
        <footer className="py-8 px-6 sm:px-10 lg:px-20 border-t border-border text-center text-text-muted text-sm">
          © {new Date().getFullYear()} Theodore Lapin
        </footer>
      </main>
    </>
  )
}
