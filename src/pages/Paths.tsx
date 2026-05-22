import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { paths, films, series } from '../data'
import type { Work } from '../types'
import { RequiredBadge, TypeBadge, ImportanceBadge } from '../components/ui/Badge'

const allWorks: Record<string, Work> = Object.fromEntries(
  [...films, ...series].map(w => [w.id, w])
)

const investmentColor: Record<string, string> = {
  'léger': '#34d399',
  'modéré': '#fde68a',
  'complet': '#a78bfa',
}

export default function Paths() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [location])

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem' }}>
          Par où commencer
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
          Parcours recommandés
        </h1>
        <p style={{ color: 'var(--color-muted)', margin: 0, maxWidth: '560px', lineHeight: 1.6 }}>
          Des sélections pensées selon votre profil. Pas juste une chronologie — un vrai conseil de visionnage.
        </p>
      </div>

      {/* Path index */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '1.25rem',
        marginBottom: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-muted)', margin: '0 0 0.5rem' }}>
          Sommaire
        </p>
        {paths.map(path => (
          <a
            key={path.id}
            href={`#${path.id}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.35rem 0' }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(path.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <span style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: investmentColor[path.investment],
              background: `${investmentColor[path.investment]}18`,
              padding: '1px 7px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
            }}>
              {path.investment}
            </span>
            <span style={{ color: 'var(--color-text)', fontSize: '0.9rem', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              {path.title}
            </span>
          </a>
        ))}
      </div>

      {/* Paths */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {paths.map(path => (
          <section
            key={path.id}
            id={path.id}
            style={{ scrollMarginTop: '80px' }}
          >
            {/* Path header */}
            <div style={{
              borderLeft: `3px solid ${investmentColor[path.investment]}`,
              paddingLeft: '1.25rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  margin: 0,
                }}>
                  {path.title}
                </h2>
                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: investmentColor[path.investment],
                  background: `${investmentColor[path.investment]}18`,
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}>
                  {path.investment}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: investmentColor[path.investment], margin: '0 0 0.5rem', opacity: 0.8 }}>
                Pour : {path.profile}
              </p>
              <p style={{ color: 'var(--color-muted)', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
                {path.description}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
                {path.why}
              </p>
            </div>

            {/* Works list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {path.items.map((item, i) => {
                const work = allWorks[item.workId]
                if (!work) return null

                return (
                  <div
                    key={item.workId}
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Step number */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: `1px solid ${investmentColor[path.investment]}40`,
                      background: `${investmentColor[path.investment]}10`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: investmentColor[path.investment],
                    }}>
                      {i + 1}
                    </div>

                    {/* Thumbnail */}
                    <div style={{ width: '36px', height: '54px', flexShrink: 0, borderRadius: '3px', overflow: 'hidden', background: 'var(--color-surface-elevated)' }}>
                      <img
                        src={work.thumbnail}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                        <h3 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--color-text)',
                          margin: 0,
                        }}>
                          {work.title}
                        </h3>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <TypeBadge value={work.type} />
                          <ImportanceBadge value={work.importance} />
                          <RequiredBadge value={item.required} />
                        </div>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: '0 0 0.3rem' }}>
                        {work.period}
                        {work.seasons ? ` · ${work.seasons} saison${work.seasons > 1 ? 's' : ''}` : ''}
                        {work.duration ? ` · ${work.duration} min` : ''}
                      </p>
                      {item.note && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic' }}>
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
