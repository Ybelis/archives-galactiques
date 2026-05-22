import { Link } from 'react-router-dom'
import { paths } from '../data'

const investmentColor: Record<string, string> = {
  'léger': '#34d399',
  'modéré': '#fde68a',
  'complet': '#a78bfa',
}

const entryPoints = [
  {
    id: 'premiere-fois',
    label: 'Je découvre Star Wars',
    desc: 'Par où commencer sans prérequis.',
    to: '/watch-paths#premiere-fois',
    color: '#34d399',
  },
  {
    id: 'reprise',
    label: 'Je reprends après des années',
    desc: 'Les essentiels sans tout revoir.',
    to: '/watch-paths#reprise-rapide',
    color: '#fde68a',
  },
  {
    id: 'lore',
    label: 'Je veux explorer le lore',
    desc: 'Séries, ères, personnages — tout.',
    to: '/watch-paths#plonger-dans-le-lore',
    color: '#a78bfa',
  },
]

const quickLinks = [
  { to: '/timeline', label: 'Chronologie', count: "Films & séries dans l'ordre" },
  { to: '/films', label: 'Films', count: '12 films' },
  { to: '/series', label: 'Séries', count: 'Live-action et animées' },
  { to: '/eras', label: 'Les ères', count: "De Dawn of the Jedi à aujourd'hui" },
  { to: '/databank', label: 'Databank', count: 'Personnages, lieux, concepts' },
]

export default function Home() {
  const featuredPaths = paths.slice(0, 3)

  return (
    <main>
      {/* ── HERO ── */}
      <section className="home-hero stars-bg">
        <div className="home-hero-inner">
          <p className="ag-fade-up home-hero-eyebrow">Archives Galactiques</p>

          <h1 className="ag-fade-up ag-d1 home-hero-title">
            Star Wars peut vite<br />
            avoir l'air immense.
          </h1>

          <p className="ag-fade-up ag-d2 home-hero-lead">
            Ce guide est là pour t'aider à trouver par où entrer, quoi regarder, et comment t'y retrouver sans devoir tout connaître d'avance.
          </p>

          <div className="ag-fade-up ag-d3 home-entry-list">
            {entryPoints.map((entry) => (
              <Link
                key={entry.id}
                to={entry.to}
                className="home-entry"
                style={{ '--entry-color': entry.color } as React.CSSProperties}
              >
                <span className="home-entry-dot" />
                <div>
                  <p className="home-entry-label">{entry.label}</p>
                  <p className="home-entry-desc">{entry.desc}</p>
                </div>
                <span className="home-entry-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <nav className="home-quicknav">
        <div className="home-quicknav-inner">
          {quickLinks.map(item => (
            <Link key={item.to} to={item.to} className="home-quicknav-link">
              <div className="home-quicknav-label">{item.label}</div>
              <div className="home-quicknav-sub">{item.count}</div>
            </Link>
          ))}
        </div>
      </nav>

      {/* ── POURQUOI STAR WARS ── */}
      <section className="home-why-section">
        <div className="home-why-inner">
          <h2 className="home-why-title">Pourquoi Star Wars ?</h2>
          <div className="home-why-text-col">
            <p className="home-why-para">
              Tu n'as pas besoin de tout regarder. Il faut surtout savoir quoi regarder selon ce que tu cherches.
            </p>
            <p className="home-why-para">
              Certains viennent pour les sabres laser. D'autres restent pour Anakin, la musique de John Williams, la politique de la République, les Mandaloriens ou les planètes perdues au fond de la Bordure Extérieure. Star Wars est assez grand pour tous ces profils.
            </p>
            <p className="home-why-para">
              Ce n'est pas une saga de science-fiction générique. C'est une histoire sur la chute d'un homme, la rédemption par son fils, et ce que coûte vraiment résister à un empire. La trilogie originale tient parfaitement seule. Mais si tu t'accroches à une série, à un personnage, à une ère — le reste vient naturellement.
            </p>
          </div>
        </div>
      </section>

      {/* ── PARCOURS DE VISIONNAGE ── */}
      <section className="home-paths-section">
        <div className="home-paths-inner">
          <div className="home-paths-header">
            <div>
              <h2 className="home-paths-title">Parcours de visionnage</h2>
              <p className="home-paths-sub">Selon ton profil, ton temps, et ce que tu veux en tirer.</p>
            </div>
            <Link to="/watch-paths" className="ag-see-more">Tous les parcours →</Link>
          </div>

          <div>
            {featuredPaths.map((path, i) => {
              const color = investmentColor[path.investment]
              return (
                <Link
                  key={path.id}
                  to={`/watch-paths#${path.id}`}
                  className="home-path-row"
                  style={{ '--path-color': color, '--path-bg': `${color}18` } as React.CSSProperties}
                >
                  <span className="home-path-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="home-path-info">
                    <div className="home-path-header">
                      <h3 className="home-path-title">{path.title}</h3>
                      <span className="home-path-invest">{path.investment}</span>
                      <span className="home-path-time">{path.estimatedTime}</span>
                    </div>
                    <p className="home-path-desc">{path.description}</p>
                  </div>
                  <span className="home-path-arrow">→</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── GALAXY MAP TEASER ── */}
      <section className="home-teaser-section">
        <div className="home-teaser-inner">
          <div>
            <p className="home-teaser-eyebrow">Bientôt</p>
            <h2 className="home-teaser-title">Carte galactique interactive</h2>
            <p className="home-teaser-desc">
              Une carte 4K de la galaxie avec les planètes, les régions et les affiliations. Chaque lieu lié à ses œuvres.
            </p>
          </div>
          <Link to="/galaxy-map" className="home-teaser-btn">Aperçu →</Link>
        </div>
      </section>
    </main>
  )
}
