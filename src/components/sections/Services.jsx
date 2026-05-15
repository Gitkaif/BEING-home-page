import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    name: 'Content Creation',
    desc: 'Posts, reels, carousels, and copy that actually convert.',
    accent: '#F5C518',
  },
  {
    num: '02',
    name: 'Social Media Management',
    desc: 'Strategy, scheduling, community — fully handled.',
    accent: '#4CAF50',
  },
  {
    num: '03',
    name: 'Website Development',
    desc: 'Fast, beautiful, responsive websites built to grow.',
    accent: '#FF6B6B',
  },
  {
    num: '04',
    name: 'Branding',
    desc: 'Identity, voice, and visuals that make you unmistakable.',
    accent: '#9B59B6',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const cardsRef   = useRef([])
  const ctaRef     = useRef(null)

  useLayoutEffect(() => {
    const listeners = []

    const ctx = gsap.context(() => {

      gsap.from([labelRef.current, ctaRef.current], {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 52,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Pop animation — GSAP owns the transform so CSS transition-transform is removed
      cardsRef.current.forEach(card => {
        const enter = () => gsap.to(card, {
          y: -10,
          scale: 1.03,
          duration: 0.35,
          ease: 'back.out(1.7)',
          overwrite: true,
        })
        const leave = () => gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true,
        })
        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)
        listeners.push({ card, enter, leave })
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      listeners.forEach(({ card, enter, leave }) => {
        card.removeEventListener('mouseenter', enter)
        card.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-14 pb-24 px-6"
      style={{ backgroundColor: '#000' }}
    >
      {/* Section label */}
      <p
        ref={labelRef}
        className="font-body text-center tracking-[0.3em] mb-12 m-0"
        style={{ fontSize: 'clamp(14px, 1.3vw, 18px)', color: '#fff', opacity: 0.65 }}
      >
        OUR SERVICES
      </p>

      {/* 2×2 grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 items-stretch">
        {SERVICES.map((s, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el }}
            className="group relative flex flex-col overflow-hidden border border-[#222222] bg-[#111111] hover:bg-[#1a1a1a] transition-[background-color] duration-300"
          >
            {/* Hover tint — accent at 5% opacity */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: s.accent + '0d' }}
            />

            {/* Card body */}
            <div className="relative z-10 flex flex-col flex-1 p-8 pb-6">

              <span
                className="font-heading block select-none mb-5"
                style={{ fontSize: 'clamp(52px, 5vw, 68px)', lineHeight: 1, color: '#fff', opacity: 0.06 }}
              >
                {s.num}
              </span>

              <h3
                className="font-heading text-white m-0 mb-3"
                style={{ fontSize: 'clamp(20px, 1.9vw, 26px)', fontWeight: 400, lineHeight: 1.2 }}
              >
                {s.name}
              </h3>

              <p
                className="font-body m-0"
                style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', color: '#fff', opacity: 0.4, lineHeight: 1.7 }}
              >
                {s.desc}
              </p>

            </div>

            {/* Accent strip */}
            <div
              className="flex-shrink-0"
              style={{ height: '4px', backgroundColor: s.accent }}
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="text-center mt-20">
        <a
          href="https://being-service-page.vercel.app/"
          className="font-body tracking-[0.25em] transition-opacity duration-200 hover:opacity-100"
          style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', color: '#fff', opacity: 0.7 }}
        >
          SEE ALL SERVICES →
        </a>
      </div>
    </section>
  )
}
