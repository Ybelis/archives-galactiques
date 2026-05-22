import type { ViewingPath } from '../../types'
import { Link } from 'react-router-dom'

const investmentColor: Record<ViewingPath['investment'], string> = {
  'léger':    '#34d399',
  'modéré':   '#fde68a',
  'complet':  '#a78bfa',
}

interface Props {
  path: ViewingPath
  featured?: boolean
}

export default function PathCard({ path, featured = false }: Props) {
  return (
    <Link to={`/parcours#${path.id}`} style={{ textDecoration: 'none' }}>
      <article
        className="card-glow"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: featured ? '1.5rem' : '1.1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          height: '100%',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: featured ? '1.25rem' : '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: 0,
            lineHeight: 1.3,
          }}>
            {path.title}
          </h3>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: investmentColor[path.investment],
            background: `${investmentColor[path.investment]}18`,
            padding: '2px 8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {path.investment}
          </span>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic' }}>
          {path.profile}
        </p>

        <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.55 }} className={featured ? '' : 'line-clamp-2'}>
          {path.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-blue)' }}>
            {path.items.length} œuvre{path.items.length > 1 ? 's' : ''}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(148,197,255,0.3)' }}>·</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-blue)', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
            Voir le parcours →
          </span>
        </div>
      </article>
    </Link>
  )
}
