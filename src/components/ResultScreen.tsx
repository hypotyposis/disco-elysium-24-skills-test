import { useMemo, useRef, useState, type CSSProperties } from 'react'

import {
  buildVoicePortraitLineup,
  dossierArtifactAssets,
  getResultPosterArtSpec,
  getSkillPortraitAsset,
  normalizeSkillPortraitSlug,
} from '../data/discoAssets.ts'
import { skillFlavorNotes } from '../data/resultCopy.ts'
import { resultCopy } from '../data/uiCopy.ts'
import { voicePackMap } from '../data/voicePacks.ts'
import type { ResultNarrative } from '../lib/resultNarrative.ts'
import { buildMonologue } from '../lib/voiceEngine.ts'
import type { DiscoReference, QuizResult } from '../types/quiz.ts'
import { AttributeDiamond } from './AttributeDiamond.tsx'
import { CharacterReviewSection } from './CharacterReview.tsx'
import { DossierArtifact } from './DossierArtifact.tsx'
import { SkillMonologue } from './SkillMonologue.tsx'

interface ResultScreenProps {
  hesitationCount: number
  reference: DiscoReference
  result: QuizResult
  narrative: ResultNarrative
  onRestart: () => void
}

export function ResultScreen({
  hesitationCount,
  reference,
  result,
  narrative,
  onRestart,
}: ResultScreenProps) {
  const [exportState, setExportState] = useState<
    'idle' | 'saving' | 'saved' | 'error'
  >('idle')
  const posterRef = useRef<HTMLDivElement>(null)
  const maxSkillScore = Math.max(result.primarySkill.score, 1)
  const primaryPortrait = getSkillPortraitAsset(result.primarySkill.english)
  const posterArt = getResultPosterArtSpec(
    result.primarySkill.english,
    narrative.dominantAttribute.english,
  )
  const posterStyle = {
    '--poster-backdrop-image': `url(${posterArt.backdrop.src})`,
  } as CSSProperties
  const voicePortraitLineup = buildVoicePortraitLineup(result.top3Skills)
  const monologue = useMemo(
    () => buildMonologue(result, voicePackMap),
    [result],
  )
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

  const handleExportPoster = async () => {
    if (!posterRef.current) {
      return
    }

    setExportState('saving')

    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#170d0b',
        imageTimeout: 0,
        logging: false,
        scale: 2,
        useCORS: true,
      })
      const link = document.createElement('a')

      link.download = `disco-skills-${normalizeSkillPortraitSlug(result.primarySkill.english)}-poster.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setExportState('saved')
    } catch {
      setExportState('error')
    }

    window.setTimeout(() => setExportState('idle'), 2200)
  }

  return (
    <section className="result-screen">
      <header className="verdict-sheet dossier-sheet">
        <div className="sheet-meta sheet-meta--result">
          <span className="file-label">{resultCopy.reportLabel}</span>
          <span>{resultCopy.reportComplete}</span>
        </div>

        <div className="verdict-poster-frame">
          <div className="verdict-poster" ref={posterRef} style={posterStyle}>
            <div className="verdict-poster__wash" aria-hidden="true" />

            <div className="verdict-poster__topline">
              <span>Voice Trace / poster cut</span>
              <span>{posterArt.docket}</span>
            </div>

            <DossierArtifact
              asset={posterArt.artifact}
              className="verdict-poster__artifact"
            />

            <div className="verdict-poster__body">
              <div className="verdict-poster__copy">
                <p className="verdict-poster__prefix">{resultCopy.posterPrefix}</p>
                <h1>{result.primarySkill.chinese}</h1>
                <p className="verdict-poster__english">
                  {result.primarySkill.english}
                </p>
                <p className="verdict-poster__punchline">
                  {narrative.punchline}
                </p>
              </div>

              {primaryPortrait && (
                <figure className="verdict-poster__portrait">
                  <img
                    alt={`${result.primarySkill.chinese} ${result.primarySkill.english} 肖像`}
                    className="verdict-poster__portrait-image"
                    loading="eager"
                    src={primaryPortrait.src}
                  />
                  <figcaption className="verdict-poster__portrait-label">
                    <span>{resultCopy.posterPortraitLabel}</span>
                    <strong>{result.primarySkill.chinese}</strong>
                  </figcaption>
                </figure>
              )}
            </div>

            <div className="verdict-poster__facts">
              <div>
                <span>{resultCopy.dominantAttribute}</span>
                <strong>{narrative.dominantAttribute.chinese}</strong>
              </div>
              <div>
                <span>{resultCopy.secondTrait}</span>
                <strong>{narrative.secondarySkill.chinese}</strong>
              </div>
              <div>
                <span>{resultCopy.thoughtPattern}</span>
                <strong>{narrative.thoughtTitle}</strong>
              </div>
            </div>

            <div className="verdict-poster__footer">
              <div className="verdict-poster__quote">
                <span>{resultCopy.summaryLabel}</span>
                <p>{narrative.summary}</p>
              </div>

              <ol
                className="verdict-poster__lineup"
                aria-label={resultCopy.lineupAriaLabel}
              >
                {voicePortraitLineup.map((item) => (
                  <li key={item.skill.english}>
                    <figure className="verdict-poster__lineup-portrait">
                      <img
                        alt={`${item.skill.chinese} ${item.skill.english} 肖像`}
                        loading={item.isPrimary ? 'eager' : 'lazy'}
                        src={item.portrait.src}
                      />
                    </figure>
                    <div className="verdict-poster__lineup-copy">
                      <span>{item.rankLabel}</span>
                      <strong>{item.skill.chinese}</strong>
                      <small>{item.skill.english}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="verdict-brief">
          <SkillMonologue monologue={monologue} />

          <CharacterReviewSection
            primarySkillEnglish={result.primarySkill.english}
            dominantAttribute={narrative.dominantAttribute.english}
          />

          <div className="verdict-fragments">
            <div className="verdict-fragment">
              <span>{resultCopy.dominantAttribute}</span>
              <strong>{narrative.dominantAttribute.chinese}</strong>
            </div>
            <div className="verdict-fragment">
              <span>{resultCopy.secondTrait}</span>
              <strong>{narrative.secondarySkill.chinese}</strong>
            </div>
            <div className="verdict-fragment">
              <span>{resultCopy.thirdTrait}</span>
              <strong>{narrative.tertiarySkill.chinese}</strong>
            </div>
          </div>

          <div className="verdict-actions">
            <button
              className="document-button"
              type="button"
              onClick={() => void handleExportPoster()}
            >
              {exportState === 'saving'
                ? resultCopy.exportSaving
                : exportState === 'saved'
                  ? resultCopy.exportSaved
                  : exportState === 'error'
                    ? resultCopy.exportError
                    : resultCopy.exportButton}
            </button>
            <button
              className="document-button document-button--ghost"
              type="button"
              onClick={onRestart}
            >
              {resultCopy.restartButton}
            </button>
          </div>
        </div>
      </header>

      <div className="result-dossier-grid">
        <section className="case-notes">
          <div className="section-record section-record--artifact">
            <div className="section-record__stack">
              <p className="file-label">{resultCopy.traitRecordLabel}</p>
              <h2>{resultCopy.traitRecordTitle}</h2>
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
                    <span>{resultCopy.traitDocket(index)}</span>
                    <span>{resultCopy.traitScore(skill.score)}</span>
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
          <p className="file-label">{resultCopy.thoughtLabel}</p>
          <h2>{narrative.thoughtTitle}</h2>
          <p>{narrative.thoughtBody}</p>
        </aside>

        {hesitationCount > 0 && (
          <aside className="thought-note thought-note--hesitation">
            <p className="file-label">{resultCopy.hesitationLabel}</p>
            <h2>{resultCopy.hesitationTitle(hesitationCount)}</h2>
            <p>
              {hesitationCount >= 6
                ? resultCopy.hesitationHigh
                : hesitationCount >= 3
                  ? resultCopy.hesitationMedium
                  : resultCopy.hesitationLow}
            </p>
          </aside>
        )}
      </div>

      <section className="attribute-sheet">
        <div className="section-record">
          <p className="file-label">{resultCopy.attributeMapLabel}</p>
          <h2>{resultCopy.attributeMapTitle}</h2>
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
          <p className="file-label">{resultCopy.archiveLabel}</p>
          <h2>{resultCopy.archiveTitle}</h2>
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
