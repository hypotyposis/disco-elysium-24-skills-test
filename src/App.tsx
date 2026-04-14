import { useState, useRef } from 'react'

import { discoReference } from './data/discoReference.ts'
import { likertScale, quizQuestions } from './data/quizData.ts'
import { voicePackMap } from './data/voicePacks.ts'
import { LandingScreen } from './components/LandingScreen.tsx'
import { QuizScreen } from './components/QuizScreen.tsx'
import { ResultScreen } from './components/ResultScreen.tsx'
import { buildResultNarrative } from './lib/resultNarrative.ts'
import { scoreQuiz } from './lib/scoring.ts'
import {
  computeDeltas,
  generateCommentary,
  type VoiceCommentary,
} from './lib/voiceEngine.ts'
import type { QuizAnswer } from './types/quiz.ts'

type Phase = 'landing' | 'quiz' | 'result'

function App() {
  const [phase, setPhase] = useState<Phase>('landing')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, QuizAnswer['value']>>(
    {},
  )
  const [commentary, setCommentary] = useState<VoiceCommentary | null>(null)
  const hesitationCount = useRef(0)
  const cumulativeScores = useRef<Record<string, number>>(
    Object.fromEntries(discoReference.skills.map((s) => [s.english, 0])),
  )

  const currentQuestion = quizQuestions[currentIndex]
  const selectedValue = answers[currentQuestion?.id]
  const answerList = quizQuestions.flatMap((question) => {
    const value = answers[question.id]

    if (value === undefined) {
      return []
    }

    return [{ questionId: question.id, value }]
  })

  const hasCompletedQuiz = answerList.length === quizQuestions.length
  const result = hasCompletedQuiz
    ? scoreQuiz({
        reference: discoReference,
        questions: quizQuestions,
        answers: answerList,
      })
    : null
  const narrative =
    result === null ? null : buildResultNarrative(discoReference, result)

  const handleStart = () => {
    setAnswers({})
    setCommentary(null)
    hesitationCount.current = 0
    cumulativeScores.current = Object.fromEntries(
      discoReference.skills.map((s) => [s.english, 0]),
    )
    setPhase('quiz')
    setCurrentIndex(0)
  }

  const handleRestart = () => {
    setAnswers({})
    setCommentary(null)
    hesitationCount.current = 0
    cumulativeScores.current = Object.fromEntries(
      discoReference.skills.map((s) => [s.english, 0]),
    )
    setCurrentIndex(0)
    setPhase('landing')
  }

  const handleBack = () => {
    if (currentIndex === 0) {
      setPhase('landing')
      return
    }

    setCurrentIndex((value) => value - 1)
  }

  const handleAnswer = (value: QuizAnswer['value']) => {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    }

    setAnswers(nextAnswers)

    // Compute voice commentary
    const choiceLabel =
      currentQuestion.kind === 'likert'
        ? (likertScale.find((o) => o.value === value)?.label ?? '')
        : (currentQuestion.options.find((o) => o.id === value)?.label ?? '')

    const newCommentary = generateCommentary(
      currentQuestion,
      value,
      cumulativeScores.current,
      voicePackMap,
      currentIndex + 1,
      choiceLabel,
    )

    // Track hesitation
    if (newCommentary.isHesitation) {
      hesitationCount.current += 1
    }

    // Update cumulative scores
    const deltas = computeDeltas(currentQuestion, value)
    for (const [skill, delta] of Object.entries(deltas)) {
      cumulativeScores.current[skill] =
        (cumulativeScores.current[skill] ?? 0) + delta
    }

    setCommentary(newCommentary)

    if (currentIndex === quizQuestions.length - 1) {
      setPhase('result')
      return
    }

    setCurrentIndex((index) => index + 1)
  }

  return (
    <main className={`app-shell app-shell--${phase}`}>
      <div className="app-shell__smoke" aria-hidden="true" />
      <div className="app-shell__grain" aria-hidden="true" />
      <div className="app-shell__threads" aria-hidden="true" />

      <div className={`page-frame page-frame--${phase}`}>
        {phase === 'landing' && (
          <LandingScreen
            onStart={handleStart}
            questionCount={quizQuestions.length}
            reference={discoReference}
          />
        )}

        {phase === 'quiz' && (
          <QuizScreen
            commentary={commentary}
            index={currentIndex}
            onAnswer={handleAnswer}
            onBack={handleBack}
            onRestart={handleRestart}
            question={currentQuestion}
            selectedValue={selectedValue}
            total={quizQuestions.length}
          />
        )}

        {phase === 'result' && result && narrative && (
          <ResultScreen
            hesitationCount={hesitationCount.current}
            narrative={narrative}
            onRestart={handleRestart}
            reference={discoReference}
            result={result}
          />
        )}
      </div>
    </main>
  )
}

export default App
