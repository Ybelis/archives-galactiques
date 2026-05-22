import { Link } from 'react-router-dom'
import { eras, paths } from '../data'
import EraCard from '../components/ui/EraCard'
import PathCard from '../components/ui/PathCard'

const entryPoints = [
  {
    id: 'decouverte',
    icon: '✦',
    title: 'Je découvre Star Wars',
    description: "Jamais vu un film, ou presque. Vous voulez savoir par où commencer sans vous perdre.",
    to: '/parcours#decouverte',
    color: '#34d399',
  },
  {
    id: 'reprise',
    icon: '◈',
    title: 'Je reprends l\'univers',
    description: "Vous avez vu les films il y a longtemps. Vous voulez vous remettre à niveau sans regarder 200 heures de contenu.",
    to: '/parcours#reprise-rapide',
    color: '#4fc3f7',
  },
  {
    id: 'approfondissement',
    icon: '⬡',
    title: 'Je veux aller plus loin',
    description: "Vous connaissez les bases. Vous voulez explorer les séries, le lore, les personnages secondaires.",
    to: '/parcours#lore-profond',
    color: '#a78bfa',
  },
]

export default function Home() {
  const featuredPaths = paths.slice(0, 3)
  const visibleEras = eras.filter(e => e.id !== 'dawn-of-the-jedi' && e.id !== 'old-republic')

  return (
    <main>
      {/* Hero */}
      <section
        className="stars-bg"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 1.5rem 4rem',
          textAlign: 'center',
          position: 'relative',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,195,247,0.06) 0%, transparent 70%), var(--color-space)',
        }}
      >
        <div style={{ maxWidth: '760px' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-blue)',
            margin: '0 0 1.5rem',
          }}>
            Un guide par un fan, pour les futurs fans
          </p>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            color: 'var(--color-text)',
            margin: '0 0 1.5rem',
            letterSpacing: '0.02em',
          }}>
            Une galaxie très,<br />
            <span style={{ color: 'var(--color-accent-blue)' }}>très lointaine.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--color-muted)',
            lineHeight: 1.7,
            margin: '0 0 3rem',
            fontWeight: 300,
          }}>
            Star Wars, ce n'est pas juste des sabres laser et des vaisseaux.
            C'est une tragédie familiale. Une révolte contre l'oppression.
            Des mythes, des chutes, des rédemptions. Et une galaxie entière à explorer.
          </p>

          {/* Entry points */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'left' }}>
            {entryPoints.map(entry => (
              <Link
                key={entry.id}
                to={entry.to}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card-glow"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    height: '100%',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '1.2rem', color: entry.color, display: 'block', marginBottom: '0.6rem' }}>
                    {entry.icon}
                  </span>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.5rem',
                  }}>
                    {entry.title}
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                    {entry.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          opacity: 0.4,
        }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
            Explorer
          </span>
          <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, var(--color-muted), transparent)' }} />
        </div>
      </section>

      {/* "Star Wars, c'est quoi ?" */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--color-accent-blue)',
          marginBottom: '1rem',
        }}>
          Pourquoi Star Wars
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 2rem',
          lineHeight: 1.1,
        }}>
          Plus qu'une saga.<br />Un univers à part entière.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            "Il y a des gens qui n'ont jamais accroché à Star Wars. Souvent parce qu'ils ont regardé les films dans le mauvais ordre, ou qu'on leur a vendu l'idée que c'était juste pour les enfants.",
            "En réalité, Star Wars parle de pouvoir et de corruption. De familles brisées. De l'individu face à des systèmes qui le dépassent. C'est de la politique galactique, des tragédies grecques revisitées, et parfois un western dans l'espace.",
            "Ce site n'est pas une encyclopédie. C'est un guide pensé pour vous aider à trouver votre entrée dans cet univers — selon ce que vous avez déjà vu, ce que vous aimez, et le temps que vous voulez y consacrer.",
          ].map((para, i) => (
            <p key={i} style={{
              fontSize: '1rem',
              color: i === 0 ? 'var(--color-muted)' : 'var(--color-text)',
              lineHeight: 1.75,
              margin: 0,
              opacity: i === 0 ? 0.8 : 1,
            }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Quick nav */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { to: '/chronologie', label: 'Chronologie', desc: 'Films & séries dans l\'ordre' },
            { to: '/films', label: 'Films', desc: '11 films, 1 point d\'entrée' },
            { to: '/series', label: 'Séries', desc: 'Animées, live-action, courts' },
            { to: '/parcours', label: 'Parcours', desc: 'Par profil de spectateur' },
            { to: '/lexique', label: 'Lexique', desc: 'BBY, ABY, Canon, Sith...' },
          ].map(item => (
            <Link key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '6px',
                border: '1px solid rgba(148,197,255,0.1)',
                background: 'var(--color-surface-elevated)',
                textAlign: 'center',
                transition: 'border-color 0.2s ease',
                minWidth: '140px',
              }}
                className="card-glow"
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: '2px' }}>
                  {item.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Les grandes ères */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem' }}>
              L'univers
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
              Les grandes ères
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
            {visibleEras.map(era => (
              <EraCard key={era.id} era={era} />
            ))}
          </div>
        </div>
      </section>

      {/* Parcours recommandés */}
      <section style={{ padding: '0 0 5rem', background: 'linear-gradient(to bottom, transparent, rgba(13,20,36,0.5))' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', margin: '0 0 0.5rem' }}>
                Par où commencer
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                Parcours recommandés
              </h2>
            </div>
            <Link to="/parcours" style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              color: 'var(--color-accent-blue)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}>
              Tous les parcours →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {featuredPaths.map(path => (
              <PathCard key={path.id} path={path} featured />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
