import { useState, useMemo } from 'react'
import { games } from '../data'
import type { Importance, Continuity } from '../types'
import MediaCard from '../components/ui/MediaCard'
import FilterBtn from '../components/ui/FilterBtn'

export default function Games() {
  const [importanceFilter, setImportanceFilter] = useState<Importance | 'all'>('all')
  const [continuityFilter, setContinuityFilter] = useState<Continuity | 'all'>('all')

  const filtered = useMemo(() => {
    return games.filter(g => {
      if (importanceFilter !== 'all' && g.importance !== importanceFilter) return false
      if (continuityFilter !== 'all' && g.continuity !== continuityFilter) return false
      return true
    })
  }, [importanceFilter, continuityFilter])

  return (
    <main className="ag-page-wide">
      <div style={{ marginBottom: '2rem' }}>
        <p className="ag-eyebrow">Jeux vidéo</p>
        <h1 className="ag-page-title">Les Jeux</h1>
        <p className="ag-lead">
          De <em>Knights of the Old Republic</em> aux <em>Jedi</em> d'EA — canon, Legends, ou pour le plaisir.
        </p>
      </div>

      <div className="ag-filters">
        <div className="ag-filter-group">
          <span className="ag-filter-label">Importance</span>
          {(['all', 'essentiel', 'recommande', 'optionnel', 'pour-fan'] as const).map(imp => (
            <FilterBtn key={imp} active={importanceFilter === imp} onClick={() => setImportanceFilter(imp)}>
              {imp === 'all' ? 'Tous' : imp === 'essentiel' ? 'Essentiel' : imp === 'recommande' ? 'Recommandé' : imp === 'optionnel' ? 'Optionnel' : 'Pour fan'}
            </FilterBtn>
          ))}
        </div>
        <div className="ag-filter-group">
          <span className="ag-filter-label">Continuité</span>
          {(['all', 'canon', 'legends', 'non-canon'] as const).map(c => (
            <FilterBtn key={c} active={continuityFilter === c} onClick={() => setContinuityFilter(c)}>
              {c === 'all' ? 'Tous' : c === 'canon' ? 'Canon' : c === 'legends' ? 'Legends' : 'Non-canon'}
            </FilterBtn>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="ag-meta" style={{ textAlign: 'center', padding: '4rem 0' }}>
          Aucun résultat pour ces filtres.
        </p>
      )}

      {filtered.length > 0 && (
        <div className="ag-grid-media">
          {filtered.map(g => <MediaCard key={g.id} work={g} />)}
        </div>
      )}
    </main>
  )
}
