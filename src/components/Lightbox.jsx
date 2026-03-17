import { useEffect } from 'react'

export default function Lightbox({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.dataset.scrollY = String(scrollY)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      const scrollYRestore = document.body.dataset.scrollY || '0'
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      delete document.body.dataset.scrollY
      window.scrollTo(0, parseInt(scrollYRestore, 10))
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => e.target === e.currentTarget && onClose()

  return (
    <div
      className="fixed inset-0 z-[1000]"
      style={{
        background: 'rgba(0,0,0,0.95)',
        overflow: 'hidden',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Media viewer'}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="fixed top-4 right-4 z-[9999] flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-white transition-colors border border-white/20"
        style={{ background: 'rgba(0,0,0,0.9)' }}
        aria-label="Close"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className="lightbox-inner absolute top-0 left-0 w-full h-full overflow-y-auto"
        style={{
          padding: '60px 24px 80px 24px',
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
          background: '#0C0C0C',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
