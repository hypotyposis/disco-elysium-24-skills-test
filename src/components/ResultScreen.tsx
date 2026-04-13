import { useState } from 'react'

import {
  buildVoicePortraitLineup,
  dossierArtifactAssets,
  getSkillPortraitAsset,
} from '../data/discoAssets.ts'
import { skillFlavorNotes } from '../data/resultCopy.ts'
import type { ResultNarrative } from '../lib/resultNarrative.ts'
import type { DiscoReference, QuizResult } from '../types/quiz.ts'
import { AttributeDiamond } from './AttributeDiamond.tsx'
import { DossierArtifact } from './DossierArtifact.tsx'

interface ResultScreenProps {
  reference: DiscoReference
  result: QuizResult
  narrative: ResultNarrative
  onRestart: () => void
}

export function ResultScreen({
  reference,
  result,
  narrative,
  onRestart,
}: ResultScreenProps) {
  const [copied, setCopied] = useState(false)
  const maxSkillScore = Math.max(result.primarySkill.score, 1)
  const primaryPortrait = getSkillPortraitAsset(result.primarySkill.english)
  const voicePortraitLineup = buildVoicePortraitLineup(result.top3Skills)
  const rankedAttributes = [...reference.attributes].sort((left, right) => {
    const scoreDelta =
      result.attributeScores[right.english] -
      result.attributeScores[left.english]

    if (scoreDelta !== 0) {
      return scoreDelta
    }

    return (
      reference.attributes.findIndex(
        (attribute) => attribute.english === left.english,
      ) -
      reference.attributes.findIndex(
        (attribute) => attribute.english === right.english,
      )
    )
  })

  const getNotchCount = (score: number) => {
    if (score <= 0) {
      return 0
    }

    return Math.max(1, Math.round((score / maxSkillScore) * 5))
  }

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return
    }

    await navigator.clipboard.writeText(narrative.shareText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="result-screen">
      <header className="verdict-sheet dossier-sheet">
        <div className="sheet-meta sheet-meta--result">
          <span className="file-label">结案记录 / internal voice</span>
          <span>归档完成</span>
        </div>

        <div className="verdict-sheet__body">
          <div className="verdict-sheet__copy">
            <div className="verdict-nameblock">
              <p className="verdict-nameblock__prefix">主导技能</p>
              <h1>{result.primarySkill.chinese}</h1>
              <p className="verdict-nameblock__english">
                {result.primarySkill.english}
              </p>
            </div>

            <div className="verdict-summary">
              <p className="verdict-summary__lead">{narrative.punchline}</p>
              <p>{narrative.summary}</p>
            </div>
          </div>

          {primaryPortrait && (
            <div className="verdict-portrait-panel">
              <figure className="verdict-portrait-frame">
                <img
                  alt={`${result.primarySkill.chinese} ${result.primarySkill.english} 肖像`}
                  className="verdict-portrait-frame__image"
                  loading="eager"
                  src={primaryPortrait.src}
                />
                <figcaption className="verdict-portrait-frame__label">
                  <span>主导声部 / lead voice</span>
                  <strong>{result.primarySkill.chinese}</strong>
                </figcaption>
              </figure>

              <ol className="verdict-voice-lineup" aria-label="前三声部肖像">
                {voicePortraitLineup.map((item) => (
                  <li
                    className={`verdict-voice-chip${item.isPrimary ? ' is-primary' : ''}`}
                    key={item.skill.english}
                  >
                    <figure className="verdict-voice-chip__portrait">
                      <img
                        alt={`${item.skill.chinese} ${item.skill.english} 肖像`}
                        loading={item.isPrimary ? 'eager' : 'lazy'}
                        src={item.portrait.src}
                      />
                    </figure>
                    <div className="verdict-voice-chip__meta">
                      <span>{item.rankLabel}</span>
                      <strong>{item.skill.chinese}</strong>
                      <small>{item.skill.english}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="verdict-fragments">
          <div className="verdict-fragment">
            <span>主导属性</span>
            <strong>{narrative.dominantAttribute.chinese}</strong>
          </div>
          <div className="verdict-fragment">
            <span>第二声部</span>
            <strong>{narrative.secondarySkill.chinese}</strong>
          </div>
          <div className="verdict-fragment">
            <span>第三声部</span>
            <strong>{narrative.tertiarySkill.chinese}</strong>
          </div>
        </div>

        <div className="verdict-actions">
          <button className="document-button" type="button" onClick={onRestart}>
            重新测试
          </button>
          <button
            className="document-button document-button--ghost"
            type="button"
            onClick={() => void handleCopy()}
          >
            {copied ? '摘要已复制' : '复制结果摘要'}
          </button>
        </div>
      </header>

      <div className="result-dossier-grid">
        <section className="case-notes">
          <div className="section-record section-record--artifact">
            <div className="section-record__stack">
              <p className="file-label">回响记录</p>
              <h2>最响的三份证词</h2>
            </div>
            <DossierArtifact
              asset={dossierArtifactAssets.ledger}
              className="dossier-artifact--ledger"
            />
          </div>

          <ol className="voice-dockets">
            {result.top3Skills.map((skill, index) => {
              const flavor = skillFlavorNotes[skill.english]

              return (
                <li
                  className={`voice-docket${index === 0 ? ' voice-docket--primary' : ''}`}
                  key={skill.english}
                >
                  <div className="voice-docket__head">
                    <span>证词 {String(index + 1).padStart(2, '0')}</span>
                    <span>强度 {skill.score}</span>
                  </div>
                  <div className="voice-docket__title">
                    <strong>{skill.chinese}</strong>
                    <span>{skill.english}</span>
                  </div>
                  <p>{flavor.punchline}</p>
                </li>
              )
            })}
          </ol>
        </section>

        <aside className="thought-note">
          <DossierArtifact
            asset={dossierArtifactAssets.pen}
            className="dossier-artifact--pen thought-note__artifact"
          />
          <p className="file-label">思维橱柜倾向</p>
          <h2>{narrative.thoughtTitle}</h2>
          <p>{narrative.thoughtBody}</p>
        </aside>
      </div>

      <section className="attribute-sheet">
        <div className="section-record">
          <p className="file-label">属性现场图</p>
          <h2>四大属性在给哪股冲动供电</h2>
        </div>

        <div className="attribute-sheet__body">
          <AttributeDiamond
            attributes={reference.attributes}
            scores={result.attributeScores}
          />

          <ol className="attribute-dockets">
            {rankedAttributes.map((attribute, index) => (
              <li
                className={`attribute-docket${index === 0 ? ' is-dominant' : ''}`}
                key={attribute.english}
              >
                <div>
                  <strong>{attribute.chinese}</strong>
                  <span>{attribute.short}</span>
                </div>
                <span className="attribute-docket__score">
                  {result.attributeScores[attribute.english]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="skills-sheet">
        <div className="section-record">
          <p className="file-label">总档案</p>
          <h2>二十四种技能，按卷归档</h2>
        </div>

        <div className="skills-sheet__board">
          {result.groupedSkills.map((group, groupIndex) => (
            <article
              className={`skill-folder skill-folder--${groupIndex + 1}`}
              key={group.attribute.english}
            >
              <div className="skill-folder__head">
                <div>
                  <h3>{group.attribute.chinese}</h3>
                  <span>{group.attribute.short}</span>
                </div>
                <strong>{group.attribute.english}</strong>
              </div>

              <ol className="skill-folder__rows">
                {group.skills.map((skill, skillIndex) => {
                  const notchCount = getNotchCount(skill.score)
                  const isPrimary =
                    skill.english === result.primarySkill.english
                  const isTopThree = result.top3Skills.some(
                    (topSkill) => topSkill.english === skill.english,
                  )

                  return (
                    <li
                      className={`skill-entry${isPrimary ? ' is-primary' : ''}${isTopThree ? ' is-top-three' : ''}`}
                      key={skill.english}
                    >
                      <span className="skill-entry__index">
                        {String(skillIndex + 1).padStart(2, '0')}
                      </span>
                      <div className="skill-entry__copy">
                        <strong>{skill.chinese}</strong>
                        <span>{skill.english}</span>
                      </div>
                      <div className="skill-entry__notches" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, notchIndex) => (
                          <span
                            className={
                              notchIndex < notchCount
                                ? 'skill-entry__notch is-filled'
                                : 'skill-entry__notch'
                            }
                            key={`${skill.english}-${notchIndex}`}
                          />
                        ))}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
