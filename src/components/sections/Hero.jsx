import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

// Two intentional lines — mirrors the work page's deliberate line-break approach
const HEADLINE_LINES = [
  ['We', 'make', 'brands'],
  ['impossible', 'to', 'ignore.'],
]
const TICKER_TEXT = 'CONTENT CREATION ·  SOCIAL MEDIA ·  BRANDING ·  WEBSITES ·  OFFSHOOT ·  '

export default function Hero() {
  const wordsRef = useRef([])
  const sublineRef = useRef(null)
  const ctasRef = useRef(null)
  const tickerRef = useRef(null)
  const singleRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wordsRef.current, {
        opacity: 0,
        y: 28,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.4,
      })

      gsap.from([sublineRef.current, ctasRef.current], {
        opacity: 0,
        y: 20,
        stagger: 0.18,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.85,
      })

      const singleWidth = singleRef.current.offsetWidth
      gsap.to(tickerRef.current, {
        x: -singleWidth,
        duration: 24,
        ease: 'none',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      {/* Content — dead center of the viewport */}
      <div className="flex flex-col items-center text-center px-6">

        {/* Headline */}
        <h1
          className="font-heading text-white m-0 mb-7"
          style={{ fontSize: 'clamp(52px, 7vw, 90px)', lineHeight: 1.1, maxWidth: '900px' }}
        >
          {HEADLINE_LINES.map((line, li) => {
            const offset = HEADLINE_LINES.slice(0, li).reduce((s, l) => s + l.length, 0)
            return (
              <div key={li}>
                {line.map((word, wi) => {
                  const idx = offset + wi
                  const isLast = li === HEADLINE_LINES.length - 1 && wi === line.length - 1
                  return (
                    <span
                      key={wi}
                      ref={el => { wordsRef.current[idx] = el }}
                      className="inline-block"
                      style={{ marginRight: isLast ? 0 : '0.28em' }}
                    >
                      {word}
                    </span>
                  )
                })}
              </div>
            )
          })}
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="font-body text-white/40 max-w-lg mx-auto mb-11 m-0"
          style={{ fontSize: 'clamp(15px, 1.45vw, 19px)', lineHeight: 1.75 }}
        >
          A digital marketing agency built on curiosity, strategy, and craft.
        </p>

        {/* CTAs */}
        <div
          ref={ctasRef}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <a
            href="#work"
            className="font-body inline-block px-9 py-3.5 border border-transparent bg-white text-black uppercase tracking-[0.12em] text-sm font-medium transition-opacity hover:opacity-85"
          >
            See Our Work
          </a>
          <a
            href="#contact"
            className="font-body inline-block px-9 py-3.5 border border-white bg-transparent text-white uppercase tracking-[0.12em] text-sm font-medium transition-colors hover:bg-white/10"
          >
            Let&rsquo;s Talk
          </a>
        </div>
      </div>

      {/* Ticker — pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 py-4 overflow-hidden">
        <div
          ref={tickerRef}
          className="flex whitespace-nowrap will-change-transform"
        >
          {[0, 1, 2, 3].map(n => (
            <span
              key={n}
              ref={n === 0 ? singleRef : null}
              className="font-display text-white/50 tracking-[0.15em]"
              style={{ fontSize: 'clamp(13px, 1.4vw, 17px)' }}
            >
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
