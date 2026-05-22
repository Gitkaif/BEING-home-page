import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── ADD OFFSHOOT IMAGES HERE ────────────────────────────────────────────────
// Drop image files into /public/offshoot/ and fill in the paths below.
// Leave a slot as null to keep the shimmer placeholder for that box.
const MOSAIC_IMAGES = [
  'images/offshoot/img5.jpeg', // e.g. '/offshoot/sample-1.jpg'
  'images/offshoot/img6.jpeg', // e.g. '/offshoot/sample-2.jpg'
  'images/offshoot/img7.jpeg', // e.g. '/offshoot/sample-3.jpg'
  'images/offshoot/img4.jpeg', // e.g. '/offshoot/sample-4.jpg'
]
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: '⚡', label: '48–72hr' },
  { icon: '💰', label: '1/10th the cost' },
  { icon: '✅', label: 'E-commerce ready' },
]

// Each image's scattered starting position — corner + rotation
const IMG_ORIGINS = [
  { x: -180, y: -100, rotation: -18, scale: 0.72 }, // top-left  → flies from upper-left
  { x:  200, y:  -80, rotation:  15, scale: 0.70 }, // top-right → flies from upper-right
  { x: -160, y:   90, rotation:  12, scale: 0.78 }, // bot-left  → flies from lower-left
  { x:  170, y:  100, rotation: -14, scale: 0.74 }, // bot-right → flies from lower-right
]

const HEADLINE_WORDS = [
  'Studio-quality', 'product', 'photography.', 'Without', 'the', 'studio.'
]

export default function Offshoot() {
  const sectionRef = useRef(null)
  const imgRefs    = useRef([])
  const wordsRef   = useRef([])
  const tagRef     = useRef(null)
  const bodyRef    = useRef(null)
  const statsRef   = useRef(null)
  const ctaRef     = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Headline — word-by-word curtain drop
      gsap.from(wordsRef.current.filter(Boolean), {
        y: '115%',
        opacity: 0,
        duration: 1.0,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

      // Tag, body, stats, CTA fade up after headline starts
      gsap.from([tagRef.current, bodyRef.current, statsRef.current, ctaRef.current], {
        y: 24, opacity: 0,
        stagger: 0.1, duration: 0.8, ease: 'power2.out', delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

      // Images fly in from scattered positions and land in the grid
      gsap.from(imgRefs.current.filter(Boolean), {
        x:        i => IMG_ORIGINS[i].x,
        y:        i => IMG_ORIGINS[i].y,
        rotation: i => IMG_ORIGINS[i].rotation,
        scale:    i => IMG_ORIGINS[i].scale,
        opacity:  0,
        stagger:  0.18,
        duration: 1.1,
        ease:     'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      {/* Noise / grain texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.045,
        }}
      />

      {/* Shimmer keyframes — scoped to this section */}
      <style>{`
        @keyframes offshoot-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .offshoot-shimmer {
          background: linear-gradient(90deg, #2a2a2a 25%, #383838 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: offshoot-shimmer 2.4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-20">

        {/* ── Left — text ── */}
        <div className="w-full md:w-1/2">

          {/* Tag */}
          <p
            ref={tagRef}
            className="font-body tracking-[0.28em] m-0 mb-8"
            style={{ fontSize: 'clamp(11px, 1vw, 13px)', color: '#F5C518' }}
          >
            INTRODUCING OFFSHOOT BY BEING.
          </p>

          {/* Headline — word curtain drop */}
          <h2
            className="font-heading text-white m-0 mb-10"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.15, fontWeight: 400 }}
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
            className="font-body m-0 mb-10"
            style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}
          >
            AI-powered visuals for jewellery, bakery, decor, and more.
            Delivered in 48–72 hours at a fraction of the cost.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-14">
            {STATS.map((s, i) => (
              <span key={i} className="flex items-center gap-x-4">
                <span
                  className="font-display tracking-[0.1em] text-white"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}
                >
                  {s.icon}&nbsp;{s.label}
                </span>
                {i < STATS.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.2)', userSelect: 'none' }}>|</span>
                )}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            ref={ctaRef}
            href="https://offshoot.beingcompany.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display inline-block tracking-[0.18em] transition-opacity duration-200 hover:opacity-85"
            style={{
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              backgroundColor: '#F5C518',
              color: '#000',
              padding: '14px 36px',
            }}
          >
            EXPLORE OFFSHOOT →
          </a>
        </div>

        {/* ── Right — 2×2 mosaic ── */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div
            className="grid grid-cols-2 gap-4 items-start w-full"
            style={{ perspective: '900px', maxWidth: '440px' }}
          >
            {MOSAIC_IMAGES.map((src, i) =>
              src ? (
                <div
                  key={i}
                  ref={el => { imgRefs.current[i] = el }}
                  className="rounded-lg overflow-hidden aspect-[4/5]"
                  style={{
                    boxShadow: '0 12px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)',
                    willChange: 'transform',
                  }}
                >
                  <img
                    src={src}
                    alt={`OffShoot sample ${i + 1}`}
                    className="w-full h-full object-cover block"
                  />
                </div>
              ) : (
                <div
                  key={i}
                  ref={el => { imgRefs.current[i] = el }}
                  className="offshoot-shimmer rounded-lg aspect-[4/5]"
                  style={{
                    boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
                    willChange: 'transform',
                  }}
                />
              )
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
