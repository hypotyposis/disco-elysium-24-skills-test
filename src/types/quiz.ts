export const attributeOrder = [
  'Intellect',
  'Psyche',
  'Fysique',
  'Motorics',
] as const

export type AttributeKey = (typeof attributeOrder)[number]

export interface AttributeReference {
  english: AttributeKey
  chinese: string
  short: string
  articyId: string
}

export interface SkillReference {
  english: string
  chinese: string
  short: string
  long: string
  attributeEnglish: AttributeKey
  attributeChinese: string
  articyId: string
}

export interface DiscoReference {
  attributes: readonly AttributeReference[]
  skills: readonly SkillReference[]
}

export type SkillWeights = Partial<Record<string, number>>
export type AttributeWeights = Partial<Record<AttributeKey, number>>

export interface ScoreVector {
  skills?: SkillWeights
  attributes?: AttributeWeights
}

export interface QuestionBase {
  id: string
  prompt: string
  monologue: string
}

export interface LikertQuestion extends QuestionBase {
  kind: 'likert'
  agree: ScoreVector
  disagree: ScoreVector
}

export interface ScenarioOption {
  id: string
  label: string
  insight: string
  effects: ScoreVector
}

export interface ScenarioQuestion extends QuestionBase {
  kind: 'scenario'
  options: readonly ScenarioOption[]
}

export type QuizQuestion = LikertQuestion | ScenarioQuestion

export interface QuizAnswer {
  questionId: string
  value: number | string
}

export interface ScoredSkill extends SkillReference {
  score: number
}

export interface GroupedSkills {
  attribute: AttributeReference
  skills: ScoredSkill[]
}

export interface QuizResult {
  skillScores: Record<string, number>
  attributeRawScores: Record<AttributeKey, number>
  attributeMaxScores: Record<AttributeKey, number>
  attributeScores: Record<AttributeKey, number>
  rankedSkills: ScoredSkill[]
  primarySkill: ScoredSkill
  top3Skills: ScoredSkill[]
  groupedSkills: GroupedSkills[]
}
