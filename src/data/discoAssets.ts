import type { SkillReference } from '../types/quiz.ts'

export interface DiscoArtAsset {
  label: string
  src: string
}

export interface SkillPortraitAsset extends DiscoArtAsset {
  skill: string
  slug: string
}

export interface VoicePortraitLineupItem {
  isPrimary: boolean
  portrait: SkillPortraitAsset
  rank: number
  rankLabel: string
  skill: Pick<SkillReference, 'chinese' | 'english'>
}

function createAsset(relativePath: string, label: string): DiscoArtAsset {
  return {
    label,
    src: new URL(relativePath, import.meta.url).href,
  }
}

export const landingBackdropAssets = {
  lobbyBackdrop: createAsset(
    '../assets/disco-game/backgrounds/lobby_backdrop.png',
    'Whirling-in-Rags lobby backdrop',
  ),
  discoElysiumClean: createAsset(
    '../assets/disco-game/backgrounds/disco_elysium_clean.png',
    'Disco Elysium clean background',
  ),
} as const

export const dossierArtifactAssets = {
  badge: createAsset('../assets/disco-game/icons/badge.png', 'RCM badge'),
  ledger: createAsset(
    '../assets/disco-game/icons/ledger_of_failure_and_hatred.png',
    'Ledger of Failure and Hatred',
  ),
  map: createAsset(
    '../assets/disco-game/icons/map_of_martinaise.png',
    'Map of Martinaise',
  ),
  pen: createAsset(
    '../assets/disco-game/icons/kind_green_ape_pen.png',
    'Kind Green Ape pen',
  ),
} as const

const portraitAssetsBySlug = {
  authority: createAsset(
    '../assets/disco-game/skill-portraits/authority.png',
    'Authority portrait',
  ),
  composure: createAsset(
    '../assets/disco-game/skill-portraits/composure.png',
    'Composure portrait',
  ),
  conceptualization: createAsset(
    '../assets/disco-game/skill-portraits/conceptualization.png',
    'Conceptualization portrait',
  ),
  drama: createAsset(
    '../assets/disco-game/skill-portraits/drama.png',
    'Drama portrait',
  ),
  electrochemistry: createAsset(
    '../assets/disco-game/skill-portraits/electrochemistry.png',
    'Electrochemistry portrait',
  ),
  empathy: createAsset(
    '../assets/disco-game/skill-portraits/empathy.png',
    'Empathy portrait',
  ),
  encyclopedia: createAsset(
    '../assets/disco-game/skill-portraits/encyclopedia.png',
    'Encyclopedia portrait',
  ),
  endurance: createAsset(
    '../assets/disco-game/skill-portraits/endurance.png',
    'Endurance portrait',
  ),
  'esprit-de-corps': createAsset(
    '../assets/disco-game/skill-portraits/esprit-de-corps.png',
    'Esprit de Corps portrait',
  ),
  'half-light': createAsset(
    '../assets/disco-game/skill-portraits/half-light.png',
    'Half Light portrait',
  ),
  'hand-eye-coordination': createAsset(
    '../assets/disco-game/skill-portraits/hand-eye-coordination.png',
    'Hand/Eye Coordination portrait',
  ),
  interfacing: createAsset(
    '../assets/disco-game/skill-portraits/interfacing.png',
    'Interfacing portrait',
  ),
  'inland-empire': createAsset(
    '../assets/disco-game/skill-portraits/inland-empire.png',
    'Inland Empire portrait',
  ),
  logic: createAsset(
    '../assets/disco-game/skill-portraits/logic.png',
    'Logic portrait',
  ),
  'pain-threshold': createAsset(
    '../assets/disco-game/skill-portraits/pain-threshold.png',
    'Pain Threshold portrait',
  ),
  'perception-sight': createAsset(
    '../assets/disco-game/skill-portraits/perception-sight.png',
    'Perception (Sight) portrait',
  ),
  'physical-instrument': createAsset(
    '../assets/disco-game/skill-portraits/physical-instrument.png',
    'Physical Instrument portrait',
  ),
  'reaction-speed': createAsset(
    '../assets/disco-game/skill-portraits/reaction-speed.png',
    'Reaction Speed portrait',
  ),
  rhetoric: createAsset(
    '../assets/disco-game/skill-portraits/rhetoric.png',
    'Rhetoric portrait',
  ),
  'savoir-faire': createAsset(
    '../assets/disco-game/skill-portraits/savoir-faire.png',
    'Savoir Faire portrait',
  ),
  shivers: createAsset(
    '../assets/disco-game/skill-portraits/shivers.png',
    'Shivers portrait',
  ),
  suggestion: createAsset(
    '../assets/disco-game/skill-portraits/suggestion.png',
    'Suggestion portrait',
  ),
  'visual-calculus': createAsset(
    '../assets/disco-game/skill-portraits/visual-calculus.png',
    'Visual Calculus portrait',
  ),
  volition: createAsset(
    '../assets/disco-game/skill-portraits/volition.png',
    'Volition portrait',
  ),
} as const

type PortraitSlug = keyof typeof portraitAssetsBySlug

export function normalizeSkillPortraitSlug(skillName: string): string {
  return skillName
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[/'()]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getSkillPortraitAsset(
  skillName: string,
): SkillPortraitAsset | null {
  const slug = normalizeSkillPortraitSlug(skillName) as PortraitSlug
  const portrait = portraitAssetsBySlug[slug]

  if (!portrait) {
    return null
  }

  return {
    ...portrait,
    skill: skillName,
    slug,
  }
}

export function buildVoicePortraitLineup(
  skills: readonly Pick<SkillReference, 'chinese' | 'english'>[],
): VoicePortraitLineupItem[] {
  return skills.flatMap((skill, index) => {
    const portrait = getSkillPortraitAsset(skill.english)

    if (!portrait) {
      return []
    }

    return [
      {
        isPrimary: index === 0,
        portrait,
        rank: index + 1,
        rankLabel: `证词 ${String(index + 1).padStart(2, '0')}`,
        skill,
      },
    ]
  })
}
