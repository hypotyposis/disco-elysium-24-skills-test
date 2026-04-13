import { likertScale } from '../data/quizData.ts'
import type { QuizQuestion } from '../types/quiz.ts'

interface QuizScreenProps {
  question: QuizQuestion
  index: number
  total: number
  onAnswer: (value: number | string) => void
  onBack: () => void
  onRestart: () => void
}

export function QuizScreen({
  question,
  index,
  total,
  onAnswer,
  onBack,
  onRestart,
}: QuizScreenProps) {
  const progress = ((index + 1) / total) * 100
  const questionType = question.kind === 'likert' ? '陈述题' : '情境题'

  return (
    <section className="quiz-screen panel">
      <div className="quiz-screen__header">
        <div>
          <p className="eyebrow">
            Question {String(index + 1).padStart(2, '0')}
          </p>
          <h2>让最先开口的那个声音先作证。</h2>
        </div>
        <div className="quiz-screen__actions">
          <button className="text-button" type="button" onClick={onBack}>
            上一题
          </button>
          <button className="text-button" type="button" onClick={onRestart}>
            重新开始
          </button>
        </div>
      </div>

      <div className="progress-panel">
        <div className="progress-copy">
          <span>
            第 {index + 1} / {total} 题
          </span>
          <span>{questionType}</span>
        </div>
        <div aria-hidden="true" className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-panel">
        <p className="question-monologue">{question.monologue}</p>
        <h3>{question.prompt}</h3>

        {question.kind === 'likert' ? (
          <div className="likert-grid" role="list">
            {likertScale.map((option) => (
              <button
                key={option.value}
                className="answer-card answer-card--likert"
                type="button"
                onClick={() => onAnswer(option.value)}
              >
                <span className="answer-card__label">{option.label}</span>
                <span className="answer-card__insight">{option.tone}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="scenario-grid" role="list">
            {question.options.map((option) => (
              <button
                key={option.id}
                className="answer-card answer-card--scenario"
                type="button"
                onClick={() => onAnswer(option.id)}
              >
                <span className="answer-card__label">{option.label}</span>
                <span className="answer-card__insight">{option.insight}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
