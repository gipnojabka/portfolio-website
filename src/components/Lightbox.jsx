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

  const handleContentWheel = (e) => e.stopPropagation()
  const handleContentTouch = (e) => e.stopPropagation()

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Media viewer'}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors z-10"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className="relative flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain"
        style={{
          width: '90vw',
          height: '85vh',
          background: '#141414',
          borderRadius: '12px',
          padding: '24px',
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
