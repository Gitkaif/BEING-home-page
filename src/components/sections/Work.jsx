import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── ADD YOUR IMAGES HERE ────────────────────────────────────────────────────
// Drop image files into /public/work/ and set the filename below.
// Leave `image` as null to keep the dark placeholder.
const PROJECTS = [
  { name: 'Juni',         tag: 'BRANDING', accent: '#9B59B6', image: '/images/services/branding/juni.png' }, // e.g. '/work/aromas.jpg'
  { name: 'Verse Collective',      tag: 'SMM',      accent: '#4CAF50', image: '/images/services/web-dev/img3.png' }, // e.g. '/work/verse.jpg'
  { name: 'Lumino Studio',         tag: 'WEB',      accent: '#FF6B6B', image: '/images/services/content/shoots/content-collage.png' }, // e.g. '/work/lumino.jpg'
  { name: 'The Offshoot Campaign', tag: 'CONTENT',  accent: '#F5C518', image: 'images/services/web-dev/2.png' }, // e.g. '/work/offshoot.jpg'
]
// ─────────────────────────────────────────────────────────────────────────────

function CardInner({ project }) {
  return (
    <>
      {/* BG — image or placeholder, scales on hover */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 bg-[#1a1a1a] bg-cover bg-center"
        style={project.image ? { backgroundImage: `url(${project.image})` } : {}}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Project info — slides up from below card edge */}
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <p
          className="font-display tracking-[0.22em] m-0 mb-1"
          style={{ fontSize: '12px', color: project.accent }}
        >
          {project.tag}
        </p>
        <h3
          className="font-heading text-white m-0"
          style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 400, lineHeight: 1.2 }}
        >
          {project.name}
        </h3>
      </div>
    </>
  )
}

export default function Work() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const cardsRef   = useRef([])
  const ctaRef     = useRef(null)

  useLayoutEffect(() => {
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
        y: 44,
        stagger: 0.13,
        duration: 0.85,
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
      className="py-24 px-6"
      style={{ backgroundColor: '#000' }}
    >
      {/* Section label */}
      <p
        ref={labelRef}
        className="font-display text-center tracking-[0.3em] mb-12 m-0"
        style={{ fontSize: 'clamp(14px, 1.3vw, 18px)', color: '#fff', opacity: 0.65 }}
      >
        SELECTED WORK
      </p>

      <div className="max-w-5xl mx-auto">

        {/* Asymmetric top row: large left + two stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 mb-5">

          {/* Card 1 — large left */}
          <div
            ref={el => { cardsRef.current[0] = el }}
            className="group relative overflow-hidden cursor-pointer h-[360px] md:h-[500px]"
          >
            <CardInner project={PROJECTS[0]} />
          </div>

          {/* Right column — two smaller cards stacked */}
          <div className="flex flex-col gap-5">
            <div
              ref={el => { cardsRef.current[1] = el }}
              className="group relative overflow-hidden cursor-pointer h-[220px] md:h-[240px]"
            >
              <CardInner project={PROJECTS[1]} />
            </div>
            <div
              ref={el => { cardsRef.current[2] = el }}
              className="group relative overflow-hidden cursor-pointer h-[220px] md:h-[240px]"
            >
              <CardInner project={PROJECTS[2]} />
            </div>
          </div>
        </div>

        {/* Card 4 — full-width bottom */}
        <div
          ref={el => { cardsRef.current[3] = el }}
          className="group relative overflow-hidden cursor-pointer h-[200px] md:h-[240px]"
        >
          <CardInner project={PROJECTS[3]} />
        </div>

      </div>

      {/* CTA */}
      <div ref={ctaRef} className="text-center mt-16">
        <a
          href="https://being-work-page.vercel.app/"
          className="font-display tracking-[0.25em] transition-opacity duration-200 hover:opacity-100"
          style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', color: '#fff', opacity: 0.7 }}
        >
          VIEW ALL WORK →
        </a>
      </div>
    </section>
  )
}
