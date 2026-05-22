import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CustomCursor from './components/CustomCursor'
import Hero from './components/sections/Hero'
import Numbers from './components/sections/Numbers'
import Services from './components/sections/Services'
import Work from './components/sections/Work'
import Offshoot from './components/sections/Offshoot'
import Testimonials from './components/sections/Testimonials'
import AboutTeaser from './components/sections/AboutTeaser'
import FinalCTA from './components/sections/FinalCTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Keep GSAP ScrollTrigger in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(time => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <main style={{ overflowX: 'hidden' }}>
        <Hero />
        <Numbers />
        <Services />
        <Work />
        <Offshoot />
        <Testimonials />
        <AboutTeaser />
        <FinalCTA />
      </main>
      {/* <Footer /> */}
    </>
  )
}
