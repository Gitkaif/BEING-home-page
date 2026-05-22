import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = [
  ['Ready', 'to', 'start'],
  ['something?'],
]

export default function FinalCTA() {
  const sectionRef  = useRef(null)
  const wordsRef    = useRef([])
  const ctaRef      = useRef(null)
  const noteRef     = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Words drop in from below their overflow-hidden mask
      gsap.from(wordsRef.current.filter(Boolean), {
        y: '115%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      gsap.from([ctaRef.current, noteRef.current], {
        y: 28,
        opacity: 0,
        stagger: 0.14,
        duration: 0.85,
        ease: 'power2.out',
        delay: 0.35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  let wordIdx = 0

  return (
    <section
      ref={sectionRef}
      className="py-20 md:min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#000' }}
    >
      <div className="flex flex-col items-center text-center gap-6 md:gap-10">

        {/* Headline — word-by-word curtain drop */}
        <h2
          className="font-heading m-0"
          style={{
            fontSize: 'clamp(48px, 8vw, 112px)',
            color: '#fff',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          {HEADLINE.map((line, li) => (
            <div key={li} style={{ display: 'block' }}>
              {line.map((word, wi) => {
                const idx = wordIdx++
                return (
                  <span
                    key={wi}
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      verticalAlign: 'bottom',
                      marginRight: wi < line.length - 1 ? '0.28em' : 0,
                    }}
                  >
                    <span
                      ref={el => { wordsRef.current[idx] = el }}
                      style={{ display: 'inline-block' }}
                    >
                      {word}
                    </span>
                  </span>
                )
              })}
            </div>
          ))}
        </h2>

        {/* CTA button + note */}
        <div ref={ctaRef} className="flex flex-col items-center gap-4">
          <a
            href="/contact"
            className="font-display tracking-[0.22em]"
            style={{
              fontSize: 'clamp(16px, 1.6vw, 22px)',
              backgroundColor: '#F5C518',
              color: '#000',
              padding: '18px 52px',
              textDecoration: 'none',
              display: 'inline-block',
              borderRadius: 0,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            LET&rsquo;S TALK
          </a>

          <p
            ref={noteRef}
            className="font-body m-0"
            style={{
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: '#fff',
              opacity: 0.4,
            }}
          >
            We respond within 24 hours.
          </p>
        </div>

      </div>
    </section>
  )
}
