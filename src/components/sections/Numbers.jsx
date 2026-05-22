import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 92,   suffix: '%',  label: 'Client Retention Rate',        decimals: 0 },
  { value: 30,   suffix: '+',  label: 'Brands Worked With',           decimals: 0 },
  { value: 2.5,  suffix: 'M+', label: 'Impressions Generated',        decimals: 1 },
  { value: 12,   suffix: '+',  label: 'Industries',                   decimals: 0 },
  { value: 5000, suffix: '+',  label: 'Pieces of Content Produced',   decimals: 0 },
]

export default function Numbers() {
  const sectionRef = useRef(null)
  const itemsRef   = useRef([])
  const numsRef    = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Bright panel rises over the dark hero (clip-path scrub) ──
      gsap.fromTo(sectionRef.current,
        { clipPath: 'inset(8% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 15%',
            scrub: 1.6,
          },
        }
      )

      // Fade-up entrance — staggered per item
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 36,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      })

      // Count-up per number
      STATS.forEach((stat, i) => {
        const el  = numsRef.current[i]
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          onUpdate() {
            const display = stat.decimals > 0 ? obj.val.toFixed(stat.decimals) : Math.round(obj.val)
            el.textContent = display + stat.suffix
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-24 px-6"
      style={{ backgroundColor: '#F5F5F0' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-y-16 gap-x-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el }}
            className={`flex flex-col items-center text-center${i === STATS.length - 1 ? ' col-span-2 md:col-span-1' : ''}`}
          >
            <span
              ref={el => { numsRef.current[i] = el }}
              className="font-heading"
              style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 1, color: '#0a0a0a' }}
            >
              {stat.decimals > 0 ? (0).toFixed(stat.decimals) : 0}{stat.suffix}
            </span>
            <span
              className="font-body mt-3"
              style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', color: '#0a0a0a', opacity: 0.45, lineHeight: 1.6 }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
