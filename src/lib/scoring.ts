import type {
  AttributeKey,
  AttributeWeights,
  DiscoReference,
  GroupedSkills,
  QuizAnswer,
  QuizQuestion,
  QuizResult,
  ScoredSkill,
  ScoreVector,
  SkillWeights,
} from '../types/quiz.ts'

interface ScoreQuizInput {
  reference: DiscoReference
  questions: readonly QuizQuestion[]
  answers: readonly QuizAnswer[]
}

const LIKERT_MIN = -2
const LIKERT_MAX = 2

export function scoreQuiz({
  reference,
  questions,
  answers,
}: ScoreQuizInput): QuizResult {
  const skillScores = createZeroSkillScores(reference)
  const attributeRawScores = createZeroAttributeScores(reference)
  const answerMap = new Map(
    answers.map((answer) => [answer.questionId, answer.value]),
  )

  for (const question of questions) {
    const answerValue = answerMap.get(question.id)

    if (answerValue === undefined) {
      continue
    }

    const effects = resolveQuestionEffects(question, answerValue)
    applyEffects(skillScores, attributeRawScores, effects)
  }

  const rankedSkills = rankSkills(reference, skillScores)
  const attributeMaxScores = calculateAttributeMaxScores(reference, questions)
  const attributeScores = normalizeAttributeScores(
    attributeRawScores,
    attributeMaxScores,
  )

  return {
    skillScores,
    attributeRawScores,
    attributeMaxScores,
    attributeScores,
    rankedSkills,
    primarySkill: rankedSkills[0],
    top3Skills: rankedSkills.slice(0, 3),
    groupedSkills: groupSkillsByAttribute(reference, rankedSkills),
  }
}

function createZeroSkillScores(
  reference: DiscoReference,
): Record<string, number> {
  return Object.fromEntries(reference.skills.map((skill) => [skill.english, 0]))
}

function createZeroAttributeScores(
  reference: Pick<DiscoReference, 'attributes'>,
): Record<AttributeKey, number> {
  return Object.fromEntries(
    reference.attributes.map((attribute) => [attribute.english, 0]),
  ) as Record<AttributeKey, number>
}

function resolveQuestionEffects(
  question: QuizQuestion,
  answerValue: QuizAnswer['value'],
): ScoreVector {
  if (question.kind === 'likert') {
    if (typeof answerValue !== 'number') {
      throw new Error(
        `Likert question "${question.id}" requires a numeric answer.`,
      )
    }

    const intensity = clamp(Math.trunc(answerValue), LIKERT_MIN, LIKERT_MAX)

    if (intensity > 0) {
      return scaleScoreVector(question.agree, intensity)
    }

    if (intensity < 0) {
      return scaleScoreVector(question.disagree, Math.abs(intensity))
    }

    return {}
  }

  if (typeof answerValue !== 'string') {
    throw new Error(`Scenario question "${question.id}" requires an option id.`)
  }

  const selectedOption = question.options.find(
    (option) => option.id === answerValue,
  )

  if (!selectedOption) {
    throw new Error(
      `Scenario answer "${answerValue}" was not found for question "${question.id}".`,
    )
  }

  return selectedOption.effects
}

function scaleScoreVector(
  vector: ScoreVector,
  multiplier: number,
): ScoreVector {
  return {
    skills: scaleWeights(vector.skills, multiplier),
    attributes: scaleWeights(vector.attributes, multiplier),
  }
}

function scaleWeights<T extends SkillWeights | AttributeWeights>(
  weights: T | undefined,
  multiplier: number,
): T | undefined {
  if (!weights) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [
      key,
      (value ?? 0) * multiplier,
    ]),
  ) as T
}

function applyEffects(
  skillScores: Record<string, number>,
  attributeScores: Record<AttributeKey, number>,
  effects: ScoreVector,
): void {
  if (effects.skills) {
    for (const [skillName, weight] of Object.entries(effects.skills)) {
      skillScores[skillName] = (skillScores[skillName] ?? 0) + (weight ?? 0)
    }
  }

  if (effects.attributes) {
    for (const [attributeKey, weight] of Object.entries(effects.attributes)) {
      attributeScores[attributeKey as AttributeKey] += weight ?? 0
    }
  }
}

function rankSkills(
  reference: DiscoReference,
  skillScores: Record<string, number>,
): ScoredSkill[] {
  const skillOrder = new Map(
    reference.skills.map((skill, index) => [skill.english, index]),
  )

  return reference.skills
    .map((skill) => ({
      ...skill,
      score: skillScores[skill.english] ?? 0,
    }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        (skillOrder.get(left.english) ?? Number.MAX_SAFE_INTEGER) -
          (skillOrder.get(right.english) ?? Number.MAX_SAFE_INTEGER),
    )
}

function calculateAttributeMaxScores(
  reference: DiscoReference,
  questions: readonly QuizQuestion[],
): Record<AttributeKey, number> {
  const maxScores = createZeroAttributeScores(reference)

  for (const question of questions) {
    if (question.kind === 'likert') {
      for (const attribute of reference.attributes) {
        const agreeWeight =
          (question.agree.attributes?.[attribute.english] ?? 0) * 2
        const disagreeWeight =
          (question.disagree.attributes?.[attribute.english] ?? 0) * 2

        maxScores[attribute.english] += Math.max(agreeWeight, disagreeWeight)
      }

      continue
    }

    for (const attribute of reference.attributes) {
      const highestOptionWeight = Math.max(
        ...question.options.map(
          (option) => option.effects.attributes?.[attribute.english] ?? 0,
        ),
        0,
      )

      maxScores[attribute.english] += highestOptionWeight
    }
  }

  return maxScores
}

function normalizeAttributeScores(
  rawScores: Record<AttributeKey, number>,
  maxScores: Record<AttributeKey, number>,
): Record<AttributeKey, number> {
  return Object.fromEntries(
    Object.entries(rawScores).map(([attributeKey, rawScore]) => {
      const maxScore = maxScores[attributeKey as AttributeKey]

      if (!maxScore) {
        return [attributeKey, 0]
      }

      return [attributeKey, Math.round((rawScore / maxScore) * 100)]
    }),
  ) as Record<AttributeKey, number>
}

function groupSkillsByAttribute(
  reference: DiscoReference,
  rankedSkills: ScoredSkill[],
): GroupedSkills[] {
  return reference.attributes.map((attribute) => ({
    attribute,
    skills: rankedSkills.filter(
      (skill) => skill.attributeEnglish === attribute.english,
    ),
  }))
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum)
}
