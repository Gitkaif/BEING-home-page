import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'Working with Being. completely transformed how we show up online. Our engagement tripled in 2 months.',
    name: 'Priya Mehta',
    business: 'AROMAS BAKERY',
    accent: '#F5C518',
  },
  {
    quote: 'The OffShoot photos looked better than our actual studio shoot. Delivered in under 48 hours.',
    name: 'Rohan Shah',
    business: 'LUMINO STUDIO',
    accent: '#4CAF50',
  },
  {
    quote: "They didn't just build our website — they built our brand presence from scratch.",
    name: 'Anika Joshi',
    business: 'VERSE COLLECTIVE',
    accent: '#FF6B6B',
  },
]

const CARD_W  = 380   // px — each card's width
const OFFSET  = 440   // px — horizontal distance between card centres

// Slot props: diff = 0 (centre), ±1 (flanking), ±2+ (hidden)
function slotProps(diff) {
  if (diff === 0)          return { x: 0,            y: -22, scale: 1,    opacity: 1,    zIndex: 10 }
  if (Math.abs(diff) === 1) return { x: diff * OFFSET, y: 0,   scale: 0.82, opacity: 0.48, zIndex: 5  }
  return                          { x: diff * OFFSET * 1.4, y: 0, scale: 0.7, opacity: 0, zIndex: 1 }
}

export default function Testimonials() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const ruleRef     = useRef(null)
  const carouselRef = useRef(null)
  const cardRefs    = useRef([])

  // Two-track active state: ref for GSAP (always current), state for React UI
  const activeRef   = useRef(0)
  const lockedRef   = useRef(false)
  const touchX      = useRef(0)
  const intervalRef = useRef(null)
  const stepRef     = useRef(null)   // always-current step fn — avoids stale closure in setInterval
  const isPausedRef = useRef(false)  // hover pause flag
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const n = TESTIMONIALS.length

  // Apply positions for all cards
  const applyAll = (a, animate) => {
    TESTIMONIALS.forEach((_, i) => {
      const el = cardRefs.current[i]
      if (!el) return
      let diff = i - a
      if (diff >  n / 2) diff -= n
      if (diff < -n / 2) diff += n
      const p = slotProps(diff)
      if (animate) {
        const isCenter = diff === 0
        gsap.to(el, {
          ...p,
          duration: isCenter ? 0.85 : 0.65,
          ease:     isCenter ? 'back.out(1.6)' : 'power3.out',
          overwrite: 'auto',
        })
      } else {
        gsap.set(el, { ...p, xPercent: -50, yPercent: -50 })
      }
    })
  }

  const go = (idx) => {
    if (lockedRef.current || idx === activeRef.current) return
    lockedRef.current = true
    activeRef.current = idx
    setActive(idx)
    applyAll(idx, true)
    setTimeout(() => { lockedRef.current = false }, 900)
  }

  const step = (dir) => go((activeRef.current + dir + n) % n)

  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) stepRef.current?.(1)
    }, 3200)
  }
  const stopTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  // Keep stepRef pointing at the latest step so setInterval never goes stale
  stepRef.current = (dir) => go((activeRef.current + dir + n) % n)

  // Drive timer via ScrollTrigger — synced with Lenis, starts only when section is on screen
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: startTimer,
      onEnterBack: startTimer,
      onLeave: stopTimer,
      onLeaveBack: stopTimer,
    })
    return () => { st.kill(); stopTimer() }
  }, [])

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      applyAll(0, false)

      gsap.from([labelRef.current, headlineRef.current], {
        opacity: 0, y: 24, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.from(ruleRef.current, {
        opacity: 0, scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })

      gsap.from(carouselRef.current, {
        opacity: 0, y: 52, duration: 1.05, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-20 pb-14 px-6 overflow-hidden"
      style={{ backgroundColor: '#F5F5F0' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <p
          ref={labelRef}
          className="font-body text-center tracking-[0.22em] m-0 mb-5"
          style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', color: '#0a0a0a', opacity: 0.45, textTransform: 'uppercase' }}
        >
          WHAT PEOPLE SAY
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading text-center m-0 mb-14"
          style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', color: '#0a0a0a', fontWeight: 400, marginBottom: '1rem' }}
        >
          Don&rsquo;t take our word for it.
        </h2>

        {/* ── Carousel ── */}
        <div
          ref={carouselRef}
          className="pt-14"
          onMouseEnter={() => { isPausedRef.current = true }}
          onMouseLeave={() => { isPausedRef.current = false }}
          onTouchStart={e => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const delta = touchX.current - e.changedTouches[0].clientX
            if (Math.abs(delta) > 48) { step(delta > 0 ? 1 : -1); startTimer() }
          }}
        >
          {/* Track */}
          <div className="relative" style={{ height: '460px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: `min(${CARD_W}px, calc(100vw - 40px))`,
                  backgroundColor: '#fff',
                  padding: '36px 28px 32px',
                  minHeight: '320px',
                  cursor: i !== active ? 'pointer' : 'default',
                  boxShadow: i === active
                    ? '0 28px 72px rgba(0,0,0,0.14), 0 6px 24px rgba(0,0,0,0.08)'
                    : '0 2px 14px rgba(0,0,0,0.06)',
                  borderBottom: `3px solid ${i === active ? t.accent : 'transparent'}`,
                  transition: 'box-shadow 0.65s ease, border-color 0.55s ease',
                  willChange: 'transform, opacity',
                }}
                onClick={() => { if (i !== active) go(i) }}
                onMouseEnter={() => {
                  if (i !== activeRef.current)
                    gsap.to(cardRefs.current[i], { scale: 0.87, opacity: 0.7, duration: 0.25, overwrite: 'auto' })
                }}
                onMouseLeave={() => {
                  if (i !== activeRef.current) {
                    let diff = i - activeRef.current
                    if (diff >  n / 2) diff -= n
                    if (diff < -n / 2) diff += n
                    const p = slotProps(diff)
                    gsap.to(cardRefs.current[i], { scale: p.scale, opacity: p.opacity, duration: 0.25, overwrite: 'auto' })
                  }
                }}
              >
                {/* Decorative quote mark */}
                <span
                  className="font-heading absolute select-none pointer-events-none"
                  style={{
                    top: '10px', left: '32px',
                    fontSize: '120px',
                    color: t.accent,
                    opacity: 0.13,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Quote */}
                <p
                  className="font-body relative m-0"
                  style={{
                    fontSize: 'clamp(18px, 1.6vw, 22px)',
                    color: '#1a1a1a',
                    lineHeight: 1.75,
                    fontStyle: 'italic',
                    paddingTop: '20px',
                    marginBottom: '32px',
                  }}
                >
                  {t.quote}
                </p>

                {/* Attribution */}
                <div>
                  <p
                    className="font-heading m-0"
                    style={{ fontSize: 'clamp(17px, 1.3vw, 20px)', color: '#0a0a0a', marginBottom: '6px' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-body tracking-[0.18em] m-0"
                    style={{ fontSize: '12px', color: t.accent, textTransform: 'uppercase' }}
                  >
                    {t.business}
                  </p>
                </div>
              </div>
            ))}

            {/* Left arrow — hugs left edge of the centre card */}
            <button
              onClick={() => step(-1)}
              aria-label="Previous testimonial"
              className="absolute flex items-center justify-center"
              style={{
                left: isMobile
                  ? 'calc(50% - min(380px, 100vw - 40px) / 2 + 22px)'
                  : `calc(50% - ${CARD_W / 2}px - 28px)`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 4px', opacity: 0.6, transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.6' }}
            >
              <svg width="10" height="34" viewBox="0 0 16 52" fill="none">
                <path d="M13 3 L2 26 L13 49" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Right arrow — hugs right edge of the centre card */}
            <button
              onClick={() => step(1)}
              aria-label="Next testimonial"
              className="absolute flex items-center justify-center"
              style={{
                left: isMobile
                  ? 'calc(50% + min(380px, 100vw - 40px) / 2 - 22px)'
                  : `calc(50% + ${CARD_W / 2}px + 28px)`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 4px', opacity: 0.6, transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.6' }}
            >
              <svg width="10" height="34" viewBox="0 0 16 52" fill="none">
                <path d="M3 3 L14 26 L3 49" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
