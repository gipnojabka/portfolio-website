import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CursorFollower() {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const onMove = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] will-change-transform hidden sm:block"
      style={{ transform: 'translate(-50%, -50%)' }}
      aria-hidden="true"
    />
  )
}
