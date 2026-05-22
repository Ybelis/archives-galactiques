import { useState } from 'react'
import { databankEntries } from '../data'
import type { DatabankCategory } from '../types'

const categoryLabel: Record<DatabankCategory, string> = {
  character: 'Personnages',
  location: 'Lieux',
  planet: 'Planètes',
  vehicle: 'Vaisseaux',
  organization: 'Organisations',
  concept: 'Concepts',
  event: 'Événements',
  species: 'Espèces',
}

const categoryColor: Record<DatabankCategory, string> = {
  character: '#4fc3f7',
  location: '#34d399',
  planet: '#60a5fa',
  vehicle: '#f59e0b',
  organization: '#a78bfa',
  concept: '#f472b6',
  event: '#ef4444',
  species: '#fde68a',
}

const orderedCategories: DatabankCategory[] = [
  'event', 'concept', 'organization', 'planet', 'location', 'character', 'vehicle', 'species',
]

export default function Databank() {
  const [activeCategory, setActiveCategory] = useState<DatabankCategory | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = databankEntries.filter(entry => {
    const matchCat = activeCategory === 'all' || entry.category === activeCategory
    const matchSearch =
      !search ||
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.definition.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const entryMap = Object.fromEntries(databankEntries.map(e => [e.id, e]))

  return (
    <main className="ag-page-narrow">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="ag-page-title">Databank</h1>
        <p className="ag-lead">
          Personnages, organisations, planètes, concepts. Tout ce qu'il faut savoir pour ne pas être perdu dans une galaxie lointaine, très lointaine.
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Rechercher une entrée..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ag-search-input"
        />
      </div>

      <div className="db-cat-filters">
        <button
          onClick={() => setActiveCategory('all')}
          className={`db-cat-btn${activeCategory === 'all' ? ' active' : ''}`}
          style={activeCategory === 'all' ? {
            '--cat-color': 'var(--color-accent-blue)',
            '--cat-bg': 'rgba(79,195,247,0.1)',
          } as React.CSSProperties : undefined}
        >
          Tout ({databankEntries.length})
        </button>
        {orderedCategories.map(cat => {
          const count = databankEntries.filter(e => e.category === cat).length
          if (count === 0) return null
          const color = categoryColor[cat]
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`db-cat-btn${isActive ? ' active' : ''}`}
              style={isActive ? {
                '--cat-color': color,
                '--cat-bg': `${color}15`,
              } as React.CSSProperties : undefined}
            >
              {categoryLabel[cat]}
            </button>
          )
        })}
      </div>

      <div>
        {filtered.map((entry) => {
          const color = categoryColor[entry.category]
          return (
            <div
              key={entry.id}
              id={entry.id}
              className="db-entry"
              style={{ '--cat-color-stripe': `${color}40` } as React.CSSProperties}
            >
              <div className="db-entry-inner">
                <div className="db-entry-stripe" />
                <div className="db-entry-body">
                  <div className="db-entry-header">
                    <h2 className="db-entry-name">{entry.name}</h2>
                    <span
                      className="db-entry-cat"
                      style={{ '--cat-color': color, '--cat-bg': `${color}15` } as React.CSSProperties}
                    >
                      {categoryLabel[entry.category]}
                    </span>
                  </div>

                  <p className="db-entry-def">{entry.definition}</p>

                  {entry.related && entry.related.length > 0 && (
                    <div className="db-related">
                      <span className="db-related-label">Voir aussi :</span>
                      {entry.related.map(relId => {
                        const rel = entryMap[relId]
                        return rel ? (
                          <a
                            key={relId}
                            href={`#${relId}`}
                            onClick={e => {
                              e.preventDefault()
                              setActiveCategory('all')
                              setSearch('')
                              setTimeout(() => {
                                const el = document.getElementById(relId)
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                              }, 50)
                            }}
                            className="db-related-link"
                          >
                            {rel.name}
                          </a>
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p className="ag-meta" style={{ fontStyle: 'italic', padding: '3rem 0', textAlign: 'center' }}>
            Aucune entrée trouvée.
          </p>
        )}
      </div>
    </main>
  )
}
