import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import type { Theme } from '../../hooks/useTheme'

const navLinks = [
  { to: '/timeline', label: 'Chronologie' },
  { to: '/films', label: 'Films' },
  { to: '/series', label: 'Séries' },
  { to: '/games', label: 'Jeux' },
  { to: '/eras', label: 'Les ères' },
  { to: '/watch-paths', label: 'Parcours' },
  { to: '/databank', label: 'Databank' },
]

interface Props {
  onSearchClick: () => void
  theme: Theme
  onThemeToggle: () => void
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function Navbar({ onSearchClick, theme, onThemeToggle }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      background: theme === 'dark'
        ? 'rgba(7, 11, 19, 0.92)'
        : 'rgba(242, 245, 250, 0.92)',
      borderBottom: '1px solid var(--color-border)',
      backdropFilter: 'blur(12px)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
    }}>
      <nav style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Archives
            </span>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.6rem',
              fontWeight: 500,
              color: 'var(--color-accent-blue)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}>
              Galactiques
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '0.1rem', alignItems: 'center' }} className="nav-desktop">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-accent-blue)' : 'var(--color-muted)',
                textDecoration: 'none',
                padding: '0.4rem 0.7rem',
                borderRadius: '4px',
                transition: 'color 0.15s ease',
              })}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Search */}
          <button
            onClick={onSearchClick}
            aria-label="Rechercher"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginLeft: '0.4rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '0.38rem 0.7rem',
              cursor: 'pointer',
              color: 'var(--color-muted)',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            className="search-btn"
          >
            <SearchIcon />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
              Rechercher
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '0.25rem',
              width: '34px',
              height: '34px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--color-muted)',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            className="search-btn"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile actions */}
        <div style={{ display: 'none', gap: '0.4rem', alignItems: 'center' }} className="nav-mobile-actions">
          <button
            onClick={onSearchClick}
            aria-label="Rechercher"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--color-muted)' }}
          >
            <SearchIcon />
          </button>
          <button
            onClick={onThemeToggle}
            aria-label="Changer le thème"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--color-muted)' }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-muted)', borderRadius: '1px' }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: theme === 'dark' ? 'rgba(13, 20, 36, 0.98)' : 'rgba(242, 245, 250, 0.98)',
          borderTop: '1px solid var(--color-border)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
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
                borderBottom: '1px solid var(--color-border)',
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
          .nav-mobile-actions { display: flex !important; }
        }
        .search-btn:hover {
          border-color: rgba(79, 195, 247, 0.35) !important;
          color: var(--color-text) !important;
        }
      `}</style>
    </header>
  )
}
