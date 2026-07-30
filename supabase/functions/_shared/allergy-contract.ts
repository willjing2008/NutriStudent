export const BROAD_ALLERGY_CHOICES = ['Nuts', 'Seafood'] as const

export type BroadAllergyChoice = typeof BROAD_ALLERGY_CHOICES[number]

const LEGACY_ALLERGY_ALIASES = new Map<string, BroadAllergyChoice>([
  ['peanuts', 'Nuts'],
  ['tree nuts', 'Nuts'],
  ['nuts', 'Nuts'],
  ['fish', 'Seafood'],
  ['shellfish', 'Seafood'],
  ['seafood', 'Seafood'],
])

export const BROAD_ALLERGY_KEYWORDS: Record<BroadAllergyChoice, readonly string[]> = {
  Nuts: [
    'nut',
    'peanut',
    'almond',
    'cashew',
    'walnut',
    'hazelnut',
    'pecan',
    'pistachio',
    'macadamia',
    'pine nut',
    'brazil nut',
    'chestnut',
    'tree nut',
    'mixed nuts',
    'marzipan',
    'praline',
  ],
  Seafood: [
    'seafood',
    'fish',
    'salmon',
    'tuna',
    'cod',
    'haddock',
    'pollock',
    'trout',
    'mackerel',
    'sardine',
    'anchovy',
    'herring',
    'halibut',
    'tilapia',
    'sea bass',
    'seabass',
    'swordfish',
    'sole',
    'hake',
    'prawn',
    'shrimp',
    'crab',
    'lobster',
    'crayfish',
    'langoustine',
    'scallop',
    'clam',
    'mussel',
    'oyster',
    'squid',
    'octopus',
    'calamari',
    'cockle',
    'shellfish',
  ],
}

export function normalizeAllergyChoice(value: string): string {
  const trimmed = value.trim().slice(0, 100)
  return LEGACY_ALLERGY_ALIASES.get(trimmed.toLowerCase()) ?? trimmed
}

export function normalizeAllergyChoices(value: unknown, limit = 50): string[] {
  if (!Array.isArray(value)) return []
  const safeLimit = Number.isFinite(limit)
    ? Math.max(0, Math.min(50, Math.floor(limit)))
    : 50
  if (safeLimit === 0) return []
  const normalized: string[] = []
  const seen = new Set<string>()

  for (const item of value) {
    if (typeof item !== 'string') continue
    const choice = normalizeAllergyChoice(item)
    const key = choice.toLowerCase()
    if (!choice || seen.has(key)) continue
    seen.add(key)
    normalized.push(choice)
    if (normalized.length >= safeLimit) break
  }

  return normalized
}

export function broadAllergyKeywords(value: string): readonly string[] {
  const choice = normalizeAllergyChoice(value)
  return choice === 'Nuts' || choice === 'Seafood'
    ? BROAD_ALLERGY_KEYWORDS[choice]
    : []
}
