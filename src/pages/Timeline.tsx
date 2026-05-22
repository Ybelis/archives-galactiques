import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { films, series, eras } from '../data'
import type { EraId, Importance, WorkType } from '../types'
import MediaCard from '../components/ui/MediaCard'
import FilterBtn from '../components/ui/FilterBtn'

const allWorks = [...films, ...series].sort((a, b) => {
  const eraOrder: Record<EraId, number> = {
    'dawn-of-the-jedi': 0, 'old-republic': 1, 'high-republic': 2,
    'fall-of-the-jedi': 3, 'reign-of-the-empire': 4, 'age-of-rebellion': 5,
    'new-republic': 6, 'rise-of-the-first-order': 7, 'new-jedi-order': 8,
  }
  return eraOrder[a.era] - eraOrder[b.era]
})

const importanceOptions: { value: Importance | 'all'; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'essentiel', label: 'Essentiel' },
  { value: 'recommande', label: 'Recommandé' },
  { value: 'optionnel', label: 'Optionnel' },
  { value: 'pour-fan', label: 'Pour fan' },
]

const typeOptions: { value: WorkType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'film', label: 'Films' },
  { value: 'serie-live', label: 'Séries live' },
  { value: 'serie-animee', label: 'Séries animées' },
]

const eraOrder: EraId[] = [
  'dawn-of-the-jedi', 'old-republic', 'high-republic',
  'fall-of-the-jedi', 'reign-of-the-empire', 'age-of-rebellion',
  'new-republic', 'rise-of-the-first-order', 'new-jedi-order',
]

export default function Timeline() {
  const [searchParams] = useSearchParams()
  const initialEra = searchParams.get('era') as EraId | null

  const [selectedEra, setSelectedEra]             = useState<EraId | 'all'>(initialEra ?? 'all')
  const [selectedType, setSelectedType]           = useState<WorkType | 'all'>('all')
  const [selectedImportance, setSelectedImportance] = useState<Importance | 'all'>('all')

  const filtered = useMemo(() => {
    return allWorks.filter(w => {
      if (selectedEra !== 'all' && w.era !== selectedEra) return false
      if (selectedType !== 'all' && w.type !== selectedType) return false
      if (selectedImportance !== 'all' && w.importance !== selectedImportance) return false
      return true
    })
  }, [selectedEra, selectedType, selectedImportance])

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {}
    for (const work of filtered) {
      if (!groups[work.era]) groups[work.era] = []
      groups[work.era].push(work)
    }
    return groups
  }, [filtered])

  const eraMap = Object.fromEntries(eras.map(e => [e.id, e]))

  return (
    <main className="ag-page-wide">
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="ag-eyebrow">Films &amp; Séries</p>
        <h1 className="ag-page-title">Chronologie</h1>
        <p className="ag-lead">
          Films et séries placés dans l'ordre de l'univers. Les jeux vidéo ont leur propre section.
        </p>
      </div>

      <div className="ag-filters ag-filters--column">
        <div className="ag-filter-group">
          <span className="ag-filter-label">Ère</span>
          <FilterBtn active={selectedEra === 'all'} onClick={() => setSelectedEra('all')}>Toutes</FilterBtn>
          {eras.map(era => (
            <FilterBtn key={era.id} active={selectedEra === era.id} onClick={() => setSelectedEra(era.id)}>
              {era.name}
            </FilterBtn>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="ag-filter-group">
            <span className="ag-filter-label">Type</span>
            {typeOptions.map(opt => (
              <FilterBtn key={opt.value} active={selectedType === opt.value} onClick={() => setSelectedType(opt.value)}>
                {opt.label}
              </FilterBtn>
            ))}
          </div>
          <div className="ag-filter-group">
            <span className="ag-filter-label">Importance</span>
            {importanceOptions.map(opt => (
              <FilterBtn key={opt.value} active={selectedImportance === opt.value} onClick={() => setSelectedImportance(opt.value)}>
                {opt.label}
              </FilterBtn>
            ))}
          </div>
        </div>
      </div>

      <p className="ag-meta" style={{ marginBottom: '2rem' }}>
        {filtered.length} œuvre{filtered.length > 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <p className="ag-meta" style={{ textAlign: 'center', padding: '4rem 0' }}>
          Aucun résultat pour ces filtres.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {eraOrder.map(eraId => {
            const works = grouped[eraId]
            if (!works || works.length === 0) return null
            const era = eraMap[eraId]

            return (
              <section key={eraId}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  {era?.image && (
                    <img
                      src={era.image}
                      alt=""
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', opacity: 0.8 }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
                      {era?.name ?? eraId}
                    </h2>
                    <p className="ag-meta" style={{ color: 'var(--color-accent-blue)', margin: 0 }}>
                      {era?.period}
                    </p>
                  </div>
                </div>
                <div className="ag-grid-media--sm">
                  {works.map(work => <MediaCard key={work.id} work={work} />)}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}
