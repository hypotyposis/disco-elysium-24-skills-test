import { rivalMap } from '../data/rivalMap.ts'
import { skillMap } from '../data/discoReference.ts'
import { skillFlavorNotes } from '../data/resultCopy.ts'
import type { QuizAnswer, QuizQuestion, QuizResult, ScoreVector } from '../types/quiz.ts'

export interface VoiceLine {
  skillEnglish: string
  skillChinese: string
  text: string
  role: 'dominant' | 'contrarian'
}

export interface VoiceCommentary {
  dominant: VoiceLine | null
  contrarian: VoiceLine | null
}

type TriggerType = 'approve' | 'mock' | 'warn' | 'tempt' | 'contrarian'

export interface VoicePack {
  skillId: string
  voice: Partial<Record<TriggerType | 'epilogue', string[]>>
}

interface VoiceContext {
  choice: string
  attribute: string
  skillName: string
  rivalSkill: string
  score: number
  questionNum: number
}

const TEMPLATE_VAR = /\{(\w+)\}/g

function fillTemplate(template: string, ctx: VoiceContext): string {
  return template.replace(TEMPLATE_VAR, (match, key: string) => {
    const value = ctx[key as keyof VoiceContext]
    return value !== undefined ? String(value) : match
  })
}

function pickRandom<T>(items: readonly T[]): T | undefined {
  if (items.length === 0) return undefined
  return items[Math.floor(Math.random() * items.length)]
}

/**
 * Compute per-skill score deltas from a single question + answer.
 *
 * For likert: skill weight * clamped intensity.
 * For scenario: skill weights from the selected option's effects.
 */
export function computeDeltas(
  question: QuizQuestion,
  answerValue: QuizAnswer['value'],
): Record<string, number> {
  const deltas: Record<string, number> = {}

  if (question.kind === 'likert') {
    const intensity = Math.min(Math.max(Math.trunc(Number(answerValue)), -2), 2)
    if (intensity === 0) return deltas

    const vector: ScoreVector = intensity > 0 ? question.agree : question.disagree
    const absIntensity = Math.abs(intensity)

    if (vector.skills) {
      for (const [skill, weight] of Object.entries(vector.skills)) {
        if (weight) deltas[skill] = weight * absIntensity
      }
    }
  } else {
    const option = question.options.find((o) => o.id === answerValue)
    if (option?.effects.skills) {
      for (const [skill, weight] of Object.entries(option.effects.skills)) {
        if (weight) deltas[skill] = weight
      }
    }
  }

  return deltas
}

/**
 * Find the skill with the highest positive delta.
 * Ties broken by cumulative score, then reference order.
 */
function findDominantSkill(
  deltas: Record<string, number>,
  cumulativeScores: Record<string, number>,
): string | null {
  const skills = Object.entries(deltas)
    .filter(([, d]) => d > 0)
    .sort((a, b) => {
      const deltaGap = b[1] - a[1]
      if (deltaGap !== 0) return deltaGap
      return (cumulativeScores[b[0]] ?? 0) - (cumulativeScores[a[0]] ?? 0)
    })

  return skills[0]?.[0] ?? null
}

/**
 * Generate voice commentary for a single answered question.
 *
 * Returns null commentary lines if:
 * - no skill had a positive delta (zero-delta rule)
 * - no voice pack exists for the skill
 * - the voice pack has no lines for the trigger type
 */
export function generateCommentary(
  question: QuizQuestion,
  answerValue: QuizAnswer['value'],
  cumulativeScores: Record<string, number>,
  voicePacks: Record<string, VoicePack>,
  questionNum: number,
  choiceLabel: string,
): VoiceCommentary {
  const deltas = computeDeltas(question, answerValue)
  const dominantId = findDominantSkill(deltas, cumulativeScores)

  if (!dominantId) {
    return { dominant: null, contrarian: null }
  }

  const rivalId = rivalMap[dominantId] ?? null
  const dominantSkill = skillMap[dominantId]
  const rivalSkill = rivalId ? skillMap[rivalId] : undefined

  const dominantPack = voicePacks[dominantId]
  const rivalPack = rivalId ? voicePacks[rivalId] : undefined

  const triggerType: TriggerType =
    (deltas[dominantId] ?? 0) > 0 ? 'approve' : 'mock'

  const ctx: VoiceContext = {
    choice: choiceLabel,
    attribute: dominantSkill?.attributeChinese ?? '',
    skillName: dominantSkill?.chinese ?? dominantId,
    rivalSkill: rivalSkill?.chinese ?? '',
    score: cumulativeScores[dominantId] ?? 0,
    questionNum,
  }

  const dominantTemplate = pickRandom(dominantPack?.voice[triggerType] ?? [])
  const contrarianTemplate = pickRandom(rivalPack?.voice.contrarian ?? [])

  return {
    dominant: dominantTemplate
      ? {
          skillEnglish: dominantId,
          skillChinese: dominantSkill?.chinese ?? dominantId,
          text: fillTemplate(dominantTemplate, ctx),
          role: 'dominant',
        }
      : null,
    contrarian:
      contrarianTemplate && rivalId
        ? {
            skillEnglish: rivalId,
            skillChinese: rivalSkill?.chinese ?? rivalId,
            text: fillTemplate(contrarianTemplate, {
              ...ctx,
              skillName: rivalSkill?.chinese ?? rivalId,
              rivalSkill: dominantSkill?.chinese ?? dominantId,
            }),
            role: 'contrarian',
          }
        : null,
  }
}

export interface SkillMonologueData {
  dominantSkillEnglish: string
  dominantSkillChinese: string
  monologueLines: string[]
  rivalSkillEnglish: string | null
  rivalSkillChinese: string | null
  rivalInterjection: string | null
}

/**
 * Build the result monologue from the dominant skill's voice data.
 * Combines the epilogue line, worldview, relations, and pressure
 * into a flowing personal address from the skill to the player.
 */
export function buildMonologue(
  result: QuizResult,
  voicePacks: Record<string, VoicePack>,
): SkillMonologueData {
  const primary = result.primarySkill
  const rivalId = rivalMap[primary.english] ?? null
  const rivalSkill = rivalId ? skillMap[rivalId] : null
  const flavor = skillFlavorNotes[primary.english]
  const pack = voicePacks[primary.english]
  const rivalPack = rivalId ? voicePacks[rivalId] : undefined

  const lines: string[] = []

  const epilogue = pickRandom(pack?.voice.epilogue ?? [])
  if (epilogue) lines.push(epilogue)

  if (flavor) {
    lines.push(flavor.worldview)
    lines.push(flavor.relations)
    lines.push(flavor.pressure)
  }

  let rivalInterjection: string | null = null
  if (rivalPack && flavor) {
    const contrarianLine = pickRandom(rivalPack.voice.contrarian ?? [])
    if (contrarianLine) {
      rivalInterjection = fillTemplate(contrarianLine, {
        choice: '',
        attribute: primary.attributeChinese,
        skillName: rivalSkill?.chinese ?? '',
        rivalSkill: primary.chinese,
        score: primary.score,
        questionNum: 0,
      })
    }
  }

  return {
    dominantSkillEnglish: primary.english,
    dominantSkillChinese: primary.chinese,
    monologueLines: lines,
    rivalSkillEnglish: rivalId,
    rivalSkillChinese: rivalSkill?.chinese ?? null,
    rivalInterjection,
  }
}
