import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { paths, films, series } from '../data'
import type { Work } from '../types'
import { TypeBadge } from '../components/ui/Badge'

const allWorks: Record<string, Work> = Object.fromEntries(
  [...films, ...series].map(w => [w.id, w])
)

const investmentColor: Record<string, string> = {
  'léger': '#34d399',
  'modéré': '#fde68a',
  'complet': '#a78bfa',
}

const requiredLabel: Record<string, string> = {
  'obligatoire': 'Essentiel',
  'recommandé': 'Recommandé',
  'optionnel': 'Optionnel',
}

const requiredColor: Record<string, string> = {
  'obligatoire': '#4fc3f7',
  'recommandé': '#fde68a',
  'optionnel': '#8b9bb4',
}

export default function WatchPaths() {
  const location = useLocation()
  const [activeId, setActiveId] = useState<string>(paths[0]?.id ?? '')

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const found = paths.find(p => p.id === id)
      if (found) setActiveId(found.id)
    }
  }, [location])

  const activePath = paths.find(p => p.id === activeId) ?? paths[0]

  return (
    <main className="ag-page">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="ag-page-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
          Parcours de visionnage
        </h1>
        <p className="ag-lead">
          Six chemins selon ton profil. Pas une liste chronologique — un vrai ordre de visionnage avec une intention.
        </p>
      </div>

      <div className="ag-paths-grid">
        <nav style={{ position: 'sticky', top: '80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {paths.map((path, i) => {
              const color = investmentColor[path.investment]
              const isActive = path.id === activeId
              return (
                <button
                  key={path.id}
                  onClick={() => {
                    setActiveId(path.id)
                    window.history.replaceState(null, '', `#${path.id}`)
                  }}
                  className={`wp-path-btn${isActive ? ' active' : ''}`}
                  style={{ '--path-color': color, '--path-bg': `${color}12` } as React.CSSProperties}
                >
                  <span className="wp-path-num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="wp-path-title">{path.title}</p>
                  <span className="wp-path-invest">{path.investment}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {activePath && (
          <div
            id={activePath.id}
            style={{ '--path-color': investmentColor[activePath.investment], '--path-bg': `${investmentColor[activePath.investment]}18` } as React.CSSProperties}
          >
            <div className="wp-detail-border">
              <div className="wp-detail-title-row">
                <h2 className="wp-detail-title">{activePath.title}</h2>
                <span className="wp-detail-invest-badge">{activePath.investment}</span>
              </div>

              <p className="wp-detail-profile">
                {activePath.profile} · {activePath.estimatedTime}
              </p>

              <p className="wp-detail-desc">{activePath.description}</p>

              <div className="ag-card wp-detail-why">
                <p className="ag-field-label">Pourquoi cet ordre ?</p>
                <p className="ag-why-text">{activePath.why}</p>
              </div>
            </div>

            <div className="wp-items-list">
              {activePath.items.map((item, i) => {
                const work = allWorks[item.workId]
                if (!work) return null
                const reqColor = requiredColor[item.required]

                return (
                  <div
                    key={item.workId}
                    className="wp-item"
                    style={{
                      '--req-color': reqColor,
                      '--req-color-bg': `${reqColor}0d`,
                      '--req-color-border': `${reqColor}60`,
                    } as React.CSSProperties}
                  >
                    <div className="wp-item-num">{i + 1}</div>

                    <div className="wp-item-thumb">
                      <img
                        src={work.thumbnail}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                      />
                    </div>

                    <div className="wp-item-info">
                      <div className="wp-item-header">
                        <Link
                          to={work.type === 'film' ? `/films/${work.id}` : `/series/${work.id}`}
                          className="wp-item-title-link"
                        >
                          {work.title}
                        </Link>
                        <TypeBadge value={work.type} />
                        <span className="wp-item-required">
                          {requiredLabel[item.required]}
                        </span>
                      </div>
                      <p className="ag-meta" style={{ margin: '0 0 0.25rem' }}>
                        {work.period}{work.seasons ? ` · ${work.seasons} saison${work.seasons > 1 ? 's' : ''}` : ''}
                        {work.duration ? ` · ${work.duration} min` : ''}
                      </p>
                      {item.note && (
                        <p className="wp-item-note">{item.note}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
