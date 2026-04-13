import { likertScale } from '../data/quizData.ts'
import type { QuizQuestion } from '../types/quiz.ts'
import { EvidenceChoice } from './EvidenceChoice.tsx'

interface QuizScreenProps {
  question: QuizQuestion
  index: number
  total: number
  selectedValue?: number | string
  onAnswer: (value: number | string) => void
  onBack: () => void
  onRestart: () => void
}

export function QuizScreen({
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
        }))
      : question.options.map((option, optionIndex) => ({
          key: option.id,
          value: option.id,
          docket: `证词片段 ${String(optionIndex + 1).padStart(2, '0')}`,
          label: option.label,
          note: option.insight,
        }))

  return (
    <section className="quiz-screen" aria-labelledby="question-title">
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

      <article
        className={`interrogation-sheet interrogation-sheet--${question.kind}`}
      >
        <div className="question-stamp">
          <span>{questionType}</span>
          <span>归档序号 {String(index + 1).padStart(2, '0')}</span>
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
              selected={selectedValue === option.value}
              variant={question.kind}
              order={optionIndex + 1}
              onSelect={() => onAnswer(option.value)}
            />
          ))}
        </div>
      </article>
    </section>
  )
}
