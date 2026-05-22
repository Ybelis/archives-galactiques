import type { Work } from '../../types'
import { ImportanceBadge, TypeBadge } from './Badge'

interface Props {
  work: Work
  compact?: boolean
}

export default function MediaCard({ work, compact = false }: Props) {
  return (
    <article
      className="card-glow"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: compact ? '16/9' : '2/3', overflow: 'hidden', background: 'var(--color-surface-elevated)' }}>
        <img
          src={work.thumbnail}
          alt={work.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(7,11,19,0.9) 0%, transparent 50%)',
        }} />
        <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <TypeBadge value={work.type} />
        </div>
        <div style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
          <ImportanceBadge value={work.importance} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: compact ? '0.75rem' : '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: compact ? '1rem' : '1.1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: 0,
            lineHeight: 1.3,
          }}>
            {work.title}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: '2px 0 0', fontFamily: 'var(--font-body)' }}>
            {work.period} · {work.releaseYear}
            {work.duration && ` · ${work.duration} min`}
            {work.seasons && ` · ${work.seasons} saison${work.seasons > 1 ? 's' : ''}`}
          </p>
        </div>

        {!compact && (
          <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.55 }} className="line-clamp-3">
            {work.synopsis}
          </p>
        )}

        {!compact && work.personalNote && (
          <blockquote style={{
            margin: 0,
            padding: '0.5rem 0.75rem',
            borderLeft: '2px solid rgba(79, 195, 247, 0.4)',
            background: 'rgba(79, 195, 247, 0.04)',
            borderRadius: '0 4px 4px 0',
          }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }} className="line-clamp-2">
              {work.personalNote}
            </p>
          </blockquote>
        )}

        {!compact && work.prerequisites.length > 0 && (
          <p style={{ fontSize: '0.72rem', color: 'rgba(139,155,180,0.6)', margin: 0 }}>
            Prérequis : {work.prerequisites.join(', ')}
          </p>
        )}
      </div>
    </article>
  )
}
