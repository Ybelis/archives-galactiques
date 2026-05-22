import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { films, series, eras } from '../data'
import type { EraId, Importance, WorkType } from '../types'
import MediaCard from '../components/ui/MediaCard'

const allWorks = [...films, ...series].sort((a, b) => {
  const eraOrder: Record<EraId, number> = {
    'dawn-of-the-jedi': 0,
    'old-republic': 1,
    'high-republic': 2,
    'fall-of-the-jedi': 3,
    'reign-of-the-empire': 4,
    'age-of-rebellion': 5,
    'new-republic': 6,
    'rise-of-the-first-order': 7,
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

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.35rem 0.9rem',
        borderRadius: '4px',
        border: active ? '1px solid rgba(79,195,247,0.4)' : '1px solid rgba(148,197,255,0.15)',
        background: active ? 'rgba(79,195,247,0.1)' : 'transparent',
        color: active ? 'var(--color-accent-blue)' : 'var(--color-muted)',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

export default function Timeline() {
  const [searchParams] = useSearchParams()
  const initialEra = searchParams.get('era') as EraId | null

  const [selectedEra, setSelectedEra] = useState<EraId | 'all'>(initialEra ?? 'all')
  const [selectedType, setSelectedType] = useState<WorkType | 'all'>('all')
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

  const eraOrder: EraId[] = [
    'dawn-of-the-jedi', 'old-republic', 'high-republic',
    'fall-of-the-jedi', 'reign-of-the-empire', 'age-of-rebellion',
    'new-republic', 'rise-of-the-first-order',
  ]

  const eraMap = Object.fromEntries(eras.map(e => [e.id, e]))

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem' }}>
          Films & Séries
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
          Chronologie
        </h1>
        <p style={{ color: 'var(--color-muted)', margin: 0, maxWidth: '560px', lineHeight: 1.6 }}>
          Films et séries placés dans l'ordre de l'univers. Les jeux vidéo et les romans ont leurs propres sections.
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {/* Era filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '0.25rem' }}>
            Ère
          </span>
          <FilterBtn active={selectedEra === 'all'} onClick={() => setSelectedEra('all')}>Toutes</FilterBtn>
          {eras.map(era => (
            <FilterBtn key={era.id} active={selectedEra === era.id} onClick={() => setSelectedEra(era.id)}>
              {era.name}
            </FilterBtn>
          ))}
        </div>

        {/* Type + Importance filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '0.25rem' }}>
              Type
            </span>
            {typeOptions.map(opt => (
              <FilterBtn key={opt.value} active={selectedType === opt.value} onClick={() => setSelectedType(opt.value)}>
                {opt.label}
              </FilterBtn>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '0.25rem' }}>
              Importance
            </span>
            {importanceOptions.map(opt => (
              <FilterBtn key={opt.value} active={selectedImportance === opt.value} onClick={() => setSelectedImportance(opt.value)}>
                {opt.label}
              </FilterBtn>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '2rem' }}>
        {filtered.length} œuvre{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Grouped by era */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-muted)', textAlign: 'center', padding: '4rem 0' }}>
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
                {/* Era header */}
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
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-accent-blue)', margin: 0 }}>
                      {era?.period}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                  {works.map(work => (
                    <MediaCard key={work.id} work={work} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}
