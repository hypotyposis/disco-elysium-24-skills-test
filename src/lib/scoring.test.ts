import assert from 'node:assert/strict'
import test from 'node:test'

import { scoreQuiz } from './scoring.ts'

const reference = {
  attributes: [
    {
      english: 'Intellect',
      chinese: '智力',
      short: '分析',
      articyId: 'attr-1',
    },
    { english: 'Psyche', chinese: '精神', short: '情感', articyId: 'attr-2' },
    { english: 'Fysique', chinese: '体格', short: '本能', articyId: 'attr-3' },
    { english: 'Motorics', chinese: '身手', short: '反应', articyId: 'attr-4' },
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
} as const

const questions = [
  {
    id: 'q-likert',
    kind: 'likert',
    prompt: '线索比预感更值得信赖。',
    monologue: '先把情绪按住。',
    agree: {
      skills: { Logic: 3 },
      attributes: { Intellect: 2 },
    },
    disagree: {
      skills: { Shivers: 2 },
      attributes: { Fysique: 1 },
    },
  },
  {
    id: 'q-scenario',
    kind: 'scenario',
    prompt: '嫌疑人盯着你沉默不语。',
    monologue: '房间里只有你的呼吸还在动。',
    options: [
      {
        id: 'scenario-a',
        label: '盯回去，等他先露馅。',
        insight: '你相信直觉会先发声。',
        effects: {
          skills: { Shivers: 2, Empathy: 1 },
          attributes: { Fysique: 2, Psyche: 1 },
        },
      },
      {
        id: 'scenario-b',
        label: '拆解证词里的每一个矛盾点。',
        insight: '让逻辑把门撬开。',
        effects: {
          skills: { Logic: 1 },
          attributes: { Intellect: 1 },
        },
      },
    ],
  },
] as const

test('scoreQuiz accumulates direct skill scores and normalizes attributes', () => {
  const result = scoreQuiz({
    reference,
    questions,
    answers: [
      { questionId: 'q-likert', value: 2 },
      { questionId: 'q-scenario', value: 'scenario-a' },
    ],
  })

  assert.equal(result.primarySkill.english, 'Logic')
  assert.deepEqual(
    result.top3Skills.map((skill) => skill.english),
    ['Logic', 'Shivers', 'Empathy'],
  )
  assert.equal(result.skillScores.Logic, 6)
  assert.equal(result.skillScores.Shivers, 2)
  assert.equal(result.attributeScores.Intellect, 80)
  assert.equal(result.attributeScores.Fysique, 50)
  assert.equal(result.attributeScores.Psyche, 100)
  assert.equal(result.attributeScores.Motorics, 0)
})

test('scoreQuiz falls back to reference order when scores tie', () => {
  const result = scoreQuiz({
    reference,
    questions: [
      {
        id: 'scenario-only',
        kind: 'scenario',
        prompt: '你先听谁说话？',
        monologue: '脑内法庭准备开庭。',
        options: [
          {
            id: 'tie-option',
            label: '两种声音一样大。',
            insight: '平局不会持续太久。',
            effects: {
              skills: { Logic: 2, Empathy: 2 },
              attributes: { Intellect: 1, Psyche: 1 },
            },
          },
        ],
      },
    ],
    answers: [{ questionId: 'scenario-only', value: 'tie-option' }],
  })

  assert.equal(result.primarySkill.english, 'Logic')
  assert.deepEqual(
    result.top3Skills.map((skill) => skill.english),
    ['Logic', 'Empathy', 'Shivers'],
  )
})
