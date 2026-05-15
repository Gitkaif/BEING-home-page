import { useRef, useLayoutEffect, useState, useEffect } from 'react'
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

function TestimonialBlock({ testimonial }) {
  return (
    <div className="relative px-10 py-2">
      {/* Decorative opening quote mark — behind text */}
      <span
        className="font-heading absolute top-0 left-6 select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(80px, 9vw, 120px)',
          color: testimonial.accent,
          opacity: 0.25,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote */}
      <p
        className="font-body relative"
        style={{
          fontSize: 'clamp(17px, 1.6vw, 22px)',
          color: '#1a1a1a',
          lineHeight: 1.75,
          fontStyle: 'italic',
          margin: '0 0 32px 0',
          paddingTop: '28px',
        }}
      >
        {testimonial.quote}
      </p>

      {/* Attribution */}
      <div>
        <p
          className="font-heading m-0"
          style={{ fontSize: 'clamp(17px, 1.4vw, 20px)', color: '#0a0a0a', marginBottom: '6px' }}
        >
          {testimonial.name}
        </p>
        <p
          className="font-display tracking-[0.22em] m-0"
          style={{ fontSize: '12px', color: testimonial.accent }}
        >
          {testimonial.business}
        </p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const ruleRef     = useRef(null)
  const cardsRef    = useRef([])

  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from([labelRef.current, headlineRef.current], {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from([ruleRef.current, ...cardsRef.current], {
        opacity: 0,
        y: 36,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6"
      style={{ backgroundColor: '#F5F5F0' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <p
          ref={labelRef}
          className="font-display text-center tracking-[0.3em] m-0 mb-5"
          style={{ fontSize: 'clamp(13px, 1.1vw, 16px)', color: '#0a0a0a', opacity: 0.45 }}
        >
          WHAT PEOPLE SAY
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading text-center m-0 mb-14"
          style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', color: '#0a0a0a', fontWeight: 400 }}
        >
          Don&rsquo;t take our word for it.
        </h2>

        {/* Horizontal rule */}
        <div
          ref={ruleRef}
          className="w-full mb-0"
          style={{ height: '1px', backgroundColor: '#ddd' }}
        />

        {/* ── Desktop: 3 columns with vertical dividers ── */}
        <div className="hidden md:flex pt-14">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el }}
              className="flex-1 relative"
              style={i < TESTIMONIALS.length - 1 ? { borderRight: '1px solid #ddd' } : {}}
            >
              <TestimonialBlock testimonial={t} />
            </div>
          ))}
        </div>

        {/* ── Mobile: auto-rotating carousel ── */}
        <div className="md:hidden pt-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <TestimonialBlock testimonial={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? '20px' : '8px',
                  height: '8px',
                  backgroundColor: i === active ? '#0a0a0a' : 'rgba(0,0,0,0.22)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
