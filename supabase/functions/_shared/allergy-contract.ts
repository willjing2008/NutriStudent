// Shared allergy taxonomy for the client picker and the server-side recipe
// filters. Choices are hierarchical: a broad group (e.g. Nuts) covers every
// one of its classified sub-options (Peanuts, Tree Nuts), while selecting only
// a sub-option restricts just that one ingredient family. Anything outside the
// taxonomy is treated as a free-text dislike and matched literally by name.

export const ALLERGY_GROUPS = {
  'Nuts': ['Peanuts', 'Tree Nuts'],
  'Seafood': ['Fish', 'Shellfish'],
  'Dairy': ['Milk', 'Cheese', 'Butter', 'Cream', 'Yogurt'],
  'Gluten/Wheat': [],
  'Eggs': [],
  'Soy': [],
} as const

export type BroadAllergyChoice = keyof typeof ALLERGY_GROUPS

export type AllergySubOption = typeof ALLERGY_GROUPS[BroadAllergyChoice][number]

export const BROAD_ALLERGY_CHOICES = Object.keys(ALLERGY_GROUPS) as readonly BroadAllergyChoice[]

// Ingredient keywords forbidden by each canonical choice. Matching is
// intentionally cautious (better to over-exclude than serve an allergen);
// single-word stems rely on substring matching in meal-filter, which applies
// word boundaries to the stems that would otherwise produce false positives
// (e.g. "nut" in coconut, "egg" in eggplant, "sole" in casserole).
const SUB_OPTION_KEYWORDS: Record<AllergySubOption, readonly string[]> = {
  Peanuts: ['peanut', 'groundnut', 'monkey nut', 'satay'],
  'Tree Nuts': [
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
    'marzipan',
    'praline',
  ],
  Fish: [
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
  ],
  Shellfish: [
    'shellfish',
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
  ],
  Milk: ['milk', 'whey', 'casein', 'custard'],
  Cheese: [
    'cheese',
    'cheddar',
    'mozzarella',
    'parmesan',
    'feta',
    'brie',
    'halloumi',
    'ricotta',
    'mascarpone',
  ],
  Butter: ['butter', 'ghee'],
  Cream: ['cream', 'creme', 'crème'],
  Yogurt: ['yogurt', 'yoghurt'],
}

// Group-level extras beyond the union of the group's sub-options. Groups
// without sub-options keep their whole keyword set here.
const GROUP_EXTRA_KEYWORDS: Record<BroadAllergyChoice, readonly string[]> = {
  Nuts: ['nut', 'mixed nuts'],
  Seafood: ['seafood'],
  Dairy: ['dairy', 'lactose'],
  'Gluten/Wheat': [
    'gluten',
    'wheat',
    'flour',
    'bread',
    'pasta',
    'noodle',
    'couscous',
    'semolina',
    'barley',
    'rye',
    'seitan',
    'cracker',
    'tortilla',
    'pita',
    'bagel',
    'pastry',
  ],
  Eggs: ['egg', 'omelette', 'omelet', 'mayonnaise', 'mayo', 'meringue', 'frittata', 'quiche'],
  Soy: ['soy', 'soya', 'tofu', 'edamame', 'tempeh', 'miso'],
}

const groupKeywords = (group: BroadAllergyChoice): readonly string[] => [
  ...GROUP_EXTRA_KEYWORDS[group],
  ...ALLERGY_GROUPS[group].flatMap((subOption) => SUB_OPTION_KEYWORDS[subOption]),
]

export const BROAD_ALLERGY_KEYWORDS: Record<BroadAllergyChoice, readonly string[]> =
  Object.fromEntries(
    BROAD_ALLERGY_CHOICES.map((group) => [group, groupKeywords(group)]),
  ) as Record<BroadAllergyChoice, readonly string[]>

export function allergyGroupForSubOption(value: string): BroadAllergyChoice | null {
  const choice = normalizeAllergyChoice(value)
  for (const group of BROAD_ALLERGY_CHOICES) {
    if ((ALLERGY_GROUPS[group] as readonly string[]).includes(choice)) return group
  }
  return null
}

// Legacy saved values (free-text era) mapped onto the canonical taxonomy.
// Sub-option names map to themselves so a saved "Fish" keeps its narrow
// meaning; only genuinely broad legacy words map to a group.
const LEGACY_ALLERGY_ALIASES = new Map<string, string>([
  ['peanut', 'Peanuts'],
  ['peanuts', 'Peanuts'],
  ['tree nut', 'Tree Nuts'],
  ['tree nuts', 'Tree Nuts'],
  ['nut', 'Nuts'],
  ['nuts', 'Nuts'],
  ['fish', 'Fish'],
  ['shellfish', 'Shellfish'],
  ['seafood', 'Seafood'],
  ['milk', 'Milk'],
  ['cheese', 'Cheese'],
  ['butter', 'Butter'],
  ['cream', 'Cream'],
  ['yogurt', 'Yogurt'],
  ['yoghurt', 'Yogurt'],
  ['dairy', 'Dairy'],
  ['lactose', 'Dairy'],
  ['gluten', 'Gluten/Wheat'],
  ['wheat', 'Gluten/Wheat'],
  ['gluten/wheat', 'Gluten/Wheat'],
  ['egg', 'Eggs'],
  ['eggs', 'Eggs'],
  ['soy', 'Soy'],
  ['soya', 'Soy'],
  ['soybean', 'Soy'],
])

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

/**
 * Forbidden ingredient keywords for a canonical allergy choice: the full
 * union for a broad group, just that family for a sub-option, and [] for
 * free-text dislikes (callers match those literally by name).
 */
export function allergyKeywordsForChoice(value: string): readonly string[] {
  const choice = normalizeAllergyChoice(value)
  if ((BROAD_ALLERGY_CHOICES as readonly string[]).includes(choice)) {
    return BROAD_ALLERGY_KEYWORDS[choice as BroadAllergyChoice]
  }
  if (Object.prototype.hasOwnProperty.call(SUB_OPTION_KEYWORDS, choice)) {
    return SUB_OPTION_KEYWORDS[choice as AllergySubOption]
  }
  return []
}

/** Back-compat alias for pre-hierarchy callers. */
export const broadAllergyKeywords = allergyKeywordsForChoice
