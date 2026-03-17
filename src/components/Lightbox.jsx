import { useEffect } from 'react'

export default function Lightbox({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => e.target === e.currentTarget && onClose()

  return (
    <div
      className="fixed top-0 left-0 z-[1000] flex items-start justify-center overflow-y-auto"
      style={{
        width: '100vw',
        height: '100dvh',
        background: 'rgba(0,0,0,0.95)',
        WebkitOverflowScrolling: 'touch',
      }}
      onClick={handleBackdropClick}
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
        className="relative w-[95vw] min-h-full rounded-xl p-6 pt-[60px] pb-20 md:w-[90vw] md:max-h-[85vh] md:pb-6"
        style={{ background: '#0C0C0C' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
