const LOGOS = [
  '/images/logos/logo1.png',
  '/images/logos/logo2.png',
  '/images/logos/logo3.png',
  '/images/logos/logo4.png',
  '/images/logos/logo5.png',
  '/images/logos/logo6.png',
  '/images/logos/logo7.png',
  '/images/logos/logo8.jpeg',
  '/images/logos/logo9.jpeg',
  '/images/logos/logo10.png',
  '/images/logos/logo11.jpg',
  '/images/logos/logo12.jpg',
  '/images/logos/logo13.png',
]

// Duplicate for seamless loop
const TRACK = [...LOGOS, ...LOGOS]

export default function LogoMarquee() {
  return (
    <section
      style={{
        backgroundColor: '#F5F5F0',
        paddingTop: '56px',
        paddingBottom: '56px',
        overflow: 'hidden',
      }}
      aria-label="Client logos"
    >
      {/* Label */}
      <p
        className="font-body text-center tracking-[0.22em] m-0 mb-10"
        style={{
          fontSize: 'clamp(11px, 1vw, 13px)',
          color: '#0a0a0a',
          opacity: 0.38,
          textTransform: 'uppercase',
        }}
      >
        Trusted by brands we believe in
      </p>

      {/* Fade edges */}
      <div style={{ position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, #F5F5F0 0%, transparent 12%, transparent 88%, #F5F5F0 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling track */}
        <div
          className="logo-marquee-track"
          style={{ display: 'flex', willChange: 'transform' }}
        >
          {TRACK.map((src, i) => (
            <div
              key={i}
              className="logo-marquee-item"
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={src}
                alt=""
                draggable="false"
                style={{
                  height: '64px',
                  width: 'auto',
                  maxWidth: '180px',
                  objectFit: 'contain',
                  userSelect: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
