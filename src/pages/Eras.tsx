import { Link } from 'react-router-dom'
import { eras, films, series, games } from '../data'
import { ContinuityBadge } from '../components/ui/Badge'
import { getWorkLogo } from '../data/mediaRegistry'

const eraAccentColor: Record<string, string> = {
  'dawn-of-the-jedi': '#a78bfa',
  'old-republic': '#c084fc',
  'high-republic': '#34d399',
  'fall-of-the-jedi': '#f59e0b',
  'reign-of-the-empire': '#ef4444',
  'age-of-rebellion': '#4fc3f7',
  'new-republic': '#60a5fa',
  'rise-of-the-first-order': '#f472b6',
  'new-jedi-order': '#a78bfa',
}

const eraShortName: Record<string, string> = {
  'dawn-of-the-jedi': 'Aube',
  'old-republic': 'Anc. Rép.',
  'high-republic': 'Haute Rép.',
  'fall-of-the-jedi': 'Chute',
  'reign-of-the-empire': 'Empire',
  'age-of-rebellion': 'Rébellion',
  'new-republic': 'Nouv. Rép.',
  'rise-of-the-first-order': 'Premier Ordre',
  'new-jedi-order': 'Nouv. Jedi',
}

const allMediaWorks = [...films, ...series]

function WorkCard({ work, to, showContinuity = false }: {
  work: { id: string; title: string; type: string; continuity: string; thumbnail: string; assets?: { logo?: string; poster?: string } }
  to: string
  showContinuity?: boolean
}) {
  const imgSrc = getWorkLogo(work.id, work.assets?.poster ?? work.thumbnail)
  const showBadge = showContinuity && work.continuity !== 'canon'

  return (
    <Link to={to} title={work.title} className="eras-work-link">
      {/* <div className="eras-work-card"> */}
        <img
          src={imgSrc}
          alt={work.title}
          loading="lazy"
          className="eras-work-img"
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
        {/* {showBadge && (
          <div className="eras-work-badge">
            <ContinuityBadge value={work.continuity as 'legends' | 'non-canon' | 'mixed' | 'unknown' | 'canon'} />
          </div>
        )} */}
      {/* </div> */}
    </Link>
  )
}

export default function Eras() {
  return (
    <div>
      <div className="eras-header">
        <h1 className="ag-fade-up eras-header-title">Les grandes ères</h1>
        <p className="ag-fade-up ag-d1 eras-header-desc">
          L'univers Star Wars couvre plus de 25 000 ans. Chaque ère a son ton, ses enjeux, ses personnages.
        </p>
      </div>

      <nav className="eras-nav">
        <div className="eras-nav-scroll">
          <div className="h-scroll">
            <div className="eras-nav-row">
              {eras.map(era => {
                const color = eraAccentColor[era.id] ?? '#4fc3f7'
                return (
                  <a
                    key={era.id}
                    href={`#era-${era.id}`}
                    className="eras-nav-link"
                    style={{ '--era-color': color } as React.CSSProperties}
                  >
                    <img
                      src={era.image}
                      alt=""
                      className="eras-nav-icon"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                    />
                    <span className="eras-nav-label">
                      {eraShortName[era.id] ?? era.name.split(' ')[0]}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="eras-body">
        {eras.map(era => {
          const color = eraAccentColor[era.id] ?? '#4fc3f7'
          const eraWorks = allMediaWorks.filter(w => w.era === era.id)
          const eraGames = games.filter(g => g.era === era.id)
          const hasContent = eraWorks.length > 0 || eraGames.length > 0

          return (
            <section
              key={era.id}
              id={`era-${era.id}`}
              className="eras-section"
              style={{ '--era-color': color } as React.CSSProperties}
            >
              <div className="eras-section-header">
                <img
                  src={era.image}
                  alt=""
                  loading="lazy"
                  className="eras-section-icon"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
                />
                <div className="eras-section-info">
                  <span className="eras-section-period">{era.period}</span>
                  <Link to={`/eras/${era.id}`} className="eras-section-title">
                    {era.name}
                  </Link>
                  <p className="eras-section-desc">{era.shortDescription}</p>
                </div>
                <Link to={`/eras/${era.id}`} className="eras-section-more">
                  Voir l'ère →
                </Link>
              </div>

              {eraWorks.length > 0 && (
                <div className="eras-works-group">
                  <p className="eras-works-label">Films &amp; Séries</p>
                  <div className="h-scroll">
                    <div className="eras-works-row">
                      {eraWorks.map(work => {
                        const to = work.type === 'film' ? `/films/${work.id}` : `/series/${work.id}`
                        return <WorkCard key={work.id} work={work} to={to} />
                      })}
                    </div>
                  </div>
                </div>
              )}

              {eraGames.length > 0 && (
                <div className="eras-works-group">
                  <p className="eras-works-label">Jeux</p>
                  <div className="h-scroll">
                    <div className="eras-works-row">
                      {eraGames.map(game => (
                        <WorkCard key={game.id} work={game} to={`/games/${game.id}`} showContinuity />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!hasContent && (
                <p className="eras-empty">Aucune œuvre répertoriée — contenu à venir.</p>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
