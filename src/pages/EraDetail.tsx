import { useParams, Link } from 'react-router-dom'
import { eras, films, series } from '../data'
import MediaCard from '../components/ui/MediaCard'

export default function EraDetail() {
  const { slug: eraId } = useParams<{ slug: string }>()
  const era = eras.find(e => e.id === eraId)

  if (!era) {
    return (
      <main className="ag-page" style={{ textAlign: 'center' }}>
        <p className="ag-meta">Ère introuvable.</p>
        <Link to="/eras" className="ag-back-link">Retour à l'accueil</Link>
      </main>
    )
  }

  const eraIndex = eras.findIndex(e => e.id === eraId)
  const prevEra = eraIndex > 0 ? eras[eraIndex - 1] : null
  const nextEra = eraIndex < eras.length - 1 ? eras[eraIndex + 1] : null

  const works = [...films, ...series].filter(w => w.era === eraId)
  const essential = works.filter(w => w.importance === 'essentiel')
  const recommended = works.filter(w => w.importance === 'recommande')
  const optional = works.filter(w => w.importance === 'optionnel' || w.importance === 'pour-fan')

  return (
    <main className="ag-page">
      <Link to="/eras" className="ag-back-link">← Les ères</Link>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '3rem' }}>
        <div style={{
          width: '72px', height: '72px', flexShrink: 0,
          borderRadius: '10px', background: 'var(--color-surface)',
          border: '1px solid var(--color-border)', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={era.image} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
          />
        </div>
        <div>
          <p className="ag-eyebrow">{era.period}</p>
          <h1 className="ag-page-title">{era.name}</h1>
          <p className="ag-lead">{era.shortDescription}</p>
        </div>
      </div>

      {works.length === 0 && (
        <p style={{ color: 'var(--color-muted)', fontStyle: 'italic' }}>
          Aucune œuvre répertoriée pour cette ère.
        </p>
      )}

      {essential.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="ag-section-label">Essentiel</h2>
          <div className="ag-grid-media">
            {essential.map(w => <MediaCard key={w.id} work={w} />)}
          </div>
        </section>
      )}

      {recommended.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="ag-section-label">Recommandé</h2>
          <div className="ag-grid-media">
            {recommended.map(w => <MediaCard key={w.id} work={w} />)}
          </div>
        </section>
      )}

      {optional.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="ag-section-label">Pour aller plus loin</h2>
          <div className="ag-grid-media">
            {optional.map(w => <MediaCard key={w.id} work={w} />)}
          </div>
        </section>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '2rem', marginTop: '1rem', gap: '1rem' }}>
        {prevEra ? (
          <Link to={`/eras/${prevEra.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="ag-meta">←</span>
            <div>
              <p className="ag-field-label" style={{ marginBottom: '0.2rem' }}>Ère précédente</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>{prevEra.name}</p>
            </div>
          </Link>
        ) : <span />}
        {nextEra ? (
          <Link to={`/eras/${nextEra.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'right' }}>
            <div>
              <p className="ag-field-label" style={{ marginBottom: '0.2rem' }}>Ère suivante</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>{nextEra.name}</p>
            </div>
            <span className="ag-meta">→</span>
          </Link>
        ) : <span />}
      </div>
    </main>
  )
}
