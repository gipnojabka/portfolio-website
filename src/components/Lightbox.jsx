import { useEffect } from 'react'

export default function Lightbox({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${scrollY}px`
    } else {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      if (document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      } else {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleContentWheel = (e) => e.stopPropagation()
  const handleContentTouch = (e) => e.stopPropagation()

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Media viewer'}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="fixed top-4 right-4 z-[9999] flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-white transition-colors flex-shrink-0 border border-[#333] md:border-transparent"
        style={{ background: 'rgba(0,0,0,0.9)' }}
        aria-label="Close"
      >
        <svg className="w-[18px] h-[18px] md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className="absolute top-0 left-0 w-full h-full flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain p-4 pt-[60px] md:static md:w-[90vw] md:h-[85vh] md:rounded-xl md:p-6 md:pt-6"
        style={{
          background: '#0C0C0C',
          WebkitOverflowScrolling: 'touch',
        }}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleContentWheel}
        onTouchStart={handleContentTouch}
        onTouchMove={handleContentTouch}
      >
        {children}
      </div>
    </div>
  )
}
