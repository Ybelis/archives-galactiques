import type { Importance, WorkType, Canon, RequiredLevel } from '../../types'

const importanceConfig: Record<Importance, { label: string; color: string; bg: string }> = {
  'essentiel':   { label: 'Essentiel',   color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)' },
  'recommande':  { label: 'Recommandé',  color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)' },
  'optionnel':   { label: 'Optionnel',   color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)' },
  'pour-fan':    { label: 'Pour fan',    color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)' },
}

const typeConfig: Record<WorkType, { label: string; color: string; bg: string }> = {
  'film':           { label: 'Film',            color: '#fde68a', bg: 'rgba(253, 230, 138, 0.12)' },
  'serie-live':     { label: 'Série live',      color: '#4fc3f7', bg: 'rgba(79, 195, 247, 0.12)' },
  'serie-animee':   { label: 'Série animée',    color: '#5eead4', bg: 'rgba(94, 234, 212, 0.12)' },
}

const requiredConfig: Record<RequiredLevel, { label: string; color: string; bg: string }> = {
  'obligatoire': { label: 'Obligatoire', color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)' },
  'recommandé':  { label: 'Recommandé',  color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)' },
  'optionnel':   { label: 'Optionnel',   color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)' },
}

const badgeBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '0.7rem',
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
}

export function ImportanceBadge({ value }: { value: Importance }) {
  const cfg = importanceConfig[value]
  return (
    <span style={{ ...badgeBase, color: cfg.color, background: cfg.bg }}>
      {cfg.label}
    </span>
  )
}

export function TypeBadge({ value }: { value: WorkType }) {
  const cfg = typeConfig[value]
  return (
    <span style={{ ...badgeBase, color: cfg.color, background: cfg.bg }}>
      {cfg.label}
    </span>
  )
}

export function CanonBadge({ value }: { value: Canon }) {
  const isCanon = value === 'canon'
  return (
    <span style={{
      ...badgeBase,
      color: isCanon ? '#60a5fa' : '#f472b6',
      background: isCanon ? 'rgba(96, 165, 250, 0.1)' : 'rgba(244, 114, 182, 0.1)',
    }}>
      {value === 'canon' ? 'Canon' : value === 'legends' ? 'Legends' : 'Non-canon'}
    </span>
  )
}

export function RequiredBadge({ value }: { value: RequiredLevel }) {
  const cfg = requiredConfig[value]
  return (
    <span style={{ ...badgeBase, color: cfg.color, background: cfg.bg }}>
      {cfg.label}
    </span>
  )
}
