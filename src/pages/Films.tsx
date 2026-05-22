import { useState, useMemo } from 'react'
import { films } from '../data'
import type { Importance } from '../types'
import MediaCard from '../components/ui/MediaCard'
import { ImportanceBadge } from '../components/ui/Badge'
import FilterBtn from '../components/ui/FilterBtn'

const importanceOptions: { value: Importance | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'essentiel', label: 'Essentiel' },
  { value: 'recommande', label: 'Recommandé' },
  { value: 'optionnel', label: 'Optionnel' },
]

const essentialOrder = [
  'episode-iv', 'episode-v', 'episode-vi',
  'episode-i', 'episode-ii', 'episode-iii',
  'rogue-one', 'episode-vii', 'episode-viii', 'episode-ix', 'solo',
]

export default function Films() {
  const [filter, setFilter] = useState<Importance | 'all'>('all')
  const [view, setView] = useState<'universe' | 'importance'>('universe')

  const filtered = useMemo(() => {
    const base = filter === 'all' ? films : films.filter(f => f.importance === filter)
    if (view === 'universe') return [...base].sort((a, b) => a.releaseYear - b.releaseYear)
    return [...base].sort((a, b) => essentialOrder.indexOf(a.id) - essentialOrder.indexOf(b.id))
  }, [filter, view])

  return (
    <main className="ag-page-wide">
      <div className="ag-page-header">
        <p className="ag-eyebrow">Cinéma</p>
        <h1 className="ag-page-title">Les Films</h1>
        <p className="ag-lead">
          {films.length} films. Des classiques de 1977 aux productions Disney. Triés dans l'ordre de l'univers par défaut.
        </p>
      </div>

      <div className="ag-filters-bar">
        <div className="ag-filter-group">
          {importanceOptions.map(opt => (
            <FilterBtn key={opt.value} active={filter === opt.value} onClick={() => setFilter(opt.value)}>
              {opt.label}
            </FilterBtn>
          ))}
        </div>
        <div className="ag-filter-group">
          <FilterBtn active={view === 'universe'} onClick={() => setView('universe')}>Ordre univers</FilterBtn>
          <FilterBtn active={view === 'importance'} onClick={() => setView('importance')}>Conseil de visionnage</FilterBtn>
        </div>
      </div>

      <div className="ag-legend-row">
        {(['essentiel', 'recommande', 'optionnel'] as Importance[]).map(imp => (
          <ImportanceBadge key={imp} value={imp} />
        ))}
      </div>

      <div className="ag-grid-media">
        {filtered.map(film => <MediaCard key={film.id} work={film} />)}
      </div>
    </main>
  )
}
