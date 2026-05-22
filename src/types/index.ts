export type WorkType = 'film' | 'serie-live' | 'serie-animee'
export type Importance = 'essentiel' | 'recommande' | 'optionnel' | 'pour-fan'
export type Canon = 'canon' | 'legends' | 'non-canon'
export type EraId =
  | 'dawn-of-the-jedi'
  | 'old-republic'
  | 'high-republic'
  | 'fall-of-the-jedi'
  | 'reign-of-the-empire'
  | 'age-of-rebellion'
  | 'new-republic'
  | 'rise-of-the-first-order'

export interface Era {
  id: EraId
  name: string
  period: string
  image: string
  shortDescription: string
}

export interface Work {
  id: string
  title: string
  type: WorkType
  era: EraId
  period: string
  releaseYear: number
  thumbnail: string
  importance: Importance
  canon: Canon
  synopsis: string
  whyWatch: string
  prerequisites: string[]
  personalNote: string
  // film uniquement
  duration?: number
  // série uniquement
  seasons?: number
  episodes?: number
  status?: 'terminée' | 'en cours' | 'annulée'
}

export type RequiredLevel = 'obligatoire' | 'recommandé' | 'optionnel'

export interface PathItem {
  workId: string
  required: RequiredLevel
  note?: string
}

export type InvestmentLevel = 'léger' | 'modéré' | 'complet'

export interface ViewingPath {
  id: string
  title: string
  description: string
  profile: string
  investment: InvestmentLevel
  items: PathItem[]
  why: string
}

export interface GlossaryEntry {
  id: string
  term: string
  category: 'chronologie' | 'faction' | 'concept' | 'personnage' | 'lieu'
  definition: string
  related?: string[]
}
