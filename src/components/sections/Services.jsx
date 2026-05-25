import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICE_PAGE = 'https://being-service-page.vercel.app/'

const SERVICES = [
  {
    name: 'Content Creation',
    desc: 'Offers videos, graphics, blogs, and content calendar planning for social media posts.',
    image: 'https://static.wixstatic.com/media/11062b_e5dc31a5a1564245a98312329c3ace5d~mv2.jpg/v1/fill/w_640,h_800,al_c,q_85,enc_avif,quality_auto/Green%20Abstract%20Object.jpg',
    overlayColor: 'rgba(125, 162, 122, 0.95)',
  },
  {
    name: 'Social Media Management',
    desc: 'Grow your brand with smart strategies, targeted ads, and performance insights.',
    image: 'https://static.wixstatic.com/media/11062b_bdde99af571e49eab366f7ac781d72eb~mv2.jpg/v1/fill/w_640,h_800,al_c,q_85,enc_avif,quality_auto/Squashed%20Balloon.jpg',
    overlayColor: 'rgba(172, 155, 205, 0.95)',
  },
  {
    name: 'Website Development',
    desc: 'Designing user-friendly websites that are SEO-optimized and secure.',
    image: 'https://static.wixstatic.com/media/11062b_391ee7a88df84b8ba33ad134b2c2efcb~mv2.jpg/v1/fill/w_640,h_800,al_c,q_85,enc_avif,quality_auto/Pink%20Blocks.jpg',
    overlayColor: 'rgba(205, 162, 142, 0.95)',
  },
  {
    name: 'Branding',
    desc: "Creating unique logos, setting brand guidelines, and crafting your brand's story.",
    image: 'https://static.wixstatic.com/media/11062b_267f829391e24dddb3978f01f503ffd0~mv2.jpg/v1/fill/w_640,h_800,al_c,q_85,enc_avif,quality_auto/Abstract%20Shapes.jpg',
    overlayColor: 'rgba(38, 120, 175, 0.97)',
  },
]

const HEADING_WORDS = ['Our', 'Services']

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.27.2 2.47.57 3.58.11.35.03.74-.24 1.02L6.6 10.8z" />
    </svg>
  )
}

function ServiceCard({ s, index, isOpen, onToggle }) {
  return (
    <a
      href={SERVICE_PAGE}
      style={{
        display: 'block',
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        aspectRatio: '3 / 4',
        textDecoration: 'none',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={e => {
        if (!isOpen) {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.015)'
          e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.4)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Cover image */}
      <img
        src={s.image}
        alt={s.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Bottom gradient always visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
          pointerEvents: 'none',
          transition: 'opacity 0.35s ease',
          opacity: isOpen ? 0 : 1,
        }}
      />

      {/* Bottom bar — name + toggle btn */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 2,
          transition: 'opacity 0.2s ease',
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
      >
        <a
          href={SERVICE_PAGE}
          onClick={e => e.stopPropagation()}
          style={{
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            color: '#fff',
            fontWeight: 600,
            fontStyle: 'normal',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            lineHeight: 1.25,
            textDecorationColor: 'rgba(255,255,255,0.6)',
            fontFamily: 'inherit',
            letterSpacing: '0.01em',
          }}
        >
          {s.name}
        </a>
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); onToggle() }}
          style={{
            width: '36px',
            height: '36px',
            border: '1.5px solid rgba(255,255,255,0.65)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '22px',
            lineHeight: 1,
            flexShrink: 0,
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          +
        </button>
      </div>

      {/* Description overlay — slides up from bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '72%',
          backgroundColor: s.overlayColor,
          borderRadius: '18px 18px 18px 18px',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 3,
          padding: '24px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Overlay header: name + close */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <a
            href={SERVICE_PAGE}
            onClick={e => e.stopPropagation()}
            style={{
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              color: '#fff',
              fontWeight: 600,
              fontStyle: 'normal',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255,255,255,0.6)',
              lineHeight: 1.25,
              fontFamily: 'inherit',
              letterSpacing: '0.01em',
            }}
          >
            {s.name}
          </a>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); onToggle() }}
            style={{
              width: '36px',
              height: '36px',
              border: '1.5px solid rgba(255,255,255,0.65)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '20px',
              lineHeight: 1,
              flexShrink: 0,
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
              transform: 'rotate(45deg)',
            }}
          >
            +
          </button>
        </div>

        {/* Description */}
        <p
          className="font-body"
          style={{
            fontSize: 'clamp(13px, 1.05vw, 15px)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.7,
            margin: 0,
            textAlign: 'center',
          }}
        >
          {s.desc}
        </p>
      </div>
    </a>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const wordsRef   = useRef([])
  const ruleRef    = useRef(null)
  const descRef    = useRef(null)
  const ctasRef    = useRef(null)
  const cardsRef   = useRef([])

  const [openCard, setOpenCard] = useState(null)

  const toggle = (i) => setOpenCard(prev => (prev === i ? null : i))

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(wordsRef.current.filter(Boolean), {
        y: '115%',
        opacity: 0,
        duration: 1.0,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

      gsap.fromTo(ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'expo.inOut',
          transformOrigin: 'left center',
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )

      gsap.fromTo(
        [descRef.current, ctasRef.current].filter(Boolean),
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )

      gsap.fromTo(cardsRef.current.filter(Boolean),
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      <div className="max-w-[1300px] mx-auto">

        {/* Heading */}
        <h2
          className="font-heading text-white m-0 mb-6"
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
              <span ref={el => { wordsRef.current[i] = el }} style={{ display: 'inline-block' }}>
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Rule */}
        <div
          ref={ruleRef}
          style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.18)', marginBottom: '36px' }}
        />

        {/* Description + CTAs row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div ref={descRef}>
            <p
              className="font-body m-0 mb-6"
              style={{
                fontSize: 'clamp(14px, 1.2vw, 17px)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                maxWidth: '440px',
              }}
            >
              Discover a range of services specially crafted to cater to your
              unique business needs and goals. Our services include:
            </p>
          </div>

          <div ref={ctasRef} className="w-full md:w-auto">
            <a
              href={SERVICE_PAGE}
              className="font-body flex md:inline-flex items-center justify-center gap-3 tracking-[0.18em] text-[12px] md:text-[15px] px-4 py-2 md:px-7 md:py-3"
              style={{
                color: '#fff',
                border: '1.5px solid #fff',
                textDecoration: 'none',
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
              <PhoneIcon />
              BOOK A FREE CONSULTATION
            </a>
          </div>
        </div>

        {/* 4-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <div key={i} ref={el => { cardsRef.current[i] = el }}>
              <ServiceCard
                s={s}
                index={i}
                isOpen={openCard === i}
                onToggle={() => toggle(i)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
