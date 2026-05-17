export type Competency = {
  id: string
  slug: string
  title: string
  shortDescription: string
}

/** Ordered to match the six core story competencies workflow. */
export const competencies: Competency[] = [
  {
    id: 'concept',
    slug: 'concept',
    title: 'Concept',
    shortDescription:
      'Crystallize the “what if,” stakes, and hook so your idea can carry a full novel—not just a cool moment.',
  },
  {
    id: 'character',
    slug: 'character',
    title: 'Character',
    shortDescription:
      'Define who hurts, what they want, and why readers will care before the plot starts twisting.',
  },
  {
    id: 'theme',
    slug: 'theme',
    title: 'Theme',
    shortDescription:
      'Name the moral tension beneath the action so scenes stay purposeful instead of merely eventful.',
  },
  {
    id: 'structure',
    slug: 'structure',
    title: 'Structure',
    shortDescription:
      'Map the architecture of your story so setup, escalation, and payoff land where they should.',
  },
  {
    id: 'scene-execution',
    slug: 'scene-execution',
    title: 'Scene execution',
    shortDescription:
      'Turn outline into compelling units of conflict, turn, and consequence—each scene doing real work.',
  },
  {
    id: 'writing-voice',
    slug: 'writing-voice',
    title: 'Writing voice',
    shortDescription:
      'Shape sentence-level craft and tone so the prose carries the same clarity as your plan.',
  },
]

const bySlug = new Map(competencies.map((c) => [c.slug, c]))

export function getCompetencyBySlug(slug: string): Competency | undefined {
  return bySlug.get(slug)
}

export function isValidCompetencySlug(slug: string): boolean {
  return bySlug.has(slug)
}
