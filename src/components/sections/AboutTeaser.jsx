import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_WORDS = ['Four', 'friends', 'who', "didn’t", 'have', 'it', 'all', 'figured', 'out.']

export default function AboutTeaser() {
  const sectionRef  = useRef(null)
  const leftRef     = useRef(null)
  const imgRef      = useRef(null)
  const wordsRef    = useRef([])
  const tagRef      = useRef(null)
  const bodyRef     = useRef(null)
  const ctaRef      = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Image fly-in
      gsap.from(imgRef.current, {
        x: -180,
        y: -100,
        rotation: -18,
        scale: 0.72,
        opacity: 0,
        duration: 1.1,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      })

      // Headline — word-by-word curtain drop
      gsap.from(wordsRef.current.filter(Boolean), {
        y: '115%',
        opacity: 0,
        duration: 1.0,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

      // Tag, body, CTA fade up after headline starts
      gsap.from([tagRef.current, bodyRef.current, ctaRef.current], {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-0">

        {/* ── Left: image ── */}
        <div ref={leftRef} className="w-full md:w-1/2 md:pr-14 flex justify-center md:justify-start">
          <img
            ref={imgRef}
            src="/images/services/content/shoots/collage-v.png"
            alt="About Being"
            className="relative w-full object-cover"
            style={{
              maxWidth: '450px',
              aspectRatio: '4 / 5',
              filter: 'grayscale(100%) contrast(1.15)',
              borderLeft: '3px solid #F5C518',
            }}
          />
        </div>

        {/* ── Right: text content ── */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:pl-4">

          {/* Tag */}
          <p
            ref={tagRef}
            className="font-body tracking-[0.28em] m-0"
            style={{ fontSize: '13px', color: '#F5C518' }}
          >
            WHO WE ARE
          </p>

          {/* Headline — word curtain drop */}
          <h2
            className="font-heading m-0"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 46px)',
              color: '#fff',
              fontWeight: 400,
              lineHeight: 1.25,
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom',
                  marginRight: i < HEADLINE_WORDS.length - 1 ? '0.28em' : 0,
                }}
              >
                <span
                  ref={el => { wordsRef.current[i] = el }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="font-body m-0"
            style={{
              fontSize: 'clamp(16px, 1.35vw, 19px)',
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.8,
            }}
          >
            Being. started with a question and a lot of curiosity.<br />
            It&rsquo;s still what drives everything we do.
          </p>

          {/* CTA */}
          <a
            ref={ctaRef}
            href="/about"
            className="font-body tracking-[0.18em] self-start"
            style={{
              fontSize: '15px',
              color: '#fff',
              border: '1.5px solid #fff',
              padding: '12px 28px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.22s, color 0.22s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.color = '#000'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#fff'
            }}
          >
            MEET THE TEAM &rarr;
          </a>

        </div>
      </div>
    </section>
  )
}
