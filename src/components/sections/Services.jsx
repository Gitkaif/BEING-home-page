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
    tags: 'VISUAL · COPY · REELS',
  },
  {
    num: '02',
    name: 'Social Media Management',
    desc: 'Strategy, scheduling, community — fully handled.',
    accent: '#4CAF50',
    tags: 'STRATEGY · GROWTH · ENGAGE',
  },
  {
    num: '03',
    name: 'Website Development',
    desc: 'Fast, beautiful, responsive websites built to grow.',
    accent: '#FF6B6B',
    tags: 'DESIGN · CODE · LAUNCH',
  },
  {
    num: '04',
    name: 'Branding',
    desc: 'Identity, voice, and visuals that make you unmistakable.',
    accent: '#9B59B6',
    tags: 'IDENTITY · VOICE · MARKS',
  },
]

// ── Illustration: Content Creation ──────────────────────────────────
function IllustContent({ accent }) {
  return (
    <svg viewBox="0 0 220 160" fill="none" className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Stacked content cards */}
      <rect className="c-back" x="18" y="40" width="120" height="88" rx="4"
        stroke={accent} strokeWidth="1" opacity="0.2" />
      <rect className="c-mid" x="36" y="24" width="120" height="88" rx="4"
        stroke={accent} strokeWidth="1.2" opacity="0.45" />
      <rect className="c-front" x="54" y="8" width="120" height="88" rx="4"
        fill="#111" stroke={accent} strokeWidth="1.5" />
      {/* Play triangle */}
      <polygon className="c-play" points="95,28 95,76 136,52" fill={accent} />
      {/* Caption lines on front card */}
      <line x1="66" y1="84" x2="164" y2="84" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="66" y1="92" x2="148" y2="92" stroke={accent} strokeWidth="1" opacity="0.18" />
      {/* Floating dashed ring accent — top right */}
      <circle className="c-ring" cx="180" cy="30" r="17"
        stroke={accent} strokeWidth="1" strokeDasharray="5 3" opacity="0.28" />
      <line x1="176" y1="30" x2="184" y2="30" stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <line x1="180" y1="26" x2="180" y2="34" stroke={accent} strokeWidth="1.5" opacity="0.55" />
    </svg>
  )
}

// ── Illustration: Social Media ───────────────────────────────────────
function IllustSocial({ accent }) {
  return (
    <svg viewBox="0 0 220 160" fill="none" className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Rising bars */}
      <rect className="s-b1" x="22"  y="112" width="24" height="34"  rx="1" fill={accent} opacity="0.18" />
      <rect className="s-b2" x="56"  y="90"  width="24" height="56"  rx="1" fill={accent} opacity="0.28" />
      <rect className="s-b3" x="90"  y="66"  width="24" height="80"  rx="1" fill={accent} opacity="0.42" />
      <rect className="s-b4" x="124" y="42"  width="24" height="104" rx="1" fill={accent} opacity="0.58" />
      <rect className="s-b5" x="158" y="18"  width="24" height="128" rx="1" fill={accent} opacity="0.78" />
      {/* Trend line */}
      <polyline className="s-line"
        points="34,114 68,92 102,68 136,44 170,20"
        stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Data point dots */}
      <circle className="s-d1" cx="34"  cy="114" r="4.5" fill="#000" stroke={accent} strokeWidth="2" />
      <circle className="s-d2" cx="68"  cy="92"  r="4.5" fill="#000" stroke={accent} strokeWidth="2" />
      <circle className="s-d3" cx="102" cy="68"  r="4.5" fill={accent} />
      <circle className="s-d4" cx="136" cy="44"  r="4.5" fill={accent} />
      <circle className="s-d5" cx="170" cy="20"  r="4.5" fill={accent} />
    </svg>
  )
}

// ── Illustration: Website Development ───────────────────────────────
function IllustWeb({ accent }) {
  return (
    <svg viewBox="0 0 220 160" fill="none" className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Browser chrome */}
      <rect x="12" y="6" width="196" height="146" rx="5"
        stroke={accent} strokeWidth="1.5" opacity="0.65" />
      <line x1="12" y1="30" x2="208" y2="30" stroke={accent} strokeWidth="1" opacity="0.3" />
      <circle cx="24" cy="18" r="3.5" fill={accent} opacity="0.6" />
      <circle cx="35" cy="18" r="3.5" fill={accent} opacity="0.35" />
      <circle cx="46" cy="18" r="3.5" stroke={accent} strokeWidth="0.8" opacity="0.25" />
      <rect x="58" y="13" width="104" height="10" rx="3"
        stroke={accent} strokeWidth="0.8" opacity="0.22" />
      {/* Layout blocks */}
      <rect className="w-hero" x="20" y="38" width="180" height="44" rx="2"
        fill={accent} opacity="0.05" stroke={accent} strokeWidth="0.8" strokeOpacity="0.28" />
      <rect className="w-a" x="20"  y="90" width="84"  height="50" rx="2"
        fill={accent} opacity="0.04" stroke={accent} strokeWidth="0.8" strokeOpacity="0.22" />
      <rect className="w-b" x="112" y="90" width="88" height="23" rx="2"
        fill={accent} opacity="0.04" stroke={accent} strokeWidth="0.8" strokeOpacity="0.22" />
      <rect className="w-c" x="112" y="117" width="88" height="23" rx="2"
        fill={accent} opacity="0.04" stroke={accent} strokeWidth="0.8" strokeOpacity="0.22" />
      {/* Cursor arrow */}
      <path className="w-cursor"
        d="M60,48 L60,74 L66,69.5 L68.5,77.5 L71,76.5 L68.5,68.5 L75,68.5 Z"
        fill={accent} opacity="0.82" />
    </svg>
  )
}

// ── Illustration: Branding ───────────────────────────────────────────
function IllustBrand({ accent }) {
  return (
    <svg viewBox="0 0 220 172" fill="none" className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Outer dashed ring (rotates on hover) */}
      <circle className="b-outer" cx="110" cy="68" r="64"
        stroke={accent} strokeWidth="0.8" strokeDasharray="8 5" opacity="0.18" />
      {/* Inner solid ring */}
      <circle className="b-mid" cx="110" cy="68" r="47"
        stroke={accent} strokeWidth="1" opacity="0.28" />
      {/* B letterform — vertical stem */}
      <line x1="82" y1="26" x2="82" y2="106"
        stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
      {/* Top bowl (path draw on scroll) */}
      <path className="b-top"
        d="M82 26 L108 26 Q138 26 138 46 Q138 66 108 66 L82 66"
        stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Bottom bowl */}
      <path className="b-bot"
        d="M82 66 L112 66 Q142 66 142 84 Q142 102 112 102 L82 102"
        stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Palette swatches */}
      <circle className="sw-1" cx="80"  cy="142" r="8" fill={accent} opacity="0.9" />
      <circle className="sw-2" cx="100" cy="142" r="8" fill={accent} opacity="0.55" />
      <circle className="sw-3" cx="120" cy="142" r="8" fill={accent} opacity="0.25" />
      <circle className="sw-4" cx="140" cy="142" r="8"
        stroke={accent} strokeWidth="1.2" opacity="0.3" />
    </svg>
  )
}

// ── Main Component ───────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const cardsRef   = useRef([])
  const innerRefs  = useRef([])
  const glowRefs   = useRef([])
  const ctaRef       = useRef(null)
  const ctaLinkRef   = useRef(null)
  const ctaWordsRef  = useRef([])
  const labelWordsRef = useRef([])

  useLayoutEffect(() => {
    const listeners = []

    const ctx = gsap.context(() => {

      // ── Section entrance ─────────────────────────────────────────
      // "Our Services" — slot-machine drop-in, fires once on scroll
      gsap.from(labelWordsRef.current.filter(Boolean), {
        y: 22, opacity: 0,
        stagger: 0.14,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // CTA words stagger in
      gsap.from(ctaWordsRef.current.filter(Boolean), {
        opacity: 0, y: 18,
        stagger: 0.08, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })

      gsap.from(cardsRef.current, {
        opacity: 0, y: 64,
        immediateRender: false,
        stagger: 0.13, duration: 0.95, ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

      // ── Card 0: content cards fan in ─────────────────────────────
      const c0 = cardsRef.current[0]
      if (c0) {
        const q = gsap.utils.selector(c0)
        gsap.fromTo([q('.c-back'), q('.c-mid')],
          { opacity: 0, x: 16 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out', clearProps: 'opacity,x',
            scrollTrigger: { trigger: c0, start: 'top 82%', once: true } }
        )
        gsap.fromTo(q('.c-ring'),
          { rotation: -120, opacity: 0 },
          { rotation: 0, opacity: 1, duration: 1.1, ease: 'power2.out', transformOrigin: '50% 50%', clearProps: 'opacity',
            scrollTrigger: { trigger: c0, start: 'top 80%', once: true } }
        )
      }

      // ── Card 1: bars grow + line draws ───────────────────────────
      const c1 = cardsRef.current[1]
      if (c1) {
        const q = gsap.utils.selector(c1)
        gsap.fromTo([q('.s-b1'), q('.s-b2'), q('.s-b3'), q('.s-b4'), q('.s-b5')],
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: '50% 100%', stagger: 0.08, duration: 0.65, ease: 'power2.out', clearProps: 'scaleY',
            scrollTrigger: { trigger: c1, start: 'top 82%', once: true } }
        )
        const lineEl = q('.s-line')[0]
        if (lineEl && lineEl.getTotalLength) {
          const len = lineEl.getTotalLength()
          gsap.set(lineEl, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(lineEl, {
            strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', delay: 0.25,
            scrollTrigger: { trigger: c1, start: 'top 80%', once: true },
          })
        }
        gsap.fromTo([q('.s-d1'), q('.s-d2'), q('.s-d3'), q('.s-d4'), q('.s-d5')],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.08, duration: 0.35, ease: 'back.out(2.5)', delay: 0.55,
            transformOrigin: '50% 50%', clearProps: 'opacity',
            scrollTrigger: { trigger: c1, start: 'top 78%', once: true } }
        )
      }

      // ── Card 2: layout blocks reveal ─────────────────────────────
      const c2 = cardsRef.current[2]
      if (c2) {
        const q = gsap.utils.selector(c2)
        gsap.fromTo([q('.w-hero'), q('.w-a'), q('.w-b'), q('.w-c')],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: 'power2.out', clearProps: 'y',
            scrollTrigger: { trigger: c2, start: 'top 80%', once: true } }
        )
        gsap.fromTo(q('.w-cursor'),
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'opacity',
            scrollTrigger: { trigger: c2, start: 'top 80%', once: true } }
        )
      }

      // ── Card 3: B strokes draw + swatches pop ────────────────────
      const c3 = cardsRef.current[3]
      if (c3) {
        const q = gsap.utils.selector(c3)
        ;[q('.b-top')[0], q('.b-bot')[0]].forEach((path, pi) => {
          if (!path || !path.getTotalLength) return
          const len = path.getTotalLength()
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(path, {
            strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', delay: pi * 0.25,
            scrollTrigger: { trigger: c3, start: 'top 80%', once: true },
          })
        })
        gsap.fromTo([q('.sw-1'), q('.sw-2'), q('.sw-3'), q('.sw-4')],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.08, duration: 0.38, ease: 'back.out(2.5)', delay: 0.65,
            transformOrigin: '50% 50%', clearProps: 'opacity',
            scrollTrigger: { trigger: c3, start: 'top 78%', once: true } }
        )
      }

    }, sectionRef)

    // ── Per-card hover (magnetic + illustration) ──────────────────
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const q    = gsap.utils.selector(card)
      const inner = innerRefs.current[i]
      const glow  = glowRefs.current[i]
      const { accent } = SERVICES[i]

      const enter = () => {
        gsap.to(card, { y: -10, scale: 1.018, duration: 0.38, ease: 'back.out(1.7)', overwrite: true })
        card.style.borderColor = accent + '60'
        card.style.boxShadow  = `0 28px 56px ${accent}18, inset 0 0 0 1px ${accent}30`
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.4 })

        if (i === 0) {
          gsap.to(q('.c-back'), { x: -16, y: 10, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
          gsap.to(q('.c-mid'),  { x: -8,  y: 5,  duration: 0.4,  ease: 'power2.out', overwrite: 'auto' })
          gsap.to(q('.c-play'), { scale: 1.18, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(2)', overwrite: 'auto' })
          gsap.to(q('.c-ring'), { rotation: 60, transformOrigin: '50% 50%', duration: 1.8, ease: 'power1.inOut', overwrite: 'auto' })
        }
        if (i === 1) {
          gsap.to([q('.s-b1'), q('.s-b2'), q('.s-b3'), q('.s-b4'), q('.s-b5')], {
            scaleY: 1.07, transformOrigin: '50% 100%',
            stagger: 0.05, duration: 0.3, ease: 'power2.out', overwrite: 'auto',
          })
          gsap.to([q('.s-d1'), q('.s-d2'), q('.s-d3'), q('.s-d4'), q('.s-d5')], {
            scale: 1.55, transformOrigin: '50% 50%',
            stagger: 0.05, duration: 0.3, ease: 'back.out(2.2)', overwrite: 'auto',
          })
        }
        if (i === 2) {
          gsap.to(q('.w-cursor'), { x: 38, y: 14, duration: 0.85, ease: 'power1.inOut', overwrite: 'auto' })
          gsap.to(q('.w-hero'), { opacity: 0.14, duration: 0.25, overwrite: 'auto' })
          gsap.to(q('.w-a'),    { opacity: 0.12, duration: 0.25, delay: 0.1,  overwrite: 'auto' })
          gsap.to(q('.w-b'),    { opacity: 0.12, duration: 0.25, delay: 0.2,  overwrite: 'auto' })
          gsap.to(q('.w-c'),    { opacity: 0.12, duration: 0.25, delay: 0.3,  overwrite: 'auto' })
        }
        if (i === 3) {
          gsap.to(q('.b-outer'), { rotation: 80, transformOrigin: '50% 50%', duration: 2.2, ease: 'power1.inOut', overwrite: 'auto' })
          gsap.to(q('.b-mid'),   { scale: 1.07,  transformOrigin: '50% 50%', duration: 0.4,  ease: 'power2.out',  overwrite: 'auto' })
          gsap.to([q('.sw-1'), q('.sw-2'), q('.sw-3'), q('.sw-4')], {
            y: -6, stagger: 0.06, duration: 0.35, ease: 'back.out(2)', overwrite: 'auto',
          })
        }
      }

      const leave = () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.55, ease: 'power3.out', overwrite: true })
        card.style.borderColor = 'rgba(255,255,255,0.07)'
        card.style.boxShadow  = 'none'
        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.55, ease: 'power3.out' })
        if (glow)  gsap.to(glow,  { opacity: 0, duration: 0.4 })

        if (i === 0) {
          gsap.to([q('.c-back'), q('.c-mid')], { x: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
          gsap.to(q('.c-play'), { scale: 1, duration: 0.4, overwrite: 'auto' })
          gsap.to(q('.c-ring'), { rotation: 0, transformOrigin: '50% 50%', duration: 0.9, ease: 'power2.out', overwrite: 'auto' })
        }
        if (i === 1) {
          gsap.to([q('.s-b1'), q('.s-b2'), q('.s-b3'), q('.s-b4'), q('.s-b5')], {
            scaleY: 1, transformOrigin: '50% 100%', duration: 0.4, ease: 'power2.out', overwrite: 'auto',
          })
          gsap.to([q('.s-d1'), q('.s-d2'), q('.s-d3'), q('.s-d4'), q('.s-d5')], {
            scale: 1, transformOrigin: '50% 50%', duration: 0.35, overwrite: 'auto',
          })
        }
        if (i === 2) {
          gsap.to(q('.w-cursor'), { x: 0, y: 0, duration: 0.65, ease: 'power2.out', overwrite: 'auto' })
          gsap.to([q('.w-hero'), q('.w-a'), q('.w-b'), q('.w-c')], { opacity: 0.05, duration: 0.4, overwrite: 'auto' })
        }
        if (i === 3) {
          gsap.to(q('.b-outer'), { rotation: 0, transformOrigin: '50% 50%', duration: 1.0, ease: 'power2.out', overwrite: 'auto' })
          gsap.to(q('.b-mid'),   { scale: 1,    transformOrigin: '50% 50%', duration: 0.4,  ease: 'power2.out', overwrite: 'auto' })
          gsap.to([q('.sw-1'), q('.sw-2'), q('.sw-3'), q('.sw-4')], { y: 0, duration: 0.4, overwrite: 'auto' })
        }
      }

      // Magnetic parallax — inner content tracks the cursor gently
      const move = (e) => {
        if (!inner) return
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10
        gsap.to(inner, { x, y, duration: 0.45, ease: 'power2.out' })
      }

      card.addEventListener('mouseenter', enter)
      card.addEventListener('mouseleave', leave)
      card.addEventListener('mousemove',  move)
      listeners.push(
        { el: card, type: 'mouseenter', fn: enter },
        { el: card, type: 'mouseleave', fn: leave },
        { el: card, type: 'mousemove',  fn: move  },
      )
    })

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
      listeners.push({ el: ctaLink, type: 'mouseenter', fn: ctaEnter })
    }

    return () => {
      ctx.revert()
      listeners.forEach(({ el, type, fn }) => el.removeEventListener(type, fn))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-14 pb-28 px-6"
      style={{
        backgroundColor: '#000',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Label */}
      <p
        ref={labelRef}
        className="font-body text-center tracking-[0.28em] mb-14 m-0"
        style={{ fontSize: 'clamp(14px, 1.3vw, 18px)', color: '#fff', opacity: 0.65, textTransform: 'uppercase' }}
      >
        {['Our', 'Services'].map((w, i, arr) => (
          <span
            key={i}
            ref={el => { labelWordsRef.current[i] = el }}
            style={{ display: 'inline-block', marginRight: i < arr.length - 1 ? '0.28em' : 0 }}
          >
            {w}
          </span>
        ))}
      </p>

      {/* 2 × 2 grid */}
      <div className="services-grid max-w-5xl mx-auto grid grid-cols-2 gap-4">
        {SERVICES.map((s, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el }}
            className="service-card relative overflow-hidden"
            style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.07)',
              transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
              cursor: 'default',
            }}
          >
            {/* Radial accent glow — fades in on hover via GSAP */}
            <div
              ref={el => { glowRefs.current[i] = el }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 38%, ${s.accent}22 0%, transparent 68%)`,
                opacity: 0,
              }}
            />

            {/* Inner wrapper — tracks cursor (magnetic parallax) */}
            <div ref={el => { innerRefs.current[i] = el }} className="service-card-inner relative z-10 flex flex-col">

              {/* ── Illustration zone ── */}
              <div className="relative" style={{ height: '120px', padding: '10px 10px 0' }}>
                {/* Ambient colour blob behind illustration */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: '120px', height: '110px', borderRadius: '50%',
                    background: s.accent,
                    opacity: 0.045, filter: 'blur(40px)',
                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  }}
                />

                <div className="relative w-full h-full">
                  {i === 0 && <IllustContent accent={s.accent} />}
                  {i === 1 && <IllustSocial  accent={s.accent} />}
                  {i === 2 && <IllustWeb     accent={s.accent} />}
                  {i === 3 && <IllustBrand   accent={s.accent} />}
                </div>

              </div>

              {/* ── Text content ── */}
              <div className="px-5 pt-1 pb-4">
                <div className="mb-1">
                  <span
                    className="font-heading"
                    style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1, color: '#fff', opacity: 0.05 }}
                  >
                    {s.num}
                  </span>
                </div>

                <h3
                  className="font-heading text-white m-0 mb-3"
                  style={{ fontSize: 'clamp(15px, 1.35vw, 19px)', fontWeight: 400, lineHeight: 1.2 }}
                >
                  {s.name}
                </h3>

                <p
                  className="font-body m-0"
                  style={{ fontSize: 'clamp(12px, 0.95vw, 13.5px)', color: '#fff', opacity: 0.42, lineHeight: 1.65 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>

            {/* Accent bottom strip */}
            <div style={{ height: '3px', backgroundColor: s.accent }} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="text-center mt-20">
        <a
          ref={ctaLinkRef}
          href="https://being-service-page.vercel.app/"
          className="font-body tracking-[0.25em]"
          style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', color: '#fff', opacity: 0.6, textTransform: 'uppercase', cursor: 'pointer' }}
        >
          {['See', 'all', 'services', '→'].map((w, i, arr) => (
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
