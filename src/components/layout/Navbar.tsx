import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/chronologie', label: 'Chronologie' },
  { to: '/films', label: 'Films' },
  { to: '/series', label: 'Séries' },
  { to: '/parcours', label: 'Parcours' },
  { to: '/lexique', label: 'Lexique' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        background: 'rgba(7, 11, 19, 0.92)',
        borderBottom: '1px solid rgba(148, 197, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Star Wars
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', paddingTop: '2px' }}>
            Le Guide
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="nav-desktop">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-accent-blue)' : 'var(--color-muted)',
                textDecoration: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                transition: 'color 0.15s ease',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="nav-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-muted)', borderRadius: '1px' }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: 'rgba(13, 20, 36, 0.98)',
            borderTop: '1px solid rgba(148, 197, 255, 0.1)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
          className="nav-mobile-menu"
        >
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text)',
                textDecoration: 'none',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(148, 197, 255, 0.06)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
