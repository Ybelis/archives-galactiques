import type { Era } from '../../types'
import { Link } from 'react-router-dom'

interface Props {
  era: Era
}

export default function EraCard({ era }: Props) {
  return (
    <Link to={`/eres/${era.id}`} style={{ textDecoration: 'none' }}>
      <article
        className="card-glow"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.875rem',
          width: '260px',
          flexShrink: 0,
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '44px',
          height: '44px',
          flexShrink: 0,
          borderRadius: '6px',
          overflow: 'hidden',
          background: 'var(--color-surface-elevated)',
          border: '1px solid rgba(148,197,255,0.1)',
        }}>
          <img
            src={era.image}
            alt=""
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: '4px' }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 0.2rem',
            letterSpacing: '0.02em',
          }}>
            {era.name}
          </h3>
          <p style={{ fontSize: '0.68rem', color: 'var(--color-accent-blue)', margin: '0 0 0.35rem' }}>
            {era.period}
          </p>
          <p style={{ fontSize: '0.73rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.4 }} className="line-clamp-2">
            {era.shortDescription}
          </p>
        </div>
      </article>
    </Link>
  )
}
