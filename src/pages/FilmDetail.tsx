import { useParams, Link } from 'react-router-dom'
import { films, series, eras } from '../data'
import { TypeBadge, ImportanceBadge, ContinuityBadge } from '../components/ui/Badge'
import { getWorkPoster } from '../data/mediaRegistry'

const importanceLabel: Record<string, string> = {
  essentiel: 'Essentiel',
  recommande: 'Recommandé',
  optionnel: 'Optionnel',
  'pour-fan': 'Pour fan',
}

const allWorks = [...films, ...series]

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>()
  const film = films.find(f => f.id === slug)

  if (!film) {
    return (
      <main className="ag-page" style={{ textAlign: 'center' }}>
        <p className="ag-meta">Film introuvable.</p>
        <Link to="/films" className="ag-back-link">← Retour aux films</Link>
      </main>
    )
  }

  const era = eras.find(e => e.id === film.era)
  const prereqWorks = film.prerequisites.map(id => allWorks.find(w => w.id === id)).filter(Boolean)
  const relatedFilms = films.filter(f => f.era === film.era && f.id !== film.id).slice(0, 3)

  return (
    <main className="ag-page">
      <nav className="ag-breadcrumb">
        <Link to="/films" className="ag-breadcrumb-link">Films</Link>
        <span className="ag-breadcrumb-sep">/</span>
        <span className="ag-breadcrumb-current">{film.title}</span>
      </nav>

      <div className="ag-detail-grid">
        <div className="ag-poster">
          <img
            src={getWorkPoster(film.id, film.thumbnail)}
            alt={film.title}
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

          <h1 className="ag-detail-title">{film.title}</h1>

          <div className="ag-meta-row">
            <TypeBadge value={film.type} />
            <ImportanceBadge value={film.importance} />
            <ContinuityBadge value={film.continuity} />
            <span className="ag-meta">{film.period}</span>
            {film.releaseYear > 0 && <span className="ag-meta">{film.releaseYear}</span>}
            {film.duration && <span className="ag-meta">{film.duration} min</span>}
          </div>

          <div className="ag-detail-section">
            <p className="ag-field-label">Synopsis</p>
            <p className="ag-synopsis">{film.synopsis}</p>
          </div>

          <div className="ag-detail-section">
            <p className="ag-field-label ag-field-label--accent">Pourquoi le regarder</p>
            <p className="ag-why-text">{film.whyWatch}</p>
          </div>

          {film.personalNote && (
            <blockquote className="ag-blockquote">
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
                {film.personalNote}
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

      {relatedFilms.length > 0 && (
        <div className="ag-section-divider">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem' }}>
            Autres films de la même ère
          </h2>
          <div className="ag-related-row">
            {relatedFilms.map(f => (
              <Link key={f.id} to={`/films/${f.id}`} className="ag-related-card card-glow">
                <div className="ag-related-thumb">
                  <img src={f.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 2px' }}>{f.title}</p>
                  <p className="ag-meta" style={{ marginTop: 0 }}>{f.period} · {importanceLabel[f.importance]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
