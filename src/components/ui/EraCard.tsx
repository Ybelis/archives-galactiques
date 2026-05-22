import type { Era } from '../../types'
import { Link } from 'react-router-dom'

interface Props {
  era: Era
}

export default function EraCard({ era }: Props) {
  return (
    <Link
      to={`/chronologie?era=${era.id}`}
      style={{ textDecoration: 'none' }}
    >
      <article
        className="card-glow"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          overflow: 'hidden',
          width: '220px',
          flexShrink: 0,
          cursor: 'pointer',
        }}
      >
        {/* Era image */}
        <div style={{ height: '130px', background: 'var(--color-surface-elevated)', position: 'relative', overflow: 'hidden' }}>
          <img
            src={era.image}
            alt={era.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7,11,19,0.85) 0%, transparent 60%)',
          }} />
        </div>

        <div style={{ padding: '0.85rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 0.3rem',
            letterSpacing: '0.03em',
          }}>
            {era.name}
          </h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem', fontFamily: 'var(--font-body)' }}>
            {era.period}
          </p>
          <p style={{ fontSize: '0.76rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.45 }} className="line-clamp-2">
            {era.shortDescription}
          </p>
        </div>
      </article>
    </Link>
  )
}
