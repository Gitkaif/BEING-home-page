import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

const HOVERABLES = 'a, button, .cursor-hover'
const CURSOR_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 769px)'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const dotRef   = useRef(null)
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(CURSOR_QUERY).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(CURSOR_QUERY)
    const onChange = ({ matches }) => setEnabled(matches)

    setEnabled(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)

    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const outer = outerRef.current
    const dot   = dotRef.current

    let isHovering = false
    let isVisible  = false

    const moveOuterX = gsap.quickTo(outer, 'x', { duration: 0.12, ease: 'power2.out' })
    const moveOuterY = gsap.quickTo(outer, 'y', { duration: 0.12, ease: 'power2.out' })

    const setHoverState = (nextHovering) => {
      if (nextHovering === isHovering) return
      isHovering = nextHovering

      gsap.to(outer, {
        scale: isHovering ? 1.8 : 1,
        borderColor: isHovering ? '#c9a84c' : 'rgba(255,255,255,0.7)',
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to(dot, {
        scale: isHovering ? 0 : 1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const onMove = ({ clientX, clientY, target }) => {
      if (!isVisible) {
        isVisible = true
        gsap.set([outer, dot], { opacity: 1 })
      }

      setHoverState(Boolean(target?.closest?.(HOVERABLES)))

      gsap.set(dot, { x: clientX - 3, y: clientY - 3 })
      moveOuterX(clientX - 18)
      moveOuterY(clientY - 18)
    }

    const onDocLeave = () => {
      isVisible = false
      setHoverState(false)
      gsap.to([outer, dot], { opacity: 0, duration: 0.2, overwrite: true })
    }

    document.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onDocLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onDocLeave)
      gsap.killTweensOf([outer, dot])
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.7)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
