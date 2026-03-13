import { useState, useRef, useEffect } from 'react'
import Lightbox from './Lightbox'

export default function ProjectCard({
  title,
  description,
  tags,
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

  const isTonChurch = title === 'TON Church'

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
        className="group relative rounded-lg border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-accent/40 hover:scale-[1.02] hover:brightness-105"
      >
        {featured && (
          <span className="absolute top-4 right-4 z-10 px-2 py-1 text-[10px] uppercase tracking-wider bg-accent/20 text-accent rounded">
            Featured
          </span>
        )}
        <button
          type="button"
          onClick={showInLightbox ? openLightbox : undefined}
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          disabled={!showInLightbox}
        >
          <div
            className={`aspect-video relative overflow-hidden ${cardImagePadding ? 'flex items-center justify-center' : ''} ${cardImageBg ? '' : 'bg-surface'}`}
            style={{
              ...(cardImageBg ? { backgroundColor: cardImageBg } : {}),
              ...(cardImagePadding ? { padding: cardImagePadding } : {}),
            }}
          >
            {logoSrc && (
              <img
                src={logoSrc}
                alt={title}
                className="w-full h-full transition-opacity duration-300 group-hover:opacity-80"
                style={{ objectFit: cardImageFit, width: '100%', height: '100%' }}
              />
            )}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden
            >
              <span className="font-display font-bold text-lg text-text-primary">{title}</span>
              <span className="text-sm text-accent">View Work →</span>
            </div>
          </div>
        </button>
        <div className="p-5 sm:p-6">
          <h3 className="font-display font-bold text-xl text-text-primary">{title}</h3>
          <p className="mt-2 text-text-muted text-sm font-body leading-relaxed">{description}</p>
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
            ) : isTonChurch ? (
              <div
                className="w-full min-h-0 flex-1"
                style={{
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  height: '100%',
                }}
              >
                <div
                  className="w-full"
                  style={{
                    columnCount: 3,
                    columnGap: '12px',
                  }}
                >
                  {mediaItems.map((item) => (
                    <div
                      key={item.src}
                      className="break-inside-avoid"
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
                          className="w-full h-auto block rounded-lg object-contain align-bottom"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
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
                          className="w-full h-auto block rounded-lg object-contain align-bottom"
                        />
                      </button>
                    )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="w-full columns-3"
                style={{ columnGap: '12px' }}
              >
                {mediaItems.map((item) => (
                  <div
                    key={item.src}
                    className="break-inside-avoid w-full"
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
                          className="w-full h-auto block rounded-lg object-contain align-bottom"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
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
                          className="w-full h-auto block rounded-lg object-contain align-bottom"
                        />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Lightbox>
    </>
  )
}
