import { useState, useMemo } from 'react'
import { films } from '../data'
import type { Importance } from '../types'
import MediaCard from '../components/ui/MediaCard'
import { ImportanceBadge } from '../components/ui/Badge'

const importanceOptions: { value: Importance | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'essentiel', label: 'Essentiel' },
  { value: 'recommande', label: 'Recommandé' },
  { value: 'optionnel', label: 'Optionnel' },
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
      }}
    >
      {children}
    </button>
  )
}

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
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem' }}>
          Cinéma
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
          Les Films
        </h1>
        <p style={{ color: 'var(--color-muted)', margin: 0, maxWidth: '540px', lineHeight: 1.6 }}>
          {films.length} films. Des classiques de 1977 aux productions Disney. Triés dans l'ordre de l'univers par défaut.
        </p>
      </div>

      {/* Filters & view toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {importanceOptions.map(opt => (
            <FilterBtn key={opt.value} active={filter === opt.value} onClick={() => setFilter(opt.value)}>
              {opt.label}
            </FilterBtn>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <FilterBtn active={view === 'universe'} onClick={() => setView('universe')}>Ordre univers</FilterBtn>
          <FilterBtn active={view === 'importance'} onClick={() => setView('importance')}>Conseil de visionnage</FilterBtn>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {(['essentiel', 'recommande', 'optionnel'] as Importance[]).map(imp => (
          <div key={imp} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ImportanceBadge value={imp} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(film => (
          <MediaCard key={film.id} work={film} />
        ))}
      </div>
    </main>
  )
}
