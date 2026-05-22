export type WorkType = 'film' | 'serie-live' | 'serie-animee' | 'jeu'
export type Importance = 'essentiel' | 'recommande' | 'optionnel' | 'pour-fan'
export type Continuity = 'canon' | 'legends' | 'non-canon' | 'mixed' | 'unknown'
export type EraId =
  | 'dawn-of-the-jedi'
  | 'old-republic'
  | 'high-republic'
  | 'fall-of-the-jedi'
  | 'reign-of-the-empire'
  | 'age-of-rebellion'
  | 'new-republic'
  | 'rise-of-the-first-order'
  | 'new-jedi-order'

export interface Era {
  id: EraId
  name: string
  period: string
  image: string
  shortDescription: string
}

export interface Episode {
  id: string
  title: string
  number: number
  season: number
  summary?: string
  airDate?: string
}

export interface Season {
  number: number
  episodes: Episode[]
}

export interface WorkAssets {
  poster?: string      // 2:3 — detail page
  logo?: string        // transparent PNG — /eras logo row
  backdrop?: string    // 16:9 — detail page hero background
  alt?: string
}

export interface Work {
  id: string
  title: string
  type: WorkType
  era: EraId
  period: string
  releaseYear: number
  thumbnail: string    // compact lists; fallback when assets absent
  assets?: WorkAssets  // extended media — populated progressively
  importance: Importance
  continuity: Continuity
  continuityNote?: string
  platforms?: string[]
  synopsis: string
  whyWatch: string
  prerequisites: string[]
  personalNote: string
  duration?: number
  seasons?: number
  episodes?: number
  status?: 'terminée' | 'en cours' | 'annulée'
  seasonData?: Season[]
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
  estimatedTime: string
  items: PathItem[]
  why: string
}

// Databank (replaces GlossaryEntry)
export type DatabankCategory =
  | 'character'
  | 'location'
  | 'planet'
  | 'vehicle'
  | 'organization'
  | 'concept'
  | 'event'
  | 'species'

export interface DatabankEntry {
  id: string
  name: string
  category: DatabankCategory
  definition: string
  related?: string[]
  appearances?: string[]
}

// Legacy glossary (Glossary.tsx / glossary.ts — predates Databank, kept for compatibility)
export type GlossaryCategory = 'chronologie' | 'faction' | 'personnage' | 'lieu' | 'concept'
export interface GlossaryEntry {
  id: string
  term: string
  category: GlossaryCategory
  definition: string
  related?: string[]
}

// Future: Galaxy map
export interface Planet {
  id: string
  name: string
  region?: string
  climate?: string
  description?: string
  appearances?: string[]
  coordinates?: { x: number; y: number }
}
