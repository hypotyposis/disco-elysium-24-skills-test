import { skillFlavorNotes } from '../data/resultCopy.ts'
import type {
  AttributeReference,
  DiscoReference,
  QuizResult,
  ScoredSkill,
} from '../types/quiz.ts'

export interface ResultNarrative {
  punchline: string
  summary: string
  dominantAttribute: AttributeReference
  secondarySkill: ScoredSkill
  tertiarySkill: ScoredSkill
  thoughtTitle: string
  thoughtBody: string
  shareText: string
}

export function buildResultNarrative(
  reference: DiscoReference,
  result: QuizResult,
): ResultNarrative {
  const primaryNote = skillFlavorNotes[result.primarySkill.english]
  const secondarySkill = result.top3Skills[1] ?? result.top3Skills[0]
  const tertiarySkill =
    result.top3Skills[2] ?? result.top3Skills[1] ?? result.top3Skills[0]
  const dominantAttribute = pickDominantAttribute(reference, result)
  const secondaryNote = skillFlavorNotes[secondarySkill.english]

  const summary = [
    primaryNote.worldview,
    `与人相处时，${trimTrailingPunctuation(primaryNote.relations)}，而${secondarySkill.chinese}会在旁边替你补上第二层判断。`,
    `压力上来时，${trimTrailingPunctuation(primaryNote.pressure)}，这股劲通常由${dominantAttribute.chinese}负责供能。`,
  ].join('')

  const thoughtBody = `${primaryNote.thoughtBody}副声部是${secondarySkill.chinese}，所以这张卡片总带着一点${trimTrailingPunctuation(
    secondaryNote.worldview,
  )}`

  const shareText = [
    `主导技能：${result.primarySkill.chinese} ${result.primarySkill.english}`,
    `Top 3 Voices：${result.top3Skills.map((skill) => skill.chinese).join(' / ')}`,
    `判词：${primaryNote.punchline}`,
  ].join('\n')

  return {
    punchline: primaryNote.punchline,
    summary,
    dominantAttribute,
    secondarySkill,
    tertiarySkill,
    thoughtTitle: primaryNote.thoughtTitle,
    thoughtBody,
    shareText,
  }
}

function pickDominantAttribute(
  reference: DiscoReference,
  result: QuizResult,
): AttributeReference {
  return [...reference.attributes].sort((left, right) => {
    const scoreDifference =
      result.attributeScores[right.english] -
      result.attributeScores[left.english]

    if (scoreDifference !== 0) {
      return scoreDifference
    }

    return (
      reference.attributes.findIndex(
        (attribute) => attribute.english === left.english,
      ) -
      reference.attributes.findIndex(
        (attribute) => attribute.english === right.english,
      )
    )
  })[0]
}

function trimTrailingPunctuation(text: string): string {
  return text.replace(/[。！？!?,，；;：:]+$/u, '')
}
