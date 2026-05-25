import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COL1 = [
  '/images/services/social-media/img1.png',
  '/images/services/social-media/img3.png',
  '/images/services/social-media/img5.png',
  '/images/services/social-media/img7.png',
  '/images/services/content/graphics/1.png',
  '/images/services/branding/img7.png',
]

const COL2 = [
  '/images/services/social-media/img2.png',
  '/images/services/social-media/img4.png',
  '/images/services/social-media/img6.png',
  '/images/services/content/graphics/3.png',
  '/images/services/content/graphics/img2.jpg',
  '/images/services/content/graphics/4.png',
]

const COL3 = [
  '/images/services/social-media/img8.jpg',
  '/images/services/social-media/img44.png',
  '/images/services/content/graphics/62.png',
  '/images/services/content/graphics/42.png',
  '/images/services/branding/branding-collage.png',
  '/images/services/content/graphics/img1.jpg',
]

function ScrollColumn({ images, duration, startProgress = 0 }) {
  const trackRef = useRef(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const tween = gsap.to(trackRef.current, {
      yPercent: -50,
      ease: 'none',
      repeat: -1,
      duration,
    })
    if (startProgress) tween.progress(startProgress)
    return () => tween.kill()
  }, [])

  const doubled = [...images, ...images]

  return (
    <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
      <div ref={trackRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              borderRadius: '10px',
              display: 'block',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const HEADING_WORDS = ['Our', 'Work']

export default function Work() {
  const sectionRef = useRef(null)
  const wordsRef   = useRef([])
  const descRef    = useRef(null)
  const ctaRef     = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Heading — word-by-word curtain drop (same as Offshoot)
      gsap.from(wordsRef.current.filter(Boolean), {
        y: '115%',
        opacity: 0,
        duration: 1.0,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

      // Desc + CTA fade up after heading starts (same as Offshoot)
      gsap.from([descRef.current, ctaRef.current].filter(Boolean), {
        y: 24,
        opacity: 0,
        stagger: 0.1,
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
      className="overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-20 md:py-24 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-center">

        {/* Left — heading, description, CTA */}
        <div className="flex flex-col gap-7">
          <h2
            className="font-heading text-white m-0"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15 }}
          >
            {HEADING_WORDS.map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom',
                  marginRight: i < HEADING_WORDS.length - 1 ? '0.28em' : 0,
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

          <p
            ref={descRef}
            className="font-body m-0"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
            }}
          >
            At BEING, we bring ideas to life through striking visuals, smart strategy,
            and engaging storytelling. From scroll-stopping content to full-scale brand
            campaigns, our work is all about making brands look good and connect better.
            Here's a glimpse of what we've created, crafted, and curated.
          </p>

          <a
            ref={ctaRef}
            href="https://being-work-page.vercel.app/"
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
            SEE ALL &rarr;
          </a>
        </div>

        {/* Right — auto-scrolling 3-column gallery */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            height: 'clamp(420px, 55vh, 580px)',
            overflow: 'hidden',
            borderRadius: '16px',
          }}
        >
          <ScrollColumn images={COL1} duration={20} startProgress={0} />
          <ScrollColumn images={COL2} duration={16} startProgress={0.35} />
          <ScrollColumn images={COL3} duration={8} startProgress={0.65} />
        </div>

      </div>
    </section>
  )
}
