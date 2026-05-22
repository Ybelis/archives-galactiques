/**
 * Central media registry: maps work IDs to their available image assets.
 * Components use `getWorkAssets(id)` rather than hardcoding paths.
 *
 * Asset folders:
 *   /media/eras/work/{movies|series|games}/  — logos for the /eras page
 *   /media/posters/{movies|series|games}/    — 2:3 detail posters
 *   /media/miniatures/                       — compact thumbnails (films & series)
 *
 * Known issues (do not rename without updating here):
 *   - "miniatures/episode I.png" has a space — leave as-is, browsers handle it
 *   - "eras/work/games/Lego_Star_Wars_Le_Réveil_de_la_Force_Logo.png" — French title with accents
 *   - "eras/work/games/fotor.png" / "posters/games/fotor.png" — filename looks like a Fotor export;
 *     origin unknown, left unmapped until confirmed
 */

const M = '/media'

export interface WorkAssets {
  logo?: string      // stylised title logo — for /eras page
  poster?: string    // 2:3 portrait — detail pages
  thumbnail?: string // compact — lists (overrides Work.thumbnail when present)
  alt?: string
}

const registry: Record<string, WorkAssets> = {
  // ── Films ──────────────────────────────────────────────────────────────
  'episode-i': {
    logo:      `${M}/eras/work/movies/episode_I.png`,
    poster:    `${M}/posters/movies/episode_I.png`,
    thumbnail: `${M}/miniatures/episode I.png`,
    alt: 'Episode I — La Menace Fantôme',
  },
  'episode-ii': {
    logo:      `${M}/eras/work/movies/episode_II.png`,
    poster:    `${M}/posters/movies/episode_II.png`,
    thumbnail: `${M}/miniatures/episode_II.png`,
    alt: 'Episode II — L\'Attaque des Clones',
  },
  'episode-iii': {
    logo:      `${M}/eras/work/movies/episode_III.png`,
    poster:    `${M}/posters/movies/episode_III.png`,
    thumbnail: `${M}/miniatures/episode_III.png`,
    alt: 'Episode III — La Revanche des Sith',
  },
  'episode-iv': {
    logo:      `${M}/eras/work/movies/episode_IV.png`,
    poster:    `${M}/posters/movies/episode_IV.png`,
    thumbnail: `${M}/miniatures/episode_IV.png`,
    alt: 'Episode IV — Un Nouvel Espoir',
  },
  'episode-v': {
    logo:      `${M}/eras/work/movies/episode_V.png`,
    poster:    `${M}/posters/movies/episode_V.png`,
    thumbnail: `${M}/miniatures/episode_V.png`,
    alt: 'Episode V — L\'Empire contre-attaque',
  },
  'episode-vi': {
    logo:      `${M}/eras/work/movies/episode_VI.png`,
    poster:    `${M}/posters/movies/episode_VI.png`,
    thumbnail: `${M}/miniatures/episode_VI.png`,
    alt: 'Episode VI — Le Retour du Jedi',
  },
  'episode-vii': {
    logo:      `${M}/eras/work/movies/episode_VII.png`,
    poster:    `${M}/posters/movies/episode_VII.png`,
    thumbnail: `${M}/miniatures/episode_VII.png`,
    alt: 'Episode VII — Le Réveil de la Force',
  },
  'episode-viii': {
    logo:      `${M}/eras/work/movies/episode_VIII.png`,
    poster:    `${M}/posters/movies/episode_VIII.png`,
    thumbnail: `${M}/miniatures/episode_VIII.png`,
    alt: 'Episode VIII — Les Derniers Jedi',
  },
  'episode-ix': {
    logo:      `${M}/eras/work/movies/episode_IX.png`,
    poster:    `${M}/posters/movies/episode_IX.png`,
    thumbnail: `${M}/miniatures/episode_IX.png`,
    alt: 'Episode IX — L\'Ascension de Skywalker',
  },
  'rogue-one': {
    logo:      `${M}/eras/work/movies/rogue_one.png`,
    poster:    `${M}/posters/movies/rogue_one.png`,
    thumbnail: `${M}/miniatures/rogue_one.png`,
    alt: 'Rogue One: A Star Wars Story',
  },
  'solo': {
    logo:      `${M}/eras/work/movies/solo.png`,
    poster:    `${M}/posters/movies/solo.png`,
    thumbnail: `${M}/miniatures/solo.png`,
    alt: 'Solo: A Star Wars Story',
  },
  'mandalorian-and-grogu': {
    logo:      `${M}/eras/work/movies/the_mandalorian_and_grogu.png`,
    poster:    `${M}/posters/movies/the_mandalorian_and_grogu.png`,
    thumbnail: `${M}/posters/movies/the_mandalorian_and_grogu.png`,
    alt: 'The Mandalorian & Grogu',
  },

  // ── Series ─────────────────────────────────────────────────────────────
  'the-acolyte': {
    logo:      `${M}/eras/work/series/the_acolyte.png`,
    poster:    `${M}/posters/series/acolyte.png`,
    thumbnail: `${M}/miniatures/acolyte.png`,
    alt: 'The Acolyte',
  },
  'clone-wars': {
    logo:      `${M}/eras/work/series/clone_wars.png`,
    poster:    `${M}/posters/series/clone_wars.png`,
    thumbnail: `${M}/miniatures/clone_wars.png`,
    alt: 'Star Wars: The Clone Wars',
  },
  'the-bad-batch': {
    logo:      `${M}/eras/work/series/the_bad_batch.png`,
    poster:    `${M}/posters/series/the_bad_batch.png`,
    thumbnail: `${M}/miniatures/the_bad_batch.png`,
    alt: 'Star Wars: The Bad Batch',
  },
  'rebels': {
    logo:      `${M}/eras/work/series/rebels.png`,
    poster:    `${M}/posters/series/rebels.png`,
    thumbnail: `${M}/miniatures/rebels.png`,
    alt: 'Star Wars Rebels',
  },
  'andor': {
    logo:      `${M}/eras/work/series/andor.png`,
    poster:    `${M}/posters/series/andor.png`,
    thumbnail: `${M}/miniatures/andor.png`,
    alt: 'Andor',
  },
  'kenobi': {
    logo:      `${M}/eras/work/series/kenobi.png`,
    poster:    `${M}/posters/series/kenobi.png`,
    thumbnail: `${M}/miniatures/kenobi.png`,
    alt: 'Obi-Wan Kenobi',
  },
  'the-mandalorian': {
    logo:      `${M}/eras/work/series/the_mandalorian.png`,
    poster:    `${M}/posters/series/the_mandalorian.png`,
    thumbnail: `${M}/miniatures/the_mandalorian.png`,
    alt: 'The Mandalorian',
  },
  'boba-fett': {
    logo:      `${M}/eras/work/series/boba_fett.png`,
    poster:    `${M}/posters/series/boba_fett.png`,
    thumbnail: `${M}/miniatures/boba_fett.png`,
    alt: 'The Book of Boba Fett',
  },
  'ahsoka': {
    logo:      `${M}/eras/work/series/ahsoka.png`,
    poster:    `${M}/posters/series/ahsoka.png`,
    thumbnail: `${M}/miniatures/ahsoka.png`,
    alt: 'Ahsoka',
  },
  'skeleton-crew': {
    logo:      `${M}/eras/work/series/skeleton_crew.png`,
    poster:    `${M}/posters/series/skeleton_crew.png`,
    thumbnail: `${M}/miniatures/skeleton_crew.png`,
    alt: 'Skeleton Crew',
  },
  'tales-of-the-jedi': {
    logo:      `${M}/eras/work/series/tales_of_the_jedi.png`,
    poster:    `${M}/posters/series/tales_of_the_jedi.png`,
    thumbnail: `${M}/miniatures/tales_of_the_jedi.png`,
    alt: 'Tales of the Jedi',
  },
  'tales-of-the-empire': {
    logo:      `${M}/eras/work/series/tales_of_the_empire.png`,
    poster:    `${M}/posters/series/tales_of_the_empire.png`,
    thumbnail: `${M}/miniatures/tales_of_the_empire.png`,
    alt: 'Tales of the Empire',
  },
  'tales-of-the-underworld': {
    logo:      `${M}/eras/work/series/tales_of_the_underworld.png`,
    poster:    `${M}/posters/series/tales_of_the_underworld.png`,
    thumbnail: `${M}/miniatures/tales_of_the_underworld.png`,
    alt: 'Tales of the Underworld',
  },
  'maul-shadow-lord': {
    logo:      `${M}/eras/work/series/shadow_lord.png`,
    poster:    `${M}/posters/series/shadow_lord.png`,
    thumbnail: `${M}/miniatures/shadow_lord.png`,
    alt: 'Star Wars: Maul – Shadow Lord',
  },
  'resistance': {
    logo:      `${M}/eras/work/series/resistance.png`,
    poster:    `${M}/posters/series/resistance.png`,
    alt: 'Star Wars Resistance',
  },
  'young-jedi-adventures': {
    logo:      `${M}/eras/work/series/young_jedi_adventures.png`,
    poster:    `${M}/posters/series/young_jedi_adventures.png`,
    alt: 'Young Jedi Adventures',
  },
  'visions': {
    poster:    `${M}/posters/series/visions.png`,
    alt: 'Star Wars: Visions',
  },

  // ── Games ──────────────────────────────────────────────────────────────
  'knights-of-the-old-republic': {
    logo:      `${M}/eras/work/games/kotor_I.png`,
    poster:    `${M}/posters/games/kotor_I.png`,
    thumbnail: `${M}/posters/games/kotor_I.png`,
    alt: 'Knights of the Old Republic',
  },
  'kotor-ii': {
    logo:      `${M}/eras/work/games/kotor_II.png`,
    poster:    `${M}/posters/games/kotor_II.png`,
    thumbnail: `${M}/posters/games/kotor_II.png`,
    alt: 'KOTOR II: The Sith Lords',
  },
  'star-wars-the-old-republic': {
    logo:      `${M}/eras/work/games/swtor.png`,
    poster:    `${M}/posters/games/swtor.png`,
    thumbnail: `${M}/posters/games/swtor.png`,
    alt: 'Star Wars: The Old Republic',
  },
  'republic-commando': {
    logo:      `${M}/eras/work/games/republic_commando.png`,
    poster:    `${M}/posters/games/republic_commando.png`,
    thumbnail: `${M}/posters/games/republic_commando.png`,
    alt: 'Star Wars: Republic Commando',
  },
  'episode-i-racer': {
    logo:      `${M}/eras/work/games/galactic_racer.png`,
    poster:    `${M}/posters/games/galactic_racer.png`,
    thumbnail: `${M}/posters/games/galactic_racer.png`,
    alt: 'Star Wars Episode I: Racer',
  },
  'jedi-fallen-order': {
    logo:      `${M}/eras/work/games/jedi_fallen_order.png`,
    poster:    `${M}/posters/games/jedi_fallen_order.png`,
    thumbnail: `${M}/posters/games/jedi_fallen_order.png`,
    alt: 'Star Wars Jedi: Fallen Order',
  },
  'jedi-survivor': {
    logo:      `${M}/eras/work/games/jedi_survivor.png`,
    poster:    `${M}/posters/games/jedi_survivor.png`,
    thumbnail: `${M}/posters/games/jedi_survivor.png`,
    alt: 'Star Wars Jedi: Survivor',
  },
  'star-wars-outlaws': {
    logo:      `${M}/eras/work/games/outlaws.png`,
    poster:    `${M}/posters/games/outlaws.png`,
    thumbnail: `${M}/posters/games/outlaws.png`,
    alt: 'Star Wars Outlaws',
  },
  'star-wars-squadrons': {
    logo:      `${M}/eras/work/games/squadrons.png`,
    poster:    `${M}/posters/games/squadrons.png`,
    thumbnail: `${M}/posters/games/squadrons.png`,
    alt: 'Star Wars: Squadrons',
  },
  'battlefront-2015': {
    logo:      `${M}/eras/work/games/battlefront_2015.png`,
    poster:    `${M}/posters/games/battlefront_2015.png`,
    thumbnail: `${M}/posters/games/battlefront_2015.png`,
    alt: 'Star Wars Battlefront (2015)',
  },
  'battlefront-ii-2017': {
    logo:      `${M}/eras/work/games/battlefront_II_2017.png`,
    poster:    `${M}/posters/games/battlefront_II_2017.png`,
    thumbnail: `${M}/posters/games/battlefront_II_2017.png`,
    alt: 'Star Wars Battlefront II (2017)',
  },
  'lego-star-wars-i': {
    logo:      `${M}/eras/work/games/lego_star_wars_I.png`,
    poster:    `${M}/posters/games/lego_star_wars_I.png`,
    thumbnail: `${M}/posters/games/lego_star_wars_I.png`,
    alt: 'LEGO Star Wars: The Video Game',
  },
  'lego-star-wars-ii': {
    logo:      `${M}/eras/work/games/lego_star_wars_II.png`,
    poster:    `${M}/posters/games/lego_star_wars_II.png`,
    thumbnail: `${M}/posters/games/lego_star_wars_II.png`,
    alt: 'LEGO Star Wars II: The Original Trilogy',
  },
  'lego-star-wars-iii': {
    logo:      `${M}/eras/work/games/lego_star_wars_III.png`,
    poster:    `${M}/posters/games/lego_star_wars_III.png`,
    thumbnail: `${M}/posters/games/lego_star_wars_III.png`,
    alt: 'LEGO Star Wars III: The Clone Wars',
  },
  'lego-complete-saga': {
    logo:      `${M}/eras/work/games/lego_star_wars_complete.png`,
    poster:    `${M}/posters/games/lego_star_wars_complete.png`,
    thumbnail: `${M}/posters/games/lego_star_wars_complete.png`,
    alt: 'LEGO Star Wars: The Complete Saga',
  },
  'lego-skywalker-saga': {
    logo:      `${M}/eras/work/games/lego_star_wars_skywalker.png`,
    poster:    `${M}/posters/games/lego_star_wars_skywalker_saga.png`,
    thumbnail: `${M}/posters/games/lego_star_wars_skywalker_saga.png`,
    alt: 'LEGO Star Wars: The Skywalker Saga',
  },
  'lego-force-awakens': {
    logo:      `${M}/eras/work/games/Lego_Star_Wars_Le_Réveil_de_la_Force_Logo.png`,
    poster:    `${M}/posters/games/lego_star_wars_force_awakens.png`,
    thumbnail: `${M}/posters/games/lego_star_wars_force_awakens.png`,
    alt: 'LEGO Star Wars: The Force Awakens',
  },
}

/** Returns all known assets for a work ID. Returns empty object if not found. */
export function getWorkAssets(workId: string): WorkAssets {
  return registry[workId] ?? {}
}

/**
 * Returns the best available logo path.
 * Falls back to poster, then the provided fallback thumbnail.
 */
export function getWorkLogo(workId: string, fallback: string): string {
  const a = registry[workId]
  return a?.logo ?? a?.poster ?? fallback
}

/**
 * Returns the best available poster path.
 * Falls back to the provided fallback thumbnail.
 */
export function getWorkPoster(workId: string, fallback: string): string {
  const a = registry[workId]
  return a?.poster ?? fallback
}
