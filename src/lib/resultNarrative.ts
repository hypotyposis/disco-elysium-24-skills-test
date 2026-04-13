import {
  shareCopyVariantTemplates,
  skillFlavorNotes,
  type ShareCopyVariantId,
  type ShareCopyVariantTemplate,
  type SkillFlavorNote,
} from '../data/resultCopy.ts'
import type {
  AttributeReference,
  DiscoReference,
  QuizResult,
  ScoredSkill,
} from '../types/quiz.ts'

export interface ResultShareVariant {
  id: ShareCopyVariantId
  label: string
  description: string
  text: string
}

export interface ResultNarrative {
  punchline: string
  summary: string
  dominantAttribute: AttributeReference
  secondarySkill: ScoredSkill
  tertiarySkill: ScoredSkill
  thoughtTitle: string
  thoughtBody: string
  shareVariants: ResultShareVariant[]
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

  const shareVariants = buildShareVariants({
    primarySkill: result.primarySkill,
    primaryNote,
    top3Skills: [result.primarySkill, secondarySkill, tertiarySkill],
  })

  return {
    punchline: primaryNote.punchline,
    summary,
    dominantAttribute,
    secondarySkill,
    tertiarySkill,
    thoughtTitle: primaryNote.thoughtTitle,
    thoughtBody,
    shareVariants,
  }
}

function buildShareVariants({
  primarySkill,
  primaryNote,
  top3Skills,
}: {
  primarySkill: ScoredSkill
  primaryNote: SkillFlavorNote
  top3Skills: readonly [ScoredSkill, ScoredSkill, ScoredSkill]
}): ResultShareVariant[] {
  const leadSkill = formatLeadSkill(primarySkill)
  const topVoices = formatTopVoices(top3Skills)

  return shareCopyVariantTemplates.map((template) => ({
    id: template.id,
    label: template.label,
    description: template.description,
    text: buildShareVariantText(template, {
      leadSkill,
      topVoices,
      primaryNote,
    }),
  }))
}

function buildShareVariantText(
  template: ShareCopyVariantTemplate,
  context: {
    leadSkill: string
    topVoices: string
    primaryNote: SkillFlavorNote
  },
): string {
  return [
    formatTemplatedLine(
      template.leadIntro,
      context.leadSkill,
      template.leadOutro,
    ),
    formatTemplatedLine(
      template.topVoicesPrefix,
      context.topVoices,
      template.topVoicesOutro,
    ),
    template.includePunchline
      ? `${template.punchlinePrefix ?? ''}${context.primaryNote.punchline}`
      : '',
    template.includeWorldview
      ? `${template.worldviewPrefix ?? ''}${context.primaryNote.worldview}`
      : '',
    template.callToAction ?? '',
    template.hashtags?.join(' ') ?? '',
  ]
    .filter((line) => line.trim().length > 0)
    .join('\n')
}

function formatLeadSkill(skill: ScoredSkill): string {
  return `${skill.chinese} ${skill.english}`
}

function formatTopVoices(skills: readonly ScoredSkill[]): string {
  return skills.map((skill) => skill.chinese).join(' / ')
}

function formatTemplatedLine(
  prefix: string,
  content: string,
  suffix = '',
): string {
  return `${prefix}${content}${suffix}`
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
