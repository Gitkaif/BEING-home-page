import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionBreak({ label = 'NEXT' }) {
  const ref      = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Ghost text scrolls opposite to page scroll — pure parallax
      gsap.to(trackRef.current, {
        x: '-18%',
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const repeat = `${label}   ✦   `.repeat(8)

  return (
    <div
      ref={ref}
      style={{
        height: '96px',
        backgroundColor: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        borderTop:    '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div ref={trackRef} style={{ whiteSpace: 'nowrap', willChange: 'transform' }}>
        <span
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(56px, 7.5vw, 96px)',
            letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.055)',
            userSelect: 'none',
          }}
        >
          {repeat}
        </span>
      </div>
    </div>
  )
}
