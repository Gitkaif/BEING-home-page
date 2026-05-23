import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── ADD YOUR IMAGES HERE ────────────────────────────────────────────────────
// Drop image files into /public/work/ and set the filename below.
// Leave `image` as null to keep the dark placeholder.
const PROJECTS = [
  { name: 'Content Creaiton',         tag: 'Content ', accent: '#9B59B6', image: '/images/services/content/shoots/collage-h.png' }, // e.g. '/work/aromas.jpg'
  { name: 'Website Creation',      tag: 'WEB',      accent: '#4CAF50', image: '/images/services/web-dev/img3.png' }, // e.g. '/work/verse.jpg'
  { name: 'Website Creation',         tag: 'WEB',      accent: '#FF6B6B', image: '/images/services/web-dev/img11.png' }, // e.g. '/work/lumino.jpg'
  { name: 'BRANDING', tag: 'BRANDING',  accent: '#F5C518', image: 'images/imgg.png' }, // e.g. '/work/offshoot.jpg'
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
  const sectionRef    = useRef(null)
  const labelRef      = useRef(null)
  const labelInnerRef = useRef(null)
  const ruleRef       = useRef(null)
  const dotRef        = useRef(null)
  const cardsRef      = useRef([])
  const ctaRef        = useRef(null)
  const ctaLinkRef    = useRef(null)
  const ctaWordsRef   = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Section panel rises with clip-path scrub ────────────────
      gsap.fromTo(sectionRef.current,
        { clipPath: 'inset(8% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1.8,
          },
        }
      )

      // ── Transition rule draws left → right ───────────────────────
      gsap.fromTo(ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'expo.inOut',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' },
        }
      )

      // Diamond dot pops after the rule finishes drawing
      gsap.from(dotRef.current, {
        scale: 0, opacity: 0,
        duration: 0.45, ease: 'back.out(2.5)', delay: 0.9,
        transformOrigin: '50% 50%',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' },
      })

      // Label zooms out — starts oversized, shrinks into place (scrubbed)
      gsap.fromTo(labelInnerRef.current,
        { scale: 2.2, opacity: 0 },
        {
          scale: 1, opacity: 0.65,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'top 42%',
            scrub: 1.2,
          },
        }
      )

      // CTA words stagger in
      gsap.from(ctaWordsRef.current.filter(Boolean), {
        opacity: 0, y: 18,
        stagger: 0.08, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })

      // Cards: staggered rise — alternating from left / right
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 72,
          x: i % 2 === 0 ? -20 : 20,
          duration: 0.95,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        })
      })

    }, sectionRef)

    // CTA hover — slot-machine word animation
    const ctaLink  = ctaLinkRef.current
    const ctaWords = ctaWordsRef.current.filter(Boolean)
    if (ctaLink && ctaWords.length) {
      const ctaEnter = () => {
        gsap.timeline()
          .to(ctaWords, { y: -14, opacity: 0, stagger: 0.07, duration: 0.17, ease: 'power2.in' })
          .set(ctaWords, { y: 14 })
          .to(ctaWords, { y: 0, opacity: 1, stagger: 0.07, duration: 0.22, ease: 'power2.out' })
      }
      ctaLink.addEventListener('mouseenter', ctaEnter)
      return () => {
        ctx.revert()
        ctaLink.removeEventListener('mouseenter', ctaEnter)
      }
    }

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
      style={{ backgroundColor: '#000' }}
    >
      {/* ── Transition: glowing rule + dot ── */}
      <div className="relative flex items-center mb-12">
        {/* Line */}
        <div
          ref={ruleRef}
          className="w-full"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.45) 30%, rgba(255,255,255,0.18) 70%, transparent)',
            boxShadow: '0 0 10px rgba(255,255,255,0.2)',
          }}
        />
        {/* Diamond dot at the end */}
        <div
          ref={dotRef}
          className="absolute right-0"
          style={{
            width: '7px', height: '7px',
            backgroundColor: '#fff',
            transform: 'rotate(45deg)',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Section label — clips up from behind mask */}
      <div ref={labelRef} style={{ marginBottom: '3rem' }}>
        <p
          ref={labelInnerRef}
          className="font-display text-center tracking-[0.3em] m-0"
          style={{ fontSize: 'clamp(22px, 2vw, 30px)', color: '#fff', opacity: 0.65 }}
        >
          SELECTED WORK
        </p>
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Asymmetric top row: large left + two stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 mb-5">

          {/* Card 1 — large left */}
          <div
            ref={el => { cardsRef.current[0] = el }}
            className="group relative overflow-hidden cursor-pointer h-[300px] md:h-[420px]"
          >
            <CardInner project={PROJECTS[0]} />
          </div>

          {/* Right column — two smaller cards stacked */}
          <div className="flex flex-col gap-5">
            <div
              ref={el => { cardsRef.current[1] = el }}
              className="group relative overflow-hidden cursor-pointer h-[185px] md:h-[200px]"
            >
              <CardInner project={PROJECTS[1]} />
            </div>
            <div
              ref={el => { cardsRef.current[2] = el }}
              className="group relative overflow-hidden cursor-pointer h-[185px] md:h-[200px]"
            >
              <CardInner project={PROJECTS[2]} />
            </div>
          </div>
        </div>

        {/* Card 4 — full-width bottom */}
        <div
          ref={el => { cardsRef.current[3] = el }}
          className="group relative overflow-hidden cursor-pointer h-[220px] md:h-[340px]"
        >
          <CardInner project={PROJECTS[3]} />
        </div>

      </div>

      {/* CTA */}
      <div ref={ctaRef} className="text-center mt-16">
        <a
          ref={ctaLinkRef}
          href="https://being-work-page.vercel.app/"
          className="font-body tracking-[0.25em]"
          style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', color: '#fff', opacity: 0.6, textTransform: 'uppercase', cursor: 'pointer' }}
        >
          {['VIEW', 'ALL', 'WORK', '→'].map((w, i, arr) => (
            <span
              key={i}
              ref={el => { ctaWordsRef.current[i] = el }}
              style={{ display: 'inline-block', marginRight: i < arr.length - 1 ? '0.28em' : 0 }}
            >
              {w}
            </span>
          ))}
        </a>
      </div>
    </section>
  )
}
