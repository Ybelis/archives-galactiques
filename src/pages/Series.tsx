import { useState, useMemo } from 'react'
import { series } from '../data'
import type { Importance, WorkType } from '../types'
import MediaCard from '../components/ui/MediaCard'
import FilterBtn from '../components/ui/FilterBtn'

export default function Series() {
  const [typeFilter, setTypeFilter] = useState<WorkType | 'all'>('all')
  const [importanceFilter, setImportanceFilter] = useState<Importance | 'all'>('all')

  const filtered = useMemo(() => {
    return series.filter(s => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false
      if (importanceFilter !== 'all' && s.importance !== importanceFilter) return false
      return true
    })
  }, [typeFilter, importanceFilter])

  const live     = useMemo(() => filtered.filter(s => s.type === 'serie-live'), [filtered])
  const animated = useMemo(() => filtered.filter(s => s.type === 'serie-animee'), [filtered])

  return (
    <main className="ag-page-wide">
      <div className="ag-page-header">
        <h1 className="ag-page-title">Les Séries</h1>
        <p className="ag-lead">
          De <em>The Clone Wars</em> à <em>The Mandalorian</em> — live-action et animées, les deux comptent.
        </p>
      </div>

      <div className="ag-filters">
        <div className="ag-filter-group">
          <span className="ag-filter-label">Type</span>
          {(['all', 'serie-live', 'serie-animee'] as const).map(t => (
            <FilterBtn key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>
              {t === 'all' ? 'Toutes' : t === 'serie-live' ? 'Live-action' : 'Animées'}
            </FilterBtn>
          ))}
        </div>
        <div className="ag-filter-group">
          <span className="ag-filter-label">Importance</span>
          {(['all', 'essentiel', 'recommande', 'optionnel', 'pour-fan'] as const).map(imp => (
            <FilterBtn key={imp} active={importanceFilter === imp} onClick={() => setImportanceFilter(imp)}>
              {imp === 'all' ? 'Toutes' : imp === 'essentiel' ? 'Essentiel' : imp === 'recommande' ? 'Recommandé' : imp === 'optionnel' ? 'Optionnel' : 'Pour fan'}
            </FilterBtn>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="ag-meta ag-no-results">Aucun résultat pour ces filtres.</p>
      )}

      {live.length > 0 && (
        <section className="ag-section-mb">
          <h2 className="ag-group-title">
            Live-action <span className="ag-group-count">({live.length})</span>
          </h2>
          <div className="ag-grid-media">
            {live.map(s => <MediaCard key={s.id} work={s} />)}
          </div>
        </section>
      )}

      {animated.length > 0 && (
        <section>
          <h2 className="ag-group-title">
            Séries animées <span className="ag-group-count">({animated.length})</span>
          </h2>
          <div className="ag-grid-media">
            {animated.map(s => <MediaCard key={s.id} work={s} />)}
          </div>
        </section>
      )}
    </main>
  )
}
