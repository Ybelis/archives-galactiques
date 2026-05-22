import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="ag-footer">
      <div className="ag-footer-inner">
        <div className="ag-footer-links">
          {[
            { to: '/timeline', label: 'Chronologie' },
            { to: '/films', label: 'Films' },
            { to: '/series', label: 'Séries' },
            { to: '/eras', label: 'Les ères' },
            { to: '/watch-paths', label: 'Parcours' },
            { to: '/databank', label: 'Databank' },
            { to: '/legal', label: 'Mentions légales' },
          ].map(link => (
            <Link key={link.to} to={link.to} className="ag-footer-link">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="ag-footer-copy">
          Site non officiel. Star Wars est une marque déposée de Lucasfilm Ltd. / Disney.<br />
          Fait par un fan, pour les futurs fans.
        </p>
      </div>
    </footer>
  )
}
