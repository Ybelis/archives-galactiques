import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { series, films, eras } from '../data'
import { TypeBadge, ImportanceBadge, ContinuityBadge } from '../components/ui/Badge'
import { getWorkPoster } from '../data/mediaRegistry'

const allWorks = [...films, ...series]

export default function SeriesDetail() {
  const { slug } = useParams<{ slug: string }>()
  const show = series.find(s => s.id === slug)

  const [selectedSeason, setSelectedSeason] = useState(1)
  const [showAll, setShowAll] = useState(false)

  if (!show) {
    return (
      <main className="ag-page" style={{ textAlign: 'center' }}>
        <p className="ag-meta">Série introuvable.</p>
        <Link to="/series" className="ag-back-link">← Retour aux séries</Link>
      </main>
    )
  }

  const era = eras.find(e => e.id === show.era)
  const prereqWorks = show.prerequisites.map(id => allWorks.find(w => w.id === id)).filter(Boolean)
  const hasSeasonsData = show.seasonData && show.seasonData.length > 0
  const currentSeasonData = hasSeasonsData
    ? show.seasonData!.find(s => s.number === selectedSeason)
    : null
  const episodesToShow = currentSeasonData
    ? (showAll ? currentSeasonData.episodes : currentSeasonData.episodes.slice(0, 8))
    : []

  return (
    <main className="ag-page">
      <nav className="ag-breadcrumb">
        <Link to="/series" className="ag-breadcrumb-link">Séries</Link>
        <span className="ag-breadcrumb-sep">/</span>
        <span className="ag-breadcrumb-current">{show.title}</span>
      </nav>

      <div className="ag-detail-grid">
        <div className="ag-poster">
          <img
            src={getWorkPoster(show.id, show.thumbnail)}
            alt={show.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
        </div>

        <div>
          {era && (
            <Link to={`/eras/${era.id}`} style={{ textDecoration: 'none' }}>
              <span className="ag-era-eyebrow">{era.name}</span>
            </Link>
          )}

          <h1 className="ag-detail-title">{show.title}</h1>

          <div className="ag-meta-row">
            <TypeBadge value={show.type} />
            <ImportanceBadge value={show.importance} />
            <ContinuityBadge value={show.continuity} />
            <span className="ag-meta">{show.period}</span>
            {show.seasons && <span className="ag-meta">{show.seasons} saison{show.seasons > 1 ? 's' : ''}</span>}
            {show.episodes && <span className="ag-meta">{show.episodes} épisode{show.episodes > 1 ? 's' : ''}</span>}
            {show.status && (
              <span style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: show.status === 'en cours' ? '#34d399' : show.status === 'terminée' ? 'var(--color-muted)' : '#f87171',
                background: show.status === 'en cours' ? 'rgba(52,211,153,0.1)' : 'rgba(139,155,180,0.1)',
                padding: '1px 6px',
                borderRadius: '3px',
              }}>
                {show.status}
              </span>
            )}
          </div>

          <div className="ag-detail-section">
            <p className="ag-field-label">Synopsis</p>
            <p className="ag-synopsis">{show.synopsis}</p>
          </div>

          <div className="ag-detail-section">
            <p className="ag-field-label ag-field-label--accent">Pourquoi la regarder</p>
            <p className="ag-why-text">{show.whyWatch}</p>
          </div>

          {show.personalNote && (
            <blockquote className="ag-blockquote">
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
                {show.personalNote}
              </p>
            </blockquote>
          )}

          {prereqWorks.length > 0 && (
            <div>
              <p className="ag-field-label">Prérequis recommandés</p>
              <div className="ag-prereq-tags">
                {prereqWorks.map(w => w && (
                  <Link
                    key={w.id}
                    to={w.type === 'film' ? `/films/${w.id}` : `/series/${w.id}`}
                    className="ag-prereq-tag"
                  >
                    {w.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {hasSeasonsData && show.seasonData && (
        <div className="ag-section-divider">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 1.75rem' }}>
            Guide des épisodes
          </h2>

          <div className="ag-episode-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '120px' }}>
              {show.seasonData.map(season => (
                <button
                  key={season.number}
                  onClick={() => { setSelectedSeason(season.number); setShowAll(false) }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: selectedSeason === season.number ? 700 : 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.6rem 0.9rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: selectedSeason === season.number ? 'rgba(79,195,247,0.1)' : 'transparent',
                    color: selectedSeason === season.number ? 'var(--color-accent-blue)' : 'var(--color-muted)',
                    borderLeft: selectedSeason === season.number ? '2px solid var(--color-accent-blue)' : '2px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Saison {season.number}
                  <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.7, marginTop: '1px' }}>
                    {season.episodes.length} épisode{season.episodes.length > 1 ? 's' : ''}
                  </span>
                </button>
              ))}
            </div>

            <div>
              {currentSeasonData && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {episodesToShow.map((ep, i) => (
                      <div
                        key={ep.id}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '1rem',
                          padding: '0.75rem 0',
                          borderBottom: i < episodesToShow.length - 1 ? '1px solid var(--color-border)' : 'none',
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: 'var(--color-accent-blue)',
                          opacity: 0.6,
                          minWidth: '28px',
                          letterSpacing: '0.06em',
                        }}>
                          {String(ep.number).padStart(2, '0')}
                        </span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text)', margin: '0', lineHeight: 1.3 }}>
                            {ep.title}
                          </p>
                          {ep.summary && (
                            <p className="ag-meta" style={{ marginTop: '3px', lineHeight: 1.5 }}>{ep.summary}</p>
                          )}
                          {ep.airDate && (
                            <p className="ag-meta" style={{ marginTop: '2px', opacity: 0.7 }}>{ep.airDate}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {currentSeasonData.episodes.length > 8 && !showAll && (
                    <button className="ag-show-more" onClick={() => setShowAll(true)}>
                      Afficher tous les épisodes ({currentSeasonData.episodes.length - 8} de plus)
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {!hasSeasonsData && show.episodes && (
        <div className="ag-section-divider">
          <p className="ag-field-label">Guide des épisodes</p>
          <p className="ag-meta" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            {show.episodes} épisode{show.episodes > 1 ? 's' : ''} répartis sur {show.seasons} saison{show.seasons && show.seasons > 1 ? 's' : ''}.
            Le détail des épisodes sera ajouté prochainement.
          </p>
        </div>
      )}
    </main>
  )
}
