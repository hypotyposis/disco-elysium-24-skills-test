import { rivalMap } from '../data/rivalMap.ts'
import { skillMap } from '../data/discoReference.ts'
import { skillFlavorNotes } from '../data/resultCopy.ts'
import type { QuizAnswer, QuizQuestion, QuizResult, ScoreVector } from '../types/quiz.ts'

export interface VoiceLine {
  skillEnglish: string
  skillChinese: string
  text: string
  role: 'approve' | 'dissent'
}

export interface VoiceCommentary {
  approve: VoiceLine | null
  dissent: VoiceLine | null
}

type TriggerType = 'approve' | 'mock' | 'warn' | 'tempt'

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
 * Find the top skill from a set of deltas.
 * Ties broken by cumulative score, then reference order.
 */
function findTopSkill(
  deltas: Record<string, number>,
  cumulativeScores: Record<string, number>,
  exclude?: string,
): string | null {
  const skills = Object.entries(deltas)
    .filter(([id, d]) => d > 0 && id !== exclude)
    .sort((a, b) => {
      const deltaGap = b[1] - a[1]
      if (deltaGap !== 0) return deltaGap
      return (cumulativeScores[b[0]] ?? 0) - (cumulativeScores[a[0]] ?? 0)
    })

  return skills[0]?.[0] ?? null
}

/**
 * Compute deltas for the "opposite" choice — the skills that would
 * have been activated if the player chose differently.
 *
 * For likert: if player agreed, return the disagree vector's skills (and vice versa).
 * For scenario: return the highest-weight skills across all non-selected options.
 */
function computeOppositeDeltas(
  question: QuizQuestion,
  answerValue: QuizAnswer['value'],
): Record<string, number> {
  const deltas: Record<string, number> = {}

  if (question.kind === 'likert') {
    const intensity = Math.min(Math.max(Math.trunc(Number(answerValue)), -2), 2)
    if (intensity === 0) return deltas

    // If player agreed, the "opposite" skills are from the disagree vector
    const oppositeVector: ScoreVector =
      intensity > 0 ? question.disagree : question.agree

    if (oppositeVector.skills) {
      for (const [skill, weight] of Object.entries(oppositeVector.skills)) {
        if (weight) deltas[skill] = weight * 2 // max intensity
      }
    }
  } else {
    // For scenario: gather skills from all non-selected options
    for (const option of question.options) {
      if (option.id === answerValue) continue
      if (option.effects.skills) {
        for (const [skill, weight] of Object.entries(option.effects.skills)) {
          if (weight && weight > (deltas[skill] ?? 0)) {
            deltas[skill] = weight
          }
        }
      }
    }
  }

  return deltas
}

function buildVoiceLine(
  skillId: string,
  pack: VoicePack | undefined,
  trigger: TriggerType,
  ctx: VoiceContext,
  role: VoiceLine['role'],
): VoiceLine | null {
  const template = pickRandom(pack?.voice[trigger] ?? [])
  if (!template) return null

  const skill = skillMap[skillId]
  return {
    skillEnglish: skillId,
    skillChinese: skill?.chinese ?? skillId,
    text: fillTemplate(template, ctx),
    role,
  }
}

/**
 * Generate voice commentary for a single answered question.
 *
 * Two skills react to the player's choice:
 * - The approving skill: got the highest boost from this answer → uses 'approve'
 * - The dissenting skill: would have been boosted by a different answer → uses 'mock'
 *
 * Both address the player directly about their choice.
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
  const approveId = findTopSkill(deltas, cumulativeScores)

  if (!approveId) {
    return { approve: null, dissent: null }
  }

  // Find the dissenting skill: top skill from the opposite choice
  const oppositeDeltas = computeOppositeDeltas(question, answerValue)
  const dissentId = findTopSkill(oppositeDeltas, cumulativeScores, approveId)

  const approveSkill = skillMap[approveId]
  const dissentSkill = dissentId ? skillMap[dissentId] : undefined

  const approveCtx: VoiceContext = {
    choice: choiceLabel,
    attribute: approveSkill?.attributeChinese ?? '',
    skillName: approveSkill?.chinese ?? approveId,
    rivalSkill: dissentSkill?.chinese ?? '',
    score: cumulativeScores[approveId] ?? 0,
    questionNum,
  }

  const approve = buildVoiceLine(
    approveId,
    voicePacks[approveId],
    'approve',
    approveCtx,
    'approve',
  )

  let dissent: VoiceLine | null = null
  if (dissentId) {
    const dissentCtx: VoiceContext = {
      choice: choiceLabel,
      attribute: dissentSkill?.attributeChinese ?? '',
      skillName: dissentSkill?.chinese ?? dissentId,
      rivalSkill: approveSkill?.chinese ?? '',
      score: cumulativeScores[dissentId] ?? 0,
      questionNum,
    }
    dissent = buildVoiceLine(
      dissentId,
      voicePacks[dissentId],
      'mock',
      dissentCtx,
      'dissent',
    )
  }

  return { approve, dissent }
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
 * The rival skill interjects with a 'mock' line.
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
  if (rivalPack) {
    const mockLine = pickRandom(rivalPack.voice.mock ?? [])
    if (mockLine) {
      rivalInterjection = fillTemplate(mockLine, {
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
