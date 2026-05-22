import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { films, series, games, eras, paths, glossaryEntries } from '../../data'

interface SearchResult {
  id: string
  title: string
  subtitle: string
  category: string
  href: string
}

const categoryColor: Record<string, string> = {
  'Films': '#4fc3f7',
  'Séries': '#a78bfa',
  'Jeux': '#fb923c',
  'Ères': '#fde68a',
  'Lexique': '#34d399',
  'Parcours': '#60a5fa',
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = []

  films.forEach(f => results.push({
    id: `film-${f.id}`,
    title: f.title,
    subtitle: f.period,
    category: 'Films',
    href: `/films/${f.id}`,
  }))

  series.forEach(s => results.push({
    id: `serie-${s.id}`,
    title: s.title,
    subtitle: s.seasons ? `${s.seasons} saison${s.seasons > 1 ? 's' : ''}` : '',
    category: 'Séries',
    href: `/series/${s.id}`,
  }))

  games.forEach(g => results.push({
    id: `game-${g.id}`,
    title: g.title,
    subtitle: g.period,
    category: 'Jeux',
    href: `/games/${g.id}`,
  }))

  eras.forEach(e => results.push({
    id: `era-${e.id}`,
    title: e.name,
    subtitle: e.period,
    category: 'Ères',
    href: `/eras/${e.id}`,
  }))

  glossaryEntries.forEach(g => results.push({
    id: `gloss-${g.id}`,
    title: g.term,
    subtitle: g.category,
    category: 'Lexique',
    href: '/databank',
  }))

  paths.forEach(p => results.push({
    id: `path-${p.id}`,
    title: p.title,
    subtitle: p.investment,
    category: 'Parcours',
    href: `/watch-paths#${p.id}`,
  }))

  return results
}

const index = buildIndex()

function search(query: string): SearchResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()
  const words = q.split(/\s+/)

  return index.filter(item => {
    const haystack = `${item.title} ${item.subtitle} ${item.category}`.toLowerCase()
    return words.every(w => haystack.includes(w))
  }).slice(0, 12)
}

interface Props {
  onClose: () => void
}

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const results = search(query)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const go = (href: string) => {
    navigate(href)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => {
        const next = Math.min(i + 1, results.length - 1)
        listRef.current?.children[next]?.scrollIntoView({ block: 'nearest' })
        return next
      })
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => {
        const prev = Math.max(i - 1, 0)
        listRef.current?.children[prev]?.scrollIntoView({ block: 'nearest' })
        return prev
      })
    }
    if (e.key === 'Enter' && results[selectedIndex]) {
      go(results[selectedIndex].href)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(3rem, 12vh, 7rem)',
        padding: 'clamp(3rem, 12vh, 7rem) 1rem 1rem',
        background: 'rgba(7, 11, 19, 0.85)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          background: 'var(--color-surface)',
          border: '1px solid rgba(148,197,255,0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
          animation: 'search-in 0.12s ease',
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.9rem 1.1rem',
          borderBottom: results.length > 0 ? '1px solid var(--color-border)' : 'none',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.45 }}>
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Chercher un film, personnage, terme..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-text)',
              lineHeight: 1.5,
            }}
          />
          <kbd style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
            color: 'var(--color-muted)',
            background: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '2px 6px',
            flexShrink: 0,
          }}>
            Esc
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div ref={listRef} style={{ overflowY: 'auto', maxHeight: '380px' }}>
            {results.map((result, i) => (
              <button
                key={result.id}
                onClick={() => go(result.href)}
                style={{
                  width: '100%',
                  background: i === selectedIndex ? 'var(--color-surface-elevated)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0.7rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: categoryColor[result.category] ?? 'var(--color-muted)',
                  background: `${categoryColor[result.category] ?? 'var(--color-muted)'}18`,
                  padding: '1px 6px',
                  borderRadius: '3px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  minWidth: '52px',
                  textAlign: 'center',
                }}>
                  {result.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {result.title}
                </span>
                {result.subtitle && (
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-muted)',
                    flexShrink: 0,
                  }}>
                    {result.subtitle}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.trim() && results.length === 0 && (
          <div style={{ padding: '2rem 1.1rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', margin: 0 }}>
              Aucun résultat pour <em>"{query}"</em>
            </p>
          </div>
        )}

        {/* Hint when empty */}
        {!query.trim() && (
          <div style={{ padding: '1.25rem 1.1rem' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', margin: '0 0 0.75rem', opacity: 0.6 }}>
              Suggestions
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Andor', 'Anakin', 'Clone Wars', 'BBY', 'Mandalorien', 'Jedi'].map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.75rem',
                    background: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    color: 'var(--color-muted)',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
