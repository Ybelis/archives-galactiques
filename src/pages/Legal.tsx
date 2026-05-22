import { Link } from 'react-router-dom'

const pageStyle = {
  maxWidth: '760px',
  margin: '0 auto',
  padding: '6rem 1.5rem 5rem',
} as const

const backLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontFamily: 'var(--font-heading)',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  textDecoration: 'none',
  marginBottom: '2.5rem',
} as const

const titleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
  fontWeight: 700,
  color: 'var(--color-text)',
  margin: '0 0 1rem',
} as const

const introStyle = {
  color: 'var(--color-muted)',
  lineHeight: 1.7,
  margin: '0 0 2.75rem',
  fontSize: '0.98rem',
} as const

const sectionTitleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.78rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  margin: '0 0 0.75rem',
} as const

const paragraphStyle = {
  color: 'var(--color-text)',
  lineHeight: 1.75,
  margin: 0,
  fontSize: '0.95rem',
} as const

const listStyle = {
  color: 'var(--color-text)',
  lineHeight: 1.75,
  margin: 0,
  paddingLeft: '1.2rem',
  fontSize: '0.95rem',
} as const

export default function Legal() {
  return (
    <main style={pageStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Accueil
      </Link>

      <h1 style={titleStyle}>Mentions légales & crédits</h1>

      <p style={introStyle}>
        Cette page présente la nature du site, l'utilisation des contenus liés à Star Wars,
        les crédits visuels et les informations de contact.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section>
          <h2 style={sectionTitleStyle}>Nature du site</h2>
          <p style={paragraphStyle}>
            Archives Galactiques est un projet personnel, informatif et non commercial,
            réalisé par un fan. Le site a pour objectif de présenter, contextualiser et
            recommander des œuvres liées à l'univers Star Wars afin d'aider de nouveaux
            spectateurs, lecteurs ou joueurs à découvrir la franchise.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Absence d'affiliation officielle</h2>
          <p style={paragraphStyle}>
            Ce site n'est ni affilié, ni sponsorisé, ni approuvé par Lucasfilm Ltd.,
            The Walt Disney Company, Disney, Star Wars ou toute autre entité liée à la
            franchise. Il ne s'agit pas d'un site officiel.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Propriété intellectuelle</h2>
          <p style={paragraphStyle}>
            Star Wars, Lucasfilm, Disney, ainsi que les personnages, titres, logos,
            images, affiches, jaquettes, captures, marques et éléments associés, sont la
            propriété de leurs ayants droit respectifs. Aucun droit de propriété n'est
            revendiqué sur ces éléments.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Utilisation des visuels</h2>
          <p style={paragraphStyle}>
            Certains visuels présents sur ce site peuvent provenir de sources officielles
            ou promotionnelles, notamment des affiches de films et séries, des jaquettes
            de jeux vidéo ou des images destinées à identifier les œuvres présentées.
            Ils sont utilisés uniquement à des fins d'illustration, d'identification,
            de commentaire, de critique, de recommandation et de contextualisation.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Crédits</h2>
          <p style={paragraphStyle}>
            Les visuels liés à Star Wars appartiennent à Lucasfilm Ltd., The Walt Disney
            Company et/ou à leurs partenaires, éditeurs, distributeurs et ayants droit
            respectifs. Lorsque possible, les sources utilisées sont indiquées dans le
            projet ou à proximité des contenus concernés.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Aucune exploitation commerciale</h2>
          <p style={paragraphStyle}>
            Le site ne vend aucun produit, ne propose aucun service payant, ne contient
            pas de publicité, ne génère aucun revenu et n'a pas vocation à exploiter
            commercialement la franchise Star Wars ou ses éléments visuels.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Demande de retrait</h2>
          <p style={paragraphStyle}>
            Si vous êtes titulaire de droits sur un contenu présent sur ce site et
            souhaitez demander sa modification, son crédit, ou son retrait, vous pouvez
            ouvrir une issue sur le dépôt GitHub du projet. Toute demande légitime sera
            traitée avec attention.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Données personnelles</h2>
          <p style={paragraphStyle}>
            Ce site ne collecte volontairement aucune donnée personnelle. Il n'utilise
            pas de formulaire de contact, de compte utilisateur, de newsletter, de cookies
            de traçage, ni d'outil d'analyse d'audience tiers.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Hébergement</h2>
          <p style={paragraphStyle}>
            Le site est publié via GitHub Pages. Des données techniques peuvent être
            traitées par l'hébergeur dans le cadre du fonctionnement normal du service.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Contenu éditorial</h2>
          <p style={paragraphStyle}>
            Les textes, classements, recommandations, descriptions et interprétations
            présents sur ce site reflètent uniquement l'opinion personnelle de l'auteur.
            Malgré le soin apporté à leur rédaction, certaines informations peuvent être
            incomplètes, approximatives ou évoluer avec le temps.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Bonnes pratiques appliquées</h2>
          <ul style={listStyle}>
            <li>Utilisation des visuels uniquement pour identifier ou illustrer les œuvres.</li>
            <li>Absence de monétisation, publicité ou vente de produits dérivés.</li>
            <li>Absence de confusion volontaire avec un site officiel.</li>
            <li>Crédit des ayants droit lorsque cela est possible.</li>
            <li>Retrait possible en cas de demande légitime d'un ayant droit.</li>
          </ul>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Contact</h2>
          <p style={paragraphStyle}>
            Pour signaler une erreur, demander une correction ou effectuer une demande
            liée à un contenu, merci d'utiliser les issues GitHub du projet.
          </p>
        </section>
      </div>
    </main>
  )
}