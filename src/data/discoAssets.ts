import { skillFlavorNotes } from './resultCopy.ts'
import { skillMap } from './discoReference.ts'
import type {
  AttributeKey,
  QuizQuestion,
  ScoreVector,
  SkillReference,
} from '../types/quiz.ts'

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

export interface QuestionVoiceLineupItem {
  cue: string
  description: string
  docket: string
  portrait: SkillPortraitAsset
  rank: number
  skill: Pick<SkillReference, 'chinese' | 'english'>
  stance: string
}

export interface QuizQuestionSceneSpec {
  artifact: DiscoArtAsset
  backdrop: DiscoArtAsset
  lead: string
  note: string
  title: string
  voices: QuestionVoiceLineupItem[]
}

export interface ResultPosterArtSpec {
  artifact: DiscoArtAsset
  backdrop: DiscoArtAsset
  docket: string
}

let imageModules: Record<string, string> = {}
try {
  imageModules = import.meta.glob<string>('../assets/disco-game/**/*.png', {
    eager: true,
    import: 'default',
    query: '?url',
  })
} catch {
  // Node.js test environment — import.meta.glob is Vite-only
}

function createAsset(relativePath: string, label: string): DiscoArtAsset {
  return {
    label,
    src: imageModules[relativePath] ?? relativePath,
  }
}

export const backgroundArtAssets = {
  darkness: createAsset(
    '../assets/disco-game/backgrounds/darkness.png',
    'Darkness backdrop',
  ),
  discoElysium: createAsset(
    '../assets/disco-game/backgrounds/disco_elysium.png',
    'Disco Elysium title art',
  ),
  discoElysiumClean: createAsset(
    '../assets/disco-game/backgrounds/disco_elysium_clean.png',
    'Disco Elysium clean background',
  ),
  lobbyBackdrop: createAsset(
    '../assets/disco-game/backgrounds/lobby_backdrop.png',
    'Whirling-in-Rags lobby backdrop',
  ),
  photoHanged: createAsset(
    '../assets/disco-game/backgrounds/photo_hanged.png',
    'Hanged Man photo',
  ),
  photoPhasmid: createAsset(
    '../assets/disco-game/backgrounds/photo_phasmid.png',
    'Phasmid photo',
  ),
  redness: createAsset(
    '../assets/disco-game/backgrounds/redness.png',
    'Redness wash',
  ),
  tequilaFace: createAsset(
    '../assets/disco-game/backgrounds/tequila_face.png',
    'Tequila Sunset face',
  ),
  whiteness: createAsset(
    '../assets/disco-game/backgrounds/whiteness.png',
    'Pale whiteness backdrop',
  ),
} as const

export const landingBackdropAssets = {
  lobbyBackdrop: backgroundArtAssets.lobbyBackdrop,
  discoElysiumClean: backgroundArtAssets.discoElysiumClean,
} as const

export const dossierArtifactAssets = {
  badge: createAsset('../assets/disco-game/icons/badge.png', 'RCM badge'),
  bluePen: createAsset(
    '../assets/disco-game/icons/blue_oblong_pen.png',
    'Blue oblong pen',
  ),
  boombox: createAsset('../assets/disco-game/icons/boombox.png', 'Boombox'),
  flashlight: createAsset(
    '../assets/disco-game/icons/flashlight.png',
    'Flashlight',
  ),
  ledger: createAsset(
    '../assets/disco-game/icons/ledger_of_failure_and_hatred.png',
    'Ledger of Failure and Hatred',
  ),
  ledgerDamaged: createAsset(
    '../assets/disco-game/icons/ledger_damaged.png',
    'Damaged ledger',
  ),
  ledgerOblivion: createAsset(
    '../assets/disco-game/icons/ledger_oblivion.png',
    'Ledger of oblivion',
  ),
  map: createAsset(
    '../assets/disco-game/icons/map_of_martinaise.png',
    'Map of Martinaise',
  ),
  money: createAsset('../assets/disco-game/icons/money.png', 'Reál banknote'),
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
type BackgroundKey = keyof typeof backgroundArtAssets
type DossierArtifactKey = keyof typeof dossierArtifactAssets

const skillOrder = Object.keys(skillMap)

function createAssignmentRecord<T extends string>(
  assignments: ReadonlyArray<{ ids: readonly string[]; value: T }>,
): Record<string, T> {
  return assignments.reduce<Record<string, T>>((record, assignment) => {
    assignment.ids.forEach((id) => {
      record[id] = assignment.value
    })

    return record
  }, {})
}

const quizBackdropByQuestionId = createAssignmentRecord<BackgroundKey>([
  {
    value: 'discoElysiumClean',
    ids: [
      'likert-evidence',
      'likert-argument',
      'likert-body-solution',
      'scenario-machine',
    ],
  },
  {
    value: 'lobbyBackdrop',
    ids: ['likert-performance', 'likert-badge', 'scenario-bar', 'likert-trivia'],
  },
  {
    value: 'photoPhasmid',
    ids: [
      'likert-aesthetic',
      'likert-soft-persuasion',
      'scenario-letter',
      'likert-reconstruction',
    ],
  },
  {
    value: 'photoHanged',
    ids: [
      'likert-self-control',
      'likert-city-voice',
      'likert-sensory-scan',
      'scenario-lie',
      'scenario-crime-scene',
    ],
  },
  {
    value: 'tequilaFace',
    ids: [
      'likert-temptation',
      'likert-emotional-cues',
      'scenario-bottle',
      'likert-pain',
    ],
  },
  {
    value: 'discoElysium',
    ids: ['likert-dominance', 'scenario-shot', 'scenario-partner'],
  },
])

const quizArtifactByQuestionId = createAssignmentRecord<DossierArtifactKey>([
  {
    value: 'flashlight',
    ids: ['likert-evidence', 'likert-reconstruction', 'scenario-lie'],
  },
  {
    value: 'ledgerDamaged',
    ids: ['likert-trivia', 'likert-argument', 'scenario-letter'],
  },
  {
    value: 'boombox',
    ids: ['likert-performance', 'likert-temptation', 'scenario-bar'],
  },
  {
    value: 'badge',
    ids: ['likert-dominance', 'likert-badge', 'scenario-shot'],
  },
  {
    value: 'ledgerOblivion',
    ids: ['likert-city-voice', 'scenario-bottle'],
  },
  {
    value: 'money',
    ids: ['likert-pain', 'likert-body-solution', 'scenario-machine'],
  },
  {
    value: 'map',
    ids: ['likert-sensory-scan', 'scenario-crime-scene', 'scenario-partner'],
  },
  {
    value: 'pen',
    ids: ['likert-self-control', 'likert-soft-persuasion'],
  },
  {
    value: 'bluePen',
    ids: ['likert-aesthetic', 'likert-emotional-cues'],
  },
])

const posterBackdropBySkill = createAssignmentRecord<BackgroundKey>([
  {
    value: 'discoElysiumClean',
    ids: ['Logic', 'Encyclopedia', 'Visual Calculus', 'Interfacing', 'Composure'],
  },
  {
    value: 'photoPhasmid',
    ids: ['Conceptualization', 'Inland Empire', 'Empathy', 'Volition'],
  },
  {
    value: 'lobbyBackdrop',
    ids: ['Drama', 'Suggestion', 'Esprit de Corps'],
  },
  {
    value: 'tequilaFace',
    ids: ['Electrochemistry', 'Savoir Faire', 'Reaction Speed'],
  },
  {
    value: 'discoElysium',
    ids: ['Authority', 'Rhetoric', 'Half Light'],
  },
  {
    value: 'photoHanged',
    ids: [
      'Endurance',
      'Pain Threshold',
      'Physical Instrument',
      'Shivers',
      'Perception (Sight)',
      'Hand/Eye Coordination',
    ],
  },
])

const posterArtifactByAttribute: Record<AttributeKey, DossierArtifactKey> = {
  Intellect: 'map',
  Psyche: 'badge',
  Fysique: 'money',
  Motorics: 'flashlight',
}

const posterBackdropByAttribute: Record<AttributeKey, BackgroundKey> = {
  Intellect: 'discoElysiumClean',
  Psyche: 'photoPhasmid',
  Fysique: 'photoHanged',
  Motorics: 'lobbyBackdrop',
}

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

export function getQuizQuestionSceneSpec(
  question: QuizQuestion,
): QuizQuestionSceneSpec {
  return {
    artifact:
      dossierArtifactAssets[
        quizArtifactByQuestionId[question.id] ??
          (question.kind === 'likert' ? 'ledgerDamaged' : 'flashlight')
      ],
    backdrop:
      backgroundArtAssets[
        quizBackdropByQuestionId[question.id] ??
          (question.kind === 'likert' ? 'discoElysiumClean' : 'photoHanged')
      ],
    lead:
      question.kind === 'likert'
        ? '同一份陈述，允许互相顶嘴的技能同时出庭。'
        : '每个处理方式都带着一位技能代言，等你偏向谁。',
    note:
      question.kind === 'likert'
        ? '把它想成一次脑内对白：认领与否认会召来不同的声部。'
        : '先别求正确答案，先认出哪条路径像你会先迈出的那一步。',
    title: question.kind === 'likert' ? '脑内声部对峙' : '现场路径复演',
    voices:
      question.kind === 'likert'
        ? buildLikertQuestionVoices(question)
        : buildScenarioQuestionVoices(question),
  }
}

export function getResultPosterArtSpec(
  primarySkillEnglish: string,
  dominantAttribute: AttributeKey,
): ResultPosterArtSpec {
  const backdropKey =
    posterBackdropBySkill[primarySkillEnglish] ??
    posterBackdropByAttribute[dominantAttribute]

  return {
    artifact:
      dossierArtifactAssets[posterArtifactByAttribute[dominantAttribute]],
    backdrop: backgroundArtAssets[backdropKey],
    docket: `${dominantAttribute} drive / ${backgroundArtAssets[backdropKey].label}`,
  }
}

function buildLikertQuestionVoices(
  question: Extract<QuizQuestion, { kind: 'likert' }>,
): QuestionVoiceLineupItem[] {
  const supportVoices = resolveWeightedSkills(question.agree, 2).flatMap(
    ({ portrait, skill }, index) => [
      {
        cue:
          skillFlavorNotes[skill.english]?.punchline ??
          `${skill.chinese}先发言。`,
        description: '倾向认领这份陈述。',
        docket: `认领声部 ${String(index + 1).padStart(2, '0')}`,
        portrait,
        rank: index + 1,
        skill,
        stance: '认领',
      },
    ],
  )

  const counterVoices = resolveWeightedSkills(question.disagree, 2).flatMap(
    ({ portrait, skill }, index) => [
      {
        cue:
          skillFlavorNotes[skill.english]?.punchline ??
          `${skill.chinese}不同意。`,
        description: '倾向拆穿或偏离这份陈述。',
        docket: `质疑声部 ${String(index + 1).padStart(2, '0')}`,
        portrait,
        rank: supportVoices.length + index + 1,
        skill,
        stance: '质疑',
      },
    ],
  )

  return [...supportVoices, ...counterVoices]
}

function buildScenarioQuestionVoices(
  question: Extract<QuizQuestion, { kind: 'scenario' }>,
): QuestionVoiceLineupItem[] {
  return question.options.flatMap((option, index) => {
    const leadVoice = resolveWeightedSkills(option.effects, 1)[0]

    if (!leadVoice) {
      return []
    }

    return [
      {
        cue: option.insight,
        description: option.label,
        docket: `路径 ${String(index + 1).padStart(2, '0')}`,
        portrait: leadVoice.portrait,
        rank: index + 1,
        skill: leadVoice.skill,
        stance: '方案主述',
      },
    ]
  })
}

function resolveWeightedSkills(
  vector: ScoreVector,
  limit: number,
): Array<{
  portrait: SkillPortraitAsset
  skill: SkillReference
  weight: number
}> {
  return Object.entries(vector.skills ?? {})
    .filter(
      (entry): entry is [string, number] =>
        typeof entry[1] === 'number' && entry[1] > 0,
    )
    .sort((left, right) => {
      const weightDelta = right[1] - left[1]

      if (weightDelta !== 0) {
        return weightDelta
      }

      return skillOrder.indexOf(left[0]) - skillOrder.indexOf(right[0])
    })
    .flatMap(([english, weight]) => {
      const skill = skillMap[english]
      const portrait = getSkillPortraitAsset(english)

      if (!skill || !portrait) {
        return []
      }

      return [{ portrait, skill, weight }]
    })
    .slice(0, limit)
}
