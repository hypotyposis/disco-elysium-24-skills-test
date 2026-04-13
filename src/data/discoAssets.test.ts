import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import {
  buildVoicePortraitLineup,
  dossierArtifactAssets,
  landingBackdropAssets,
  getSkillPortraitAsset,
  normalizeSkillPortraitSlug,
} from './discoAssets.ts'

const discoReference = JSON.parse(
  readFileSync(new URL('./discoSkillReference.json', import.meta.url), 'utf8'),
) as {
  skills: Array<{ english: string }>
}

test('normalizeSkillPortraitSlug handles Disco skill punctuation', () => {
  assert.equal(normalizeSkillPortraitSlug('Visual Calculus'), 'visual-calculus')
  assert.equal(
    normalizeSkillPortraitSlug('Hand/Eye Coordination'),
    'hand-eye-coordination',
  )
  assert.equal(
    normalizeSkillPortraitSlug('Perception (Sight)'),
    'perception-sight',
  )
})

test('getSkillPortraitAsset resolves every reference skill to an existing file', () => {
  for (const skill of discoReference.skills) {
    const portrait = getSkillPortraitAsset(skill.english)

    assert.ok(portrait, `Missing portrait asset for ${skill.english}`)
    assert.equal(portrait.skill, skill.english)
    assert.ok(existsSync(fileURLToPath(portrait.src)), portrait.src)
  }
})

test('buildVoicePortraitLineup preserves ranking and marks the lead portrait', () => {
  const lineup = buildVoicePortraitLineup([
    { english: 'Logic', chinese: '逻辑思维' },
    { english: 'Shivers', chinese: '天人感应' },
    { english: 'Authority', chinese: '权威' },
  ])

  assert.equal(lineup.length, 3)
  assert.deepEqual(
    lineup.map((item) => item.rankLabel),
    ['证词 01', '证词 02', '证词 03'],
  )
  assert.equal(lineup[0].isPrimary, true)
  assert.equal(lineup[1].isPrimary, false)
  assert.equal(lineup[2].isPrimary, false)
  assert.deepEqual(
    lineup.map((item) => item.skill.english),
    ['Logic', 'Shivers', 'Authority'],
  )
})

test('landing and dossier artifact assets resolve to exported files', () => {
  const assets = [
    landingBackdropAssets.lobbyBackdrop,
    landingBackdropAssets.discoElysiumClean,
    dossierArtifactAssets.badge,
    dossierArtifactAssets.ledger,
    dossierArtifactAssets.map,
    dossierArtifactAssets.pen,
  ]

  for (const asset of assets) {
    assert.ok(existsSync(fileURLToPath(asset.src)), asset.src)
  }
})
