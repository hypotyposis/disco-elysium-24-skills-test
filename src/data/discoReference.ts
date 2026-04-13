import reference from './discoSkillReference.json'

import type {
  AttributeReference,
  DiscoReference,
  SkillReference,
} from '../types/quiz.ts'

export const discoReference = reference as DiscoReference

export const attributeMap = Object.fromEntries(
  discoReference.attributes.map((attribute) => [attribute.english, attribute]),
) as Record<string, AttributeReference>

export const skillMap = Object.fromEntries(
  discoReference.skills.map((skill) => [skill.english, skill]),
) as Record<string, SkillReference>
