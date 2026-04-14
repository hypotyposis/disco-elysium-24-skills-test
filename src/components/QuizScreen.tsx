import type { CSSProperties } from 'react'

import { likertScale } from '../data/quizData.ts'
import { getQuizQuestionSceneSpec } from '../data/discoAssets.ts'
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
  const progress = ((index + 1) / total) * 100
  const questionType = question.kind === 'likert' ? '陈述题' : '情境题'
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
          docket: `强度档 ${String(optionIndex + 1).padStart(2, '0')}`,
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
            docket: `证词片段 ${String(optionIndex + 1).padStart(2, '0')}`,
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
            审讯记录 / 第 {String(index + 1).padStart(2, '0')} 题
          </p>
          <h2>让最先开口的那个声音先作证。</h2>
        </div>
        <div className="interrogation-actions">
          <button
            className="document-button document-button--ghost"
            type="button"
            onClick={onBack}
          >
            上一题
          </button>
          <button
            className="document-button document-button--ghost"
            type="button"
            onClick={onRestart}
          >
            重新开始
          </button>
        </div>
      </header>

      <div className="interrogation-ruler">
        <div className="interrogation-ruler__meta">
          <span>
            第 {index + 1} / {total} 题
          </span>
          <span>{selectedLabel ? `已归档：${selectedLabel}` : '尚未归档'}</span>
        </div>
        <div aria-hidden="true" className="interrogation-ruler__track">
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
                <p className="file-label">现场提要</p>
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
              <span>当前归档</span>
              <strong>{selectedLabel ?? '等待落笔'}</strong>
            </div>
          </div>

          <div className="scene-dossier__voices">
            <div className="section-record">
              <p className="file-label">在场声部</p>
              <span>{questionScene.voices.length} 份内心证词</span>
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
            <span>归档序号 {String(index + 1).padStart(2, '0')}</span>
          </div>

          <div className="question-dossier-tags" aria-label="问题现场标签">
            <span>{questionScene.backdrop.label}</span>
            <span>
              {questionScene.voices[0]?.skill.chinese ?? '卷宗整理中'}
            </span>
          </div>

          <p className="question-monologue">{question.monologue}</p>
          <h1 id="question-title">{question.prompt}</h1>
          <p className="interrogation-sheet__cue">
            {question.kind === 'likert'
              ? '从否认到认领，选一张最像你的口供。'
              : '三份处理方式里，哪一份最像你会先伸手去拿的那张。'}
          </p>

          <div
            className={`evidence-field evidence-field--${question.kind}`}
            role="list"
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
