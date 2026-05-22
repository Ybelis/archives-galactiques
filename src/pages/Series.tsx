import { useState, useMemo } from 'react'
import { series } from '../data'
import type { Importance, WorkType } from '../types'
import MediaCard from '../components/ui/MediaCard'

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

  const live = filtered.filter(s => s.type === 'serie-live')
  const animated = filtered.filter(s => s.type === 'serie-animee')

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem' }}>
          Streaming
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
          Les Séries
        </h1>
        <p style={{ color: 'var(--color-muted)', margin: 0, maxWidth: '560px', lineHeight: 1.6 }}>
          Live-action et animation. Certaines sont essentielles, d'autres sont du bonus — les filtres sont là pour vous guider.
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
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Type
          </span>
          {(['all', 'serie-live', 'serie-animee'] as const).map(t => (
            <FilterBtn key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>
              {t === 'all' ? 'Toutes' : t === 'serie-live' ? 'Live-action' : 'Animées'}
            </FilterBtn>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Importance
          </span>
          {(['all', 'essentiel', 'recommande', 'optionnel', 'pour-fan'] as const).map(imp => (
            <FilterBtn key={imp} active={importanceFilter === imp} onClick={() => setImportanceFilter(imp)}>
              {imp === 'all' ? 'Toutes' : imp === 'essentiel' ? 'Essentiel' : imp === 'recommande' ? 'Recommandé' : imp === 'optionnel' ? 'Optionnel' : 'Pour fan'}
            </FilterBtn>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--color-muted)', textAlign: 'center', padding: '4rem 0' }}>
          Aucun résultat pour ces filtres.
        </p>
      )}

      {/* Live-action */}
      {live.length > 0 && (typeFilter === 'all' || typeFilter === 'serie-live') && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 1.25rem',
            paddingBottom: '0.6rem',
            borderBottom: '1px solid var(--color-border)',
          }}>
            Live-action <span style={{ color: 'var(--color-muted)', fontWeight: 400, fontSize: '1rem' }}>({live.length})</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {live.map(s => <MediaCard key={s.id} work={s} />)}
          </div>
        </section>
      )}

      {/* Animated */}
      {animated.length > 0 && (typeFilter === 'all' || typeFilter === 'serie-animee') && (
        <section>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 1.25rem',
            paddingBottom: '0.6rem',
            borderBottom: '1px solid var(--color-border)',
          }}>
            Séries animées <span style={{ color: 'var(--color-muted)', fontWeight: 400, fontSize: '1rem' }}>({animated.length})</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {animated.map(s => <MediaCard key={s.id} work={s} />)}
          </div>
        </section>
      )}
    </main>
  )
}
