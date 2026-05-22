import { Link } from 'react-router-dom'
import type { Work } from '../../types'
import { ImportanceBadge, TypeBadge } from './Badge'
import { getWorkAssets } from '../../data/mediaRegistry'

interface Props {
  work: Work
  compact?: boolean
}

function cardDetailPath(work: Work): string {
  if (work.type === 'film') return `/films/${work.id}`
  if (work.type === 'jeu') return `/games/${work.id}`
  return `/series/${work.id}`
}

export default function MediaCard({ work, compact = false }: Props) {
  const to = cardDetailPath(work)
  const assets = getWorkAssets(work.id)
  const imgSrc = assets.poster ?? assets.thumbnail ?? work.thumbnail

  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'block' }}>
      <article className="card-glow ag-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', height: '100%' }}>
        <div className={compact ? 'media-card-img-wrap media-card-img-wrap--wide' : 'media-card-img-wrap'}>
          <img
            src={imgSrc}
            alt={work.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="media-card-img-overlay" />
          <div className="media-card-badges-top">
            <TypeBadge value={work.type} />
          </div>
          <div className="media-card-badge-bottom">
            <ImportanceBadge value={work.importance} />
          </div>
        </div>

        <div className={compact ? 'media-card-body media-card-body--compact' : 'media-card-body'}>
          <div>
            <h3 className={compact ? 'media-card-title media-card-title--compact' : 'media-card-title'}>
              {work.title}
            </h3>
            <p className="ag-meta media-card-meta">
              {work.period} · {work.releaseYear}
              {work.duration ? ` · ${work.duration} min` : ''}
              {work.seasons ? ` · ${work.seasons} saison${work.seasons > 1 ? 's' : ''}` : ''}
            </p>
          </div>

          {!compact && (
            <p className="media-card-synopsis line-clamp-3">{work.synopsis}</p>
          )}

          {!compact && work.personalNote && (
            <blockquote className="media-card-note">
              <p className="line-clamp-2">{work.personalNote}</p>
            </blockquote>
          )}
        </div>
      </article>
    </Link>
  )
}
