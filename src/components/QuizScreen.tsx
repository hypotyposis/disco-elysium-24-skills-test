import { useEffect, type CSSProperties } from 'react'

import { likertScale } from '../data/quizData.ts'
import { getQuizQuestionSceneSpec } from '../data/discoAssets.ts'
import { quizCopy } from '../data/uiCopy.ts'
import type { VoiceCommentary } from '../lib/voiceEngine.ts'
import type { QuizQuestion } from '../types/quiz.ts'
import { DossierArtifact } from './DossierArtifact.tsx'
import { EvidenceChoice } from './EvidenceChoice.tsx'
import { SkillCommentary } from './SkillCommentary.tsx'

interface QuizScreenProps {
  commentary: VoiceCommentary | null
  question: QuizQuestion
  index: number
  total: number
  selectedValue?: number | string
  onAnswer: (value: number | string) => void
  onBack: () => void
  onRestart: () => void
}

export function QuizScreen({
  commentary,
  question,
  index,
  total,
  selectedValue,
  onAnswer,
  onBack,
  onRestart,
}: QuizScreenProps) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [index])

  const progress = ((index + 1) / total) * 100
  const questionType = question.kind === 'likert' ? quizCopy.questionTypeLikert : quizCopy.questionTypeScenario
  const questionScene = getQuizQuestionSceneSpec(question)
  const selectedLabel =
    question.kind === 'likert'
      ? likertScale.find((option) => option.value === selectedValue)?.label
      : question.options.find((option) => option.id === selectedValue)?.label
  const evidenceOptions =
    question.kind === 'likert'
      ? likertScale.map((option, optionIndex) => ({
          key: String(option.value),
          value: option.value,
          docket: quizCopy.likertDocket(optionIndex),
          label: option.label,
          note: option.tone,
          portrait: undefined,
          voiceLabel: undefined,
        }))
      : question.options.map((option, optionIndex) => {
          const voice = questionScene.voices[optionIndex]

          return {
            key: option.id,
            value: option.id,
            docket: quizCopy.scenarioDocket(optionIndex),
            label: option.label,
            note: option.insight,
            portrait:
              voice === undefined
                ? undefined
                : {
                    alt: `${voice.skill.chinese} ${voice.skill.english} 肖像`,
                    src: voice.portrait.src,
                  },
            voiceLabel: voice?.skill.chinese,
          }
        })
  const sceneStyle = {
    '--quiz-backdrop-image': `url(${questionScene.backdrop.src})`,
  } as CSSProperties

  return (
    <section
      className="quiz-screen"
      style={sceneStyle}
      aria-labelledby="question-title"
    >
      <div className="quiz-screen__atmosphere" aria-hidden="true" />

      <header className="interrogation-header">
        <div className="interrogation-header__main">
          <p className="file-label">
            {quizCopy.headerLabel(index)}
          </p>
          <h2>{quizCopy.headerTitle}</h2>
        </div>
        <div className="interrogation-actions">
          <button
            className="document-button document-button--ghost"
            type="button"
            onClick={onBack}
          >
            {quizCopy.backButton}
          </button>
          <button
            className="document-button document-button--ghost"
            type="button"
            onClick={onRestart}
          >
            {quizCopy.restartButton}
          </button>
        </div>
      </header>

      <div className="interrogation-ruler">
        <div className="interrogation-ruler__meta">
          <span>
            {quizCopy.progress(index, total)}
          </span>
          <span>{selectedLabel ? quizCopy.answered(selectedLabel) : quizCopy.notAnswered}</span>
        </div>
        <div
          className="interrogation-ruler__track"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="interrogation-ruler__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="quiz-screen__layout">
        <aside className="scene-dossier">
          <figure className="scene-dossier__art">
            <img alt="" loading="eager" src={questionScene.backdrop.src} />
            <figcaption className="scene-dossier__caption">
              <span>{questionScene.title}</span>
              <strong>{questionScene.backdrop.label}</strong>
            </figcaption>
          </figure>

          <div className="scene-dossier__brief">
            <div className="scene-dossier__brief-head">
              <div>
                <p className="file-label">{quizCopy.sceneLabel}</p>
                <h3>{questionScene.title}</h3>
              </div>
              <DossierArtifact
                asset={questionScene.artifact}
                className="scene-dossier__artifact"
              />
            </div>

            <p className="scene-dossier__lead">{questionScene.lead}</p>
            <p className="scene-dossier__note">{questionScene.note}</p>

            <div className="scene-dossier__status">
              <span>{quizCopy.statusLabel}</span>
              <strong>{selectedLabel ?? quizCopy.statusPending}</strong>
            </div>
          </div>

          <div className="scene-dossier__voices">
            <div className="section-record">
              <span className="file-label">{quizCopy.voicesLabel}</span>
              <span>{quizCopy.voicesCount(questionScene.voices.length)}</span>
            </div>

            <ol className={`voice-chorus voice-chorus--${question.kind}`}>
              {questionScene.voices.map((voice) => (
                <li
                  className={`voice-chorus__card${voice.rank === 1 ? ' is-primary' : ''}`}
                  key={`${question.id}-${voice.skill.english}-${voice.rank}`}
                >
                  <figure className="voice-chorus__portrait">
                    <img
                      alt={`${voice.skill.chinese} ${voice.skill.english} 肖像`}
                      loading="lazy"
                      src={voice.portrait.src}
                    />
                  </figure>

                  <div className="voice-chorus__copy">
                    <span>{voice.docket}</span>
                    <strong>{voice.skill.chinese}</strong>
                    <small>{voice.skill.english}</small>
                    <p>{voice.description}</p>
                    <em>{voice.cue}</em>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article
          className={`interrogation-sheet interrogation-sheet--${question.kind}`}
        >
          <div className="question-stamp">
            <span>{questionType}</span>
            <span>{quizCopy.stampLabel(index)}</span>
          </div>

          <div className="question-dossier-tags" aria-label={quizCopy.tagsAriaLabel}>
            <span>{questionScene.backdrop.label}</span>
            <span>
              {questionScene.voices[0]?.skill.chinese ?? quizCopy.tagsFallback}
            </span>
          </div>

          <p className="question-monologue">{question.monologue}</p>
          <h1 id="question-title">{question.prompt}</h1>
          <p className="interrogation-sheet__cue">
            {question.kind === 'likert'
              ? quizCopy.cueLikert
              : quizCopy.cueScenario}
          </p>

          <div
            className={`evidence-field evidence-field--${question.kind}`}
            role="radiogroup"
            aria-labelledby="question-title"
          >
            {evidenceOptions.map((option, optionIndex) => (
              <EvidenceChoice
                key={option.key}
                docket={option.docket}
                label={option.label}
                note={option.note}
                order={optionIndex + 1}
                portrait={option.portrait}
                selected={selectedValue === option.value}
                variant={question.kind}
                voiceLabel={option.voiceLabel}
                onSelect={() => onAnswer(option.value)}
              />
            ))}
          </div>

          {commentary && (commentary.approve || commentary.dissent) && (
            <SkillCommentary
              key={`commentary-${index}`}
              commentary={commentary}
            />
          )}
        </article>
      </div>
    </section>
  )
}
