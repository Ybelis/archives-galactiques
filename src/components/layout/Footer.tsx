import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(148, 197, 255, 0.08)',
      background: 'var(--color-space)',
      padding: '2.5rem 1.5rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { to: '/chronologie', label: 'Chronologie' },
            { to: '/films', label: 'Films' },
            { to: '/series', label: 'Séries' },
            { to: '/parcours', label: 'Parcours' },
            { to: '/lexique', label: 'Lexique' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', color: 'rgba(139, 155, 180, 0.5)', textAlign: 'center', margin: 0 }}>
          Site non officiel. Star Wars est une marque déposée de Lucasfilm Ltd. / Disney.<br />
          Fait par un fan, pour les futurs fans.
        </p>
      </div>
    </footer>
  )
}
