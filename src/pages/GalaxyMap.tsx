export default function GalaxyMap() {
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    left: `${(i * 37 + 7) % 100}%`,
    top: `${(i * 53 + 13) % 100}%`,
    size: i % 5 === 0 ? '2px' : '1px',
    opacity: 0.2 + (i % 3) * 0.15,
  }))

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '6rem 1.5rem 6rem' }}>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.7rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--color-accent-blue)',
        margin: '0 0 1.5rem',
        opacity: 0.7,
      }}>
        En développement
      </p>

      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        color: 'var(--color-text)',
        margin: '0 0 1.5rem',
        lineHeight: 1.1,
      }}>
        Carte galactique<br />interactive
      </h1>

      <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', lineHeight: 1.8, margin: '0 0 1rem', maxWidth: '520px' }}>
        Une carte navigable de la galaxie. Les planètes, les régions, les affiliations politiques selon les ères. Chaque lieu lié à ses œuvres et aux personnages qui y ont vécu.
      </p>
      <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', lineHeight: 1.8, margin: '0 0 3rem', maxWidth: '520px' }}>
        Tatooine, Coruscant, Mandalore, Exegol, Dagobah — et des centaines d'autres.
      </p>

      {/* Preview area */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,195,247,0.05) 0%, transparent 70%)',
        }} />

        {stars.map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'var(--color-muted)',
            opacity: s.opacity,
            left: s.left,
            top: s.top,
          }} />
        ))}

        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '1px solid rgba(79,195,247,0.2)',
            background: 'rgba(79,195,247,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(79,195,247,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            margin: 0,
            opacity: 0.55,
          }}>
            Bientôt disponible
          </p>
        </div>
      </div>

      {/* Features list */}
      <div style={{
        marginTop: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {[
          { label: 'Carte 4K navigable', desc: 'Zoom, panoramique, recherche par nom de planète' },
          { label: 'Filtres par ère', desc: 'Voir les allégeances politiques au fil du temps' },
          { label: 'Liens vers les œuvres', desc: 'Chaque planète connectée à ses films et séries' },
        ].map(feat => (
          <div
            key={feat.label}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '1rem 1.1rem',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              margin: '0 0 0.3rem',
              letterSpacing: '0.02em',
            }}>
              {feat.label}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.55 }}>
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
