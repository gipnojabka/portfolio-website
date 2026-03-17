import { useState, useRef, useEffect } from 'react'
import Lightbox from './Lightbox'

export default function ProjectCard({
  title,
  description,
  tags,
  roles = [],
  metric,
  logoSrc,
  videoSrc,
  gallery = [],
  featured = false,
  cardRef,
  cardImageBg,
  cardImageFit = 'cover',
  cardImagePadding,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [fullscreenMedia, setFullscreenMedia] = useState(null)
  const videoRef = useRef(null)
  const hasVideo = Boolean(videoSrc)
  const hasGallery = gallery && gallery.length > 0
  const showInLightbox = hasVideo || hasGallery

  const mediaItems = hasVideo
    ? [{ src: videoSrc, type: 'video' }, ...(gallery || [])]
    : gallery || []
  const hasMedia = mediaItems.length > 0

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setFullscreenMedia(null)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    if (lightboxOpen && title === 'UTXORD' && mediaItems.length > 0) {
      mediaItems.forEach((item, i) => {
        console.log(`UTXORD grid path [${i}]:`, item.src)
      })
    }
  }, [lightboxOpen, title, mediaItems])

  return (
    <>
      <article
        ref={cardRef}
        className="group relative flex flex-col rounded-[12px] border border-border bg-surface overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:border-[#4A9EFF] hover:shadow-[0_0_20px_rgba(74,158,255,0.15)]"
      >
        {featured && (
          <span className="absolute top-4 right-4 z-10 px-2 py-1 text-[10px] uppercase tracking-wider bg-accent/20 text-accent rounded">
            Featured
          </span>
        )}
        <button
          type="button"
          onClick={showInLightbox ? openLightbox : undefined}
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex-shrink-0"
          disabled={!showInLightbox}
        >
          <div
            className="relative w-full h-[280px] overflow-hidden flex items-center justify-center bg-surface"
            style={{
              ...(cardImageBg ? { backgroundColor: cardImageBg } : {}),
              ...(cardImagePadding != null ? { padding: cardImagePadding } : {}),
            }}
          >
            {logoSrc && (
              <img
                src={logoSrc}
                alt={title}
                className="w-full h-full max-w-full max-h-full"
                style={{
                  objectFit: cardImageFit,
                  width: cardImageFit === 'contain' ? 'auto' : '100%',
                  height: cardImageFit === 'contain' ? 'auto' : '100%',
                }}
              />
            )}
          </div>
        </button>
        <div className="flex-1 flex flex-col justify-between min-h-0">
          <div className="p-5 sm:p-6">
            <h3 className="font-display font-bold text-xl text-text-primary">{title}</h3>
            <p className="mt-2 text-text-muted text-sm font-body leading-relaxed">{description}</p>
            {metric && (
              <p className="mt-2 font-semibold" style={{ color: '#4A9EFF', fontSize: '14px', fontWeight: 600 }}>
                {metric}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-accent text-black font-semibold text-sm rounded-md py-[6px] px-[14px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={showInLightbox ? openLightbox : undefined}
            disabled={!showInLightbox}
            className="mt-auto w-full rounded-b-[12px] uppercase font-bold transition-all duration-300 hover:bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface flex-shrink-0"
            style={{
              background: '#FFFFFF',
              color: '#000000',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
              padding: '14px',
            }}
          >
            View Case Study →
          </button>
        </div>
      </article>

      <Lightbox isOpen={lightboxOpen} onClose={closeLightbox} title={title}>
        {lightboxOpen && hasMedia && (
          <>
            {fullscreenMedia ? (
              <div className="w-full h-full flex items-center justify-center">
                {fullscreenMedia.type === 'video' ? (
                  <video
                    ref={videoRef}
                    src={fullscreenMedia.src}
                    className="w-full h-full rounded-lg object-contain cursor-pointer"
                    controls
                    autoPlay
                    playsInline
                    muted={false}
                    preload="none"
                    onClick={() => setFullscreenMedia(null)}
                  />
                ) : (
                  <img
                    src={fullscreenMedia.src}
                    alt=""
                    className="w-full h-full rounded-lg object-contain cursor-pointer"
                    onClick={() => setFullscreenMedia(null)}
                  />
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col min-h-0 flex-1">
                {roles.length > 0 && (
                  <div className="flex-shrink-0 mb-4">
                    <div className="uppercase tracking-wider font-display font-semibold mb-2" style={{ color: '#666', fontSize: '11px' }}>
                      My Role
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-2" style={{ gap: '8px' }}>
                      {roles.map((role) => (
                        <span
                          key={role}
                          className="inline-block font-semibold rounded-md text-xs md:text-sm py-2 px-3 md:py-[6px] md:px-[14px]"
                          style={{ background: '#1a1a1a', border: '1px solid #333', color: '#F0F0F0' }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  className={`lightbox-masonry w-full flex-1 min-h-0 pb-20 ${title === 'TON Church' || title === 'UTXORD' ? 'lightbox-masonry-single-col-mobile' : ''}`}
                >
                {mediaItems.map((item) => (
                  <div
                    key={item.src}
                    className="masonry-item inline-block w-full align-top rounded-lg overflow-hidden mb-3"
                    style={{
                      display: 'inline-block',
                      width: '100%',
                      marginBottom: '12px',
                    }}
                  >
                    {item.type === 'video' ? (
                      <button
                        type="button"
                        onClick={() => setFullscreenMedia(item)}
                        className="block w-full text-left rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:brightness-110 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <video
                          ref={item.src === videoSrc ? videoRef : undefined}
                          src={item.src}
                          className="w-full block rounded-lg"
                          style={{ minHeight: '200px', height: 'auto' }}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setFullscreenMedia({ src: item.src, type: 'image' })}
                        className="block w-full text-left rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:brightness-110 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <img
                          src={item.src}
                          alt=""
                          className="w-full h-auto block rounded-lg"
                        />
                      </button>
                    )}
                  </div>
                ))}
                </div>
              </div>
            )}
          </>
        )}
      </Lightbox>
    </>
  )
}
