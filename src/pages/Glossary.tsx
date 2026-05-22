import { useState, useMemo } from 'react'
import { glossaryEntries } from '../data'
import type { GlossaryEntry } from '../types'

const categories: { value: GlossaryEntry['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'chronologie', label: 'Chronologie' },
  { value: 'faction', label: 'Factions' },
  { value: 'concept', label: 'Concepts' },
  { value: 'personnage', label: 'Personnages' },
  { value: 'lieu', label: 'Lieux' },
]

const categoryColor: Record<GlossaryEntry['category'], string> = {
  'chronologie': '#fde68a',
  'faction': '#4fc3f7',
  'concept': '#a78bfa',
  'personnage': '#34d399',
  'lieu': '#f472b6',
}

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

export default function Glossary() {
  const [categoryFilter, setCategoryFilter] = useState<GlossaryEntry['category'] | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return glossaryEntries.filter(e => {
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false
      if (search && !e.term.toLowerCase().includes(search.toLowerCase()) && !e.definition.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [categoryFilter, search])

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem' }}>
          Référence
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
          Lexique
        </h1>
        <p style={{ color: 'var(--color-muted)', margin: 0, maxWidth: '560px', lineHeight: 1.6 }}>
          BBY, ABY, Canon, Legends, Jedi, Sith... Les termes essentiels pour comprendre l'univers sans chercher sur Wookieepedia.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <FilterBtn key={cat.value} active={categoryFilter === cat.value} onClick={() => setCategoryFilter(cat.value)}>
              {cat.label}
            </FilterBtn>
          ))}
        </div>
        <input
          type="text"
          placeholder="Rechercher un terme..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '0.6rem 1rem',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            outline: 'none',
            width: '100%',
            maxWidth: '360px',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(79,195,247,0.4)' }}
          onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
        />
      </div>

      {/* Count */}
      <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        {filtered.length} terme{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Entries */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-muted)', textAlign: 'center', padding: '4rem 0' }}>
          Aucun terme trouvé.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(entry => (
            <article
              key={entry.id}
              id={entry.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '1.25rem',
                borderLeft: `3px solid ${categoryColor[entry.category]}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  margin: 0,
                }}>
                  {entry.term}
                </h2>
                <span style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: categoryColor[entry.category],
                  background: `${categoryColor[entry.category]}15`,
                  padding: '2px 7px',
                  borderRadius: '3px',
                }}>
                  {categories.find(c => c.value === entry.category)?.label ?? entry.category}
                </span>
              </div>
              <p style={{ color: 'var(--color-muted)', margin: 0, lineHeight: 1.7, fontSize: '0.9rem' }}>
                {entry.definition}
              </p>
              {entry.related && entry.related.length > 0 && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(139,155,180,0.5)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Voir aussi :
                  </span>
                  {entry.related.map(rel => {
                    const target = glossaryEntries.find(e => e.id === rel)
                    return target ? (
                      <a
                        key={rel}
                        href={`#${rel}`}
                        onClick={e => {
                          e.preventDefault()
                          document.getElementById(rel)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }}
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-accent-blue)',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-heading)',
                        }}
                      >
                        {target.term}
                      </a>
                    ) : null
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
