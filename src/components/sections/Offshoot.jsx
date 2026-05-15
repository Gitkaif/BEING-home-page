import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── ADD OFFSHOOT IMAGES HERE ────────────────────────────────────────────────
// Drop image files into /public/offshoot/ and fill in the paths below.
// Leave a slot as null to keep the shimmer placeholder for that box.
const MOSAIC_IMAGES = [
  'images/offshoot/img1.jpeg', // e.g. '/offshoot/sample-1.jpg'
  'images/offshoot/img2.jpeg', // e.g. '/offshoot/sample-2.jpg'
  'images/offshoot/img3.jpeg', // e.g. '/offshoot/sample-3.jpg'
  'images/offshoot/img4.jpeg', // e.g. '/offshoot/sample-4.jpg'
]
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: '⚡', label: '48–72hr' },
  { icon: '💰', label: '1/10th the cost' },
  { icon: '✅', label: 'E-commerce ready' },
]

export default function Offshoot() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.05,
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
      className="relative py-24 px-6 overflow-hidden"
      style={{ backgroundColor: '#1a1a1a' }}
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
        <div ref={leftRef} className="w-full md:w-1/2">

          {/* Tag */}
          <p
            className="font-body tracking-[0.28em] m-0 mb-5"
            style={{ fontSize: 'clamp(11px, 1vw, 13px)', color: '#F5C518' }}
          >
            INTRODUCING OFFSHOOT BY BEING.
          </p>

          {/* Headline */}
          <h2
            className="font-heading text-white m-0 mb-6"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.15, fontWeight: 400 }}
          >
            Studio-quality product photography. Without the studio.
          </h2>

          {/* Body */}
          <p
            className="font-body m-0 mb-8"
            style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}
          >
            AI-powered visuals for jewellery, bakery, decor, and more.
            Delivered in 48–72 hours at a fraction of the cost.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10">
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
        <div ref={rightRef} className="w-full md:w-1/2">
          <div className="grid grid-cols-2 gap-4 items-start">
            {MOSAIC_IMAGES.map((src, i) =>
              src ? (
                <img
                  key={i}
                  src={src}
                  alt={`OffShoot sample ${i + 1}`}
                  className="rounded-lg w-full block"
                />
              ) : (
                <div
                  key={i}
                  className="offshoot-shimmer rounded-lg aspect-[4/3]"
                />
              )
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
