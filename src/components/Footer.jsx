export default function Footer() {
  return (
    <footer
      className="px-6 py-10"
      style={{
        backgroundColor: '#000',
        borderTop: '1px solid #222',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

        {/* Wordmark */}
        <span
          className="font-display tracking-[0.18em]"
          style={{ fontSize: '20px', color: '#fff' }}
        >
          BEING.
        </span>

        {/* Nav links */}
        <nav className="flex gap-6 flex-wrap justify-center">
          {['Services', 'Work', 'About', 'Contact'].map((label, i, arr) => (
            <span key={label} className="flex items-center gap-6">
              <a
                href={`/${label.toLowerCase()}`}
                className="font-body"
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
              >
                {label}
              </a>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>·</span>
              )}
            </span>
          ))}
        </nav>

        {/* Copyright */}
        <p
          className="font-body m-0"
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          &copy; 2025 Being. All rights reserved.
        </p>

      </div>
    </footer>
  )
}
