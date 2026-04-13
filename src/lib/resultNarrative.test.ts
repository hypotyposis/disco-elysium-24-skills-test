import assert from 'node:assert/strict'
import test from 'node:test'

import { buildResultNarrative } from './resultNarrative.ts'
import type { DiscoReference, QuizResult } from '../types/quiz.ts'

const reference = {
  attributes: [
    {
      english: 'Intellect',
      chinese: '智力',
      short: '分析',
      articyId: 'attr-1',
    },
    {
      english: 'Psyche',
      chinese: '精神',
      short: '情感',
      articyId: 'attr-2',
    },
    {
      english: 'Fysique',
      chinese: '体格',
      short: '本能',
      articyId: 'attr-3',
    },
    {
      english: 'Motorics',
      chinese: '身手',
      short: '反应',
      articyId: 'attr-4',
    },
  ],
  skills: [
    {
      english: 'Logic',
      chinese: '逻辑思维',
      short: '推理',
      long: '推理',
      attributeEnglish: 'Intellect',
      attributeChinese: '智力',
      articyId: 'skill-1',
    },
    {
      english: 'Empathy',
      chinese: '通情达理',
      short: '感受',
      long: '感受',
      attributeEnglish: 'Psyche',
      attributeChinese: '精神',
      articyId: 'skill-2',
    },
    {
      english: 'Shivers',
      chinese: '天人感应',
      short: '倾听',
      long: '倾听',
      attributeEnglish: 'Fysique',
      attributeChinese: '体格',
      articyId: 'skill-3',
    },
  ],
} satisfies DiscoReference

const result = {
  skillScores: {
    Logic: 8,
    Empathy: 6,
    Shivers: 4,
  },
  attributeRawScores: {
    Intellect: 4,
    Psyche: 3,
    Fysique: 2,
    Motorics: 1,
  },
  attributeMaxScores: {
    Intellect: 5,
    Psyche: 5,
    Fysique: 5,
    Motorics: 5,
  },
  attributeScores: {
    Intellect: 80,
    Psyche: 60,
    Fysique: 40,
    Motorics: 20,
  },
  rankedSkills: [
    {
      english: 'Logic',
      chinese: '逻辑思维',
      short: '推理',
      long: '推理',
      attributeEnglish: 'Intellect',
      attributeChinese: '智力',
      articyId: 'skill-1',
      score: 8,
    },
    {
      english: 'Empathy',
      chinese: '通情达理',
      short: '感受',
      long: '感受',
      attributeEnglish: 'Psyche',
      attributeChinese: '精神',
      articyId: 'skill-2',
      score: 6,
    },
    {
      english: 'Shivers',
      chinese: '天人感应',
      short: '倾听',
      long: '倾听',
      attributeEnglish: 'Fysique',
      attributeChinese: '体格',
      articyId: 'skill-3',
      score: 4,
    },
  ],
  primarySkill: {
    english: 'Logic',
    chinese: '逻辑思维',
    short: '推理',
    long: '推理',
    attributeEnglish: 'Intellect',
    attributeChinese: '智力',
    articyId: 'skill-1',
    score: 8,
  },
  top3Skills: [
    {
      english: 'Logic',
      chinese: '逻辑思维',
      short: '推理',
      long: '推理',
      attributeEnglish: 'Intellect',
      attributeChinese: '智力',
      articyId: 'skill-1',
      score: 8,
    },
    {
      english: 'Empathy',
      chinese: '通情达理',
      short: '感受',
      long: '感受',
      attributeEnglish: 'Psyche',
      attributeChinese: '精神',
      articyId: 'skill-2',
      score: 6,
    },
    {
      english: 'Shivers',
      chinese: '天人感应',
      short: '倾听',
      long: '倾听',
      attributeEnglish: 'Fysique',
      attributeChinese: '体格',
      articyId: 'skill-3',
      score: 4,
    },
  ],
  groupedSkills: [
    {
      attribute: reference.attributes[0],
      skills: [
        {
          english: 'Logic',
          chinese: '逻辑思维',
          short: '推理',
          long: '推理',
          attributeEnglish: 'Intellect',
          attributeChinese: '智力',
          articyId: 'skill-1',
          score: 8,
        },
      ],
    },
    {
      attribute: reference.attributes[1],
      skills: [
        {
          english: 'Empathy',
          chinese: '通情达理',
          short: '感受',
          long: '感受',
          attributeEnglish: 'Psyche',
          attributeChinese: '精神',
          articyId: 'skill-2',
          score: 6,
        },
      ],
    },
    {
      attribute: reference.attributes[2],
      skills: [
        {
          english: 'Shivers',
          chinese: '天人感应',
          short: '倾听',
          long: '倾听',
          attributeEnglish: 'Fysique',
          attributeChinese: '体格',
          articyId: 'skill-3',
          score: 4,
        },
      ],
    },
    {
      attribute: reference.attributes[3],
      skills: [],
    },
  ],
} satisfies QuizResult

test('buildResultNarrative exposes structured share variants for multiple platforms', () => {
  const narrative = buildResultNarrative(reference, result)

  assert.deepEqual(
    narrative.shareVariants.map((variant) => variant.id),
    ['moments', 'x', 'minimal'],
  )

  const momentsVariant = narrative.shareVariants[0]
  assert.equal(momentsVariant.label, '朋友圈版')
  assert.match(momentsVariant.text, /逻辑思维 Logic/)
  assert.match(
    momentsVariant.text,
    /脑内前三声部：逻辑思维 \/ 通情达理 \/ 天人感应。/,
  )
  assert.match(
    momentsVariant.text,
    /你的脑内书记官先整理证据，再允许情绪发言。/,
  )
  assert.match(
    momentsVariant.text,
    /你把世界看成待解的结构题，裂缝比表象更重要。/,
  )

  const xVariant = narrative.shareVariants[1]
  assert.equal(xVariant.label, 'Twitter / X版')
  assert.match(xVariant.text, /Lead voice: 逻辑思维 Logic/)
  assert.match(xVariant.text, /Top 3: 逻辑思维 \/ 通情达理 \/ 天人感应/)
  assert.match(xVariant.text, /#DiscoElysium #SkillsTest/)

  const minimalVariant = narrative.shareVariants[2]
  assert.equal(minimalVariant.label, '极简版')
  assert.match(
    minimalVariant.text,
    /判词：你的脑内书记官先整理证据，再允许情绪发言。/,
  )
})
