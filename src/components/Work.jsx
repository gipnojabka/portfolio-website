import { useRef, useEffect } from 'react'
import ProjectCard from './ProjectCard'

// REPLACE: update paths below to match files in public/images/ (e.g. drop your screenshot/video there)
const PROJECTS = [
  {
    id: 'dimov-tax',
    title: 'Dimov Tax',
    description: 'Led marketing and IT operations; rebuilt email strategy and cross-functional process optimization that eliminated six figures in waste.',
    tags: ['Email Marketing', 'Salesforce', 'Marketing Ops', 'Video Production', 'Social Media Marketing'],
    roles: ['Led Strategy', 'Owned Execution', 'Built Email Systems', 'Managed Reporting', 'Trained 280 Staff', 'Salesforce Implementation'],
    metric: '↑ 40% revenue growth YoY from email alone',
    featured: false,
    logoSrc: '/images/Logos/Dimov-Tax Logo.jpeg',
    videoSrc: null,
    gallery: [
      { src: '/images/Vid d1.mp4', type: 'video' },
      { src: '/images/Vid d2.mp4', type: 'video' },
      { src: '/images/Vid d3.mp4', type: 'video' },
      { src: '/images/Dimov shot 1.2.png', type: 'image' },
      { src: '/images/Dimov Shot 2.png', type: 'image' },
      { src: '/images/Dimov shot 3.png', type: 'image' },
      { src: '/images/Salesforce 2 dimov.png', type: 'image' },
      { src: '/images/Salesforece 1 dimov.png', type: 'image' },
    ],
  },
  {
    id: 'yaguarete-media',
    title: 'Yaguarete Media',
    description: 'Creative pipeline end-to-end for a content studio — from briefs and visual direction to video, design, and delivery. AI-augmented brand content systems.',
    tags: ['Video Production', 'Brand Strategy', 'Creative Direction'],
    roles: ['Led Creative Pipeline', 'Managed Production', 'Built AI Workflows', 'Video Editing', 'Brand Strategy'],
    metric: '120+ content pieces/month · $5M+ revenue impact',
    featured: false,
    logoSrc: '/images/Logos/Yaguarete logo 2.png',
    cardImageBg: '#000000',
    cardImageFit: 'contain',
    cardImagePadding: 40,
    videoSrc: null,
    gallery: [
      { src: '/images/YFC2.3.mp4', type: 'video' },
      { src: '/images/YFC2.26.mp4', type: 'video' },
      { src: '/images/YFC2.27.mp4', type: 'video' },
      { src: '/images/YFC2.42.mp4', type: 'video' },
      { src: '/images/Yaguarete 1.mov', type: 'video' },
      { src: '/images/Yaguarete 2.mp4', type: 'video' },
      { src: '/images/Yaguarete 3.png', type: 'image' },
      { src: '/images/Yaguarete 4.png', type: 'image' },
    ],
  },
  {
    id: 'ton-church',
    title: 'TON Church',
    description: 'Community growth strategy, motion design, and marketing for a Telegram-native Web3 project. 3M+ active users in 5 months.',
    tags: ['Community Management', 'Motion Design', 'Web3'],
    roles: ['Owned Marketing Strategy', 'Led Community Growth', 'Produced All Content', 'Motion Design'],
    metric: '3,000,000 users acquired in 5 months',
    featured: false,
    logoSrc: '/images/Logos/TON CHURCH logo.png',
    videoSrc: null,
    gallery: [
      { src: '/images/Ton 1.mp4', type: 'video' },
      { src: '/images/Ton 2.mp4', type: 'video' },
      { src: '/images/Ton 3.mp4', type: 'video' },
      { src: '/images/Ton 4.MP4', type: 'video' },
      { src: '/images/Ton 5.png', type: 'image' },
      { src: '/images/Ton 6.mp4', type: 'video' },
      { src: '/images/Ton 7.mp4', type: 'video' },
      { src: '/images/TON Church 2.mp4', type: 'video' },
    ],
  },
  {
    id: 'utxord',
    title: 'UTXORD',
    description: 'Animated NFT collection in After Effects for social content; drove visibility and engagement across Twitter and Telegram.',
    tags: ['Motion Design', 'NFT', 'Social Content'],
    roles: ['Content Production', 'Social Media Marketing', 'NFT Animation', 'Motion Design'],
    metric: '381K+ impressions on single Twitter post',
    featured: false,
    logoSrc: '/images/Logos/UTXORD LOGO.jpg',
    videoSrc: null,
    gallery: [
      { src: '/images/UTXORD%20Twitter.png/UTXORD%203.png', type: 'image' },
      { src: '/images/UTXORD%20Twitter.png/UTXORD%201.gif', type: 'image' },
      { src: '/images/UTXORD%20Twitter.png/UTXORD%202.gif.mp4', type: 'video' },
      { src: '/images/UTXORD%20Twitter.png/utxord10.png', type: 'image' },
      { src: '/images/UTXORD%20Twitter.png/utxord11.gif', type: 'image' },
      { src: '/images/UTXORD%20Twitter.png/utxord13.gif', type: 'image' },
    ],
  },
]

export default function Work({ registerReveal }) {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    if (!registerReveal || !sectionRef.current) return
    const els = cardRefs.current.filter(Boolean)
    registerReveal(sectionRef.current, els)
  }, [registerReveal])

  return (
    <section ref={sectionRef} id="work" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <span className="section-label">Work</span>
        <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-text-primary">
          Case Studies
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              cardRef={(el) => (cardRefs.current[i] = el)}
              title={project.title}
              description={project.description}
              tags={project.tags}
              roles={project.roles}
              metric={project.metric}
              featured={project.featured}
              logoSrc={project.logoSrc}
              videoSrc={project.videoSrc}
              gallery={project.gallery}
              cardImageBg={project.cardImageBg}
              cardImageFit={project.cardImageFit}
              cardImagePadding={project.cardImagePadding}
            />
          ))}
        </div>
        <p className="mt-12 text-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="font-body hover:opacity-90 transition-opacity"
            style={{ color: '#4A9EFF' }}
          >
            Interested in working together? → Get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
