import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 20,  suffix: '+',   label: 'Brands worked with' },
  { value: 4,   suffix: '',    label: 'Core services' },
  { value: 48,  suffix: 'hrs', label: 'OffShoot delivery' },
  { value: 100, suffix: '%',   label: 'Curiosity, every time' },
]

export default function Numbers() {
  const sectionRef = useRef(null)
  const itemsRef   = useRef([])
  const numsRef    = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

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
            el.textContent = Math.round(obj.val) + stat.suffix
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
      style={{ backgroundColor: '#F5F5F0' }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el }}
            className="flex flex-col items-center text-center"
          >
            <span
              ref={el => { numsRef.current[i] = el }}
              className="font-heading"
              style={{ fontSize: 'clamp(52px, 5.5vw, 80px)', lineHeight: 1, color: '#0a0a0a' }}
            >
              0{stat.suffix}
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
