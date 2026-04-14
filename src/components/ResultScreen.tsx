import { useMemo, useRef, useState, type CSSProperties } from 'react'

import {
  buildVoicePortraitLineup,
  dossierArtifactAssets,
  getResultPosterArtSpec,
  getSkillPortraitAsset,
  normalizeSkillPortraitSlug,
} from '../data/discoAssets.ts'
import { skillFlavorNotes } from '../data/resultCopy.ts'
import { voicePackMap } from '../data/voicePacks.ts'
import type {
  ResultNarrative,
  ResultShareVariant,
} from '../lib/resultNarrative.ts'
import { buildMonologue } from '../lib/voiceEngine.ts'
import type { DiscoReference, QuizResult } from '../types/quiz.ts'
import { AttributeDiamond } from './AttributeDiamond.tsx'
import { CharacterReviewSection } from './CharacterReview.tsx'
import { DossierArtifact } from './DossierArtifact.tsx'
import { SkillMonologue } from './SkillMonologue.tsx'

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
  const [copyState, setCopyState] = useState<{
    status: 'idle' | 'copied' | 'error'
    variantId: ResultShareVariant['id'] | null
  }>({
    status: 'idle',
    variantId: null,
  })
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

  const handleCopy = async (variant: ResultShareVariant) => {
    if (!navigator.clipboard) {
      setCopyState({ status: 'error', variantId: variant.id })
      window.setTimeout(
        () => setCopyState({ status: 'idle', variantId: null }),
        1800,
      )
      return
    }

    try {
      await navigator.clipboard.writeText(variant.text)
      setCopyState({ status: 'copied', variantId: variant.id })
    } catch {
      setCopyState({ status: 'error', variantId: variant.id })
    }

    window.setTimeout(
      () => setCopyState({ status: 'idle', variantId: null }),
      1800,
    )
  }

  const getCopyButtonLabel = (variant: ResultShareVariant) => {
    const variantStatus =
      copyState.variantId === variant.id ? copyState.status : 'idle'

    if (variantStatus === 'copied') {
      return `${variant.label}已复制`
    }

    if (variantStatus === 'error') {
      return '复制失败，请重试'
    }

    return `复制${variant.label}`
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
          <span className="file-label">心理评估报告 / personnel psych profile</span>
          <span>评估完成</span>
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
                <p className="verdict-poster__prefix">主导心理指标 / dominant trait</p>
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
                    <span>主导指标 / portrait cut</span>
                    <strong>{result.primarySkill.chinese}</strong>
                  </figcaption>
                </figure>
              )}
            </div>

            <div className="verdict-poster__facts">
              <div>
                <span>主导属性</span>
                <strong>{narrative.dominantAttribute.chinese}</strong>
              </div>
              <div>
                <span>第二指标</span>
                <strong>{narrative.secondarySkill.chinese}</strong>
              </div>
              <div>
                <span>思维模式</span>
                <strong>{narrative.thoughtTitle}</strong>
              </div>
            </div>

            <div className="verdict-poster__footer">
              <div className="verdict-poster__quote">
                <span>评估摘要</span>
                <p>{narrative.summary}</p>
              </div>

              <ol
                className="verdict-poster__lineup"
                aria-label="前三指标海报线列"
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
          <div className="verdict-summary">
            <p className="verdict-summary__lead">{narrative.punchline}</p>
            <p>{narrative.summary}</p>
          </div>

          <SkillMonologue monologue={monologue} />

          <CharacterReviewSection
            primarySkillEnglish={result.primarySkill.english}
            dominantAttribute={narrative.dominantAttribute.english}
          />

          <div className="verdict-fragments">
            <div className="verdict-fragment">
              <span>主导属性</span>
              <strong>{narrative.dominantAttribute.chinese}</strong>
            </div>
            <div className="verdict-fragment">
              <span>第二指标</span>
              <strong>{narrative.secondarySkill.chinese}</strong>
            </div>
            <div className="verdict-fragment">
              <span>第三指标</span>
              <strong>{narrative.tertiarySkill.chinese}</strong>
            </div>
          </div>

          <section className="share-kit" aria-labelledby="share-kit-title">
            <div className="share-kit__header">
              <p className="file-label">分享文案 / caption kit</p>
              <div className="share-kit__copy">
                <h2 id="share-kit-title">给海报配一句可以真的发出去的话</h2>
                <p>海报负责气氛，文案把主导声部、前三名和那句判词一起补齐。</p>
              </div>
            </div>

            <div className="share-kit__grid">
              {narrative.shareVariants.map((variant, index) => (
                <article
                  className={`share-slip share-slip--${index + 1}`}
                  key={variant.id}
                >
                  <div className="share-slip__head">
                    <div className="share-slip__title">
                      <span className="file-label">caption slip</span>
                      <h3>{variant.label}</h3>
                    </div>
                  </div>
                  <p className="share-slip__description">
                    {variant.description}
                  </p>
                  <div
                    aria-label={`${variant.label}文案预览`}
                    className="share-slip__preview"
                  >
                    {variant.text}
                  </div>
                  <button
                    className="document-button document-button--ghost"
                    type="button"
                    onClick={() => void handleCopy(variant)}
                  >
                    {getCopyButtonLabel(variant)}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <div className="verdict-actions">
            <button
              className="document-button"
              type="button"
              onClick={() => void handleExportPoster()}
            >
              {exportState === 'saving'
                ? '正在生成 PNG'
                : exportState === 'saved'
                  ? '海报已保存'
                  : exportState === 'error'
                    ? '导出失败，请重试'
                    : '保存海报 PNG'}
            </button>
            <button
              className="document-button document-button--ghost"
              type="button"
              onClick={onRestart}
            >
              重新测试
            </button>
          </div>
        </div>
      </header>

      <div className="result-dossier-grid">
        <section className="case-notes">
          <div className="section-record section-record--artifact">
            <div className="section-record__stack">
              <p className="file-label">指标记录</p>
              <h2>最显著的三项指标</h2>
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
          <p className="file-label">思维模式倾向</p>
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
          <h2>二十四项指标，按维度归档</h2>
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
