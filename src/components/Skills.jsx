import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Skills({ registerReveal }) {
  const sectionRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (!registerReveal || !sectionRef.current) return
    registerReveal(sectionRef.current, [listRef.current])
  }, [registerReveal])

  const groups = [
    {
      name: 'General',
      items: ['Email Marketing', 'Content Strategy', 'Brand Identity', 'Social Media Marketing Strategy'],
    },
    {
      name: 'Technical',
      items: ['Salesforce', 'SQL', 'Marketing Ops', 'AI-Augmented Workflows', 'After Effects', 'Motion Design'],
    },
    {
      name: 'Languages',
      items: ['English (Fluent)', 'Russian (Native)', 'Spanish (B2)'],
    },
  ]

  return (
    <section ref={sectionRef} id="skills" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <span className="section-label">Skills & Stack</span>
        <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-text-primary">
          What I work with
        </h2>
        <div ref={listRef} className="mt-12 space-y-10">
          {groups.map((group) => (
            <div key={group.name}>
              <h3 className="text-text-muted text-xs uppercase tracking-widest mb-4">{group.name}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full border border-border bg-surface text-text-primary text-sm font-body hover:border-accent/50 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
