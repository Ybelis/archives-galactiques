import { useParams, Link } from 'react-router-dom'
import { games, eras } from '../data'
import { TypeBadge, ImportanceBadge, ContinuityBadge } from '../components/ui/Badge'
import { getWorkPoster } from '../data/mediaRegistry'

export default function GameDetail() {
  const { slug } = useParams<{ slug: string }>()
  const game = games.find(g => g.id === slug)

  if (!game) {
    return (
      <main className="ag-page" style={{ textAlign: 'center' }}>
        <p className="ag-meta">Jeu introuvable.</p>
        <Link to="/games" className="ag-back-link">← Retour aux jeux</Link>
      </main>
    )
  }

  const era = eras.find(e => e.id === game.era)
  const relatedGames = games.filter(g => g.era === game.era && g.id !== game.id).slice(0, 3)

  return (
    <main className="ag-page">
      <nav className="ag-breadcrumb">
        <Link to="/games" className="ag-breadcrumb-link">Jeux</Link>
        <span className="ag-breadcrumb-sep">/</span>
        <span className="ag-breadcrumb-current">{game.title}</span>
      </nav>

      <div className="ag-detail-grid">
        <div className="ag-poster">
          <img
            src={getWorkPoster(game.id, game.thumbnail)}
            alt={game.title}
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

          <h1 className="ag-detail-title">{game.title}</h1>

          <div className="ag-meta-row">
            <TypeBadge value={game.type} />
            <ImportanceBadge value={game.importance} />
            <ContinuityBadge value={game.continuity} />
            <span className="ag-meta">{game.period}</span>
            {game.releaseYear > 0 && <span className="ag-meta">{game.releaseYear}</span>}
            {game.platforms && game.platforms.length > 0 && (
              <span className="ag-meta">{game.platforms.join(', ')}</span>
            )}
          </div>

          {game.continuityNote && (
            <div className="ag-continuity-note">{game.continuityNote}</div>
          )}

          <div className="ag-detail-section">
            <p className="ag-field-label">Synopsis</p>
            <p className="ag-synopsis">{game.synopsis}</p>
          </div>

          <div className="ag-detail-section">
            <p className="ag-field-label ag-field-label--accent">Pourquoi y jouer</p>
            <p className="ag-why-text">{game.whyWatch}</p>
          </div>

          {game.personalNote && (
            <blockquote className="ag-blockquote">
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
                {game.personalNote}
              </p>
            </blockquote>
          )}

          {game.prerequisites.length > 0 && (
            <div>
              <p className="ag-field-label">Prérequis recommandés</p>
              <div className="ag-prereq-tags">
                {game.prerequisites.map(id => {
                  const prereq = games.find(g => g.id === id)
                  if (!prereq) return null
                  return (
                    <Link key={id} to={`/games/${id}`} className="ag-prereq-tag">
                      {prereq.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedGames.length > 0 && (
        <div className="ag-section-divider">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem' }}>
            Autres jeux de la même ère
          </h2>
          <div className="ag-related-row">
            {relatedGames.map(g => (
              <Link key={g.id} to={`/games/${g.id}`} className="ag-related-card card-glow">
                <div className="ag-related-thumb">
                  <img src={g.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 2px' }}>{g.title}</p>
                  <p className="ag-meta" style={{ marginTop: 0 }}>{g.period} · {g.releaseYear}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
