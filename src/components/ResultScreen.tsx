import { useState } from 'react'

import { skillFlavorNotes } from '../data/resultCopy.ts'
import type { ResultNarrative } from '../lib/resultNarrative.ts'
import type { DiscoReference, QuizResult } from '../types/quiz.ts'
import { AttributeDiamond } from './AttributeDiamond.tsx'

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
      <div className="result-hero panel">
        <div className="section-heading">
          <p className="section-heading__eyebrow">
            Case Closed / Internal Monologue
          </p>
          <h1>{result.primarySkill.chinese}</h1>
          <p className="result-hero__subtitle">{result.primarySkill.english}</p>
        </div>

        <p className="result-hero__punchline">{narrative.punchline}</p>
        <p className="result-hero__summary">{narrative.summary}</p>

        <div className="result-hero__actions">
          <button className="primary-button" type="button" onClick={onRestart}>
            重新测试
          </button>
          <button
            className="text-button"
            type="button"
            onClick={() => void handleCopy()}
          >
            {copied ? '摘要已复制' : '复制结果摘要'}
          </button>
        </div>

        <div className="result-hero__badges">
          <span className="stat-chip">
            <strong>{narrative.dominantAttribute.chinese}</strong>
            <span>主导属性</span>
          </span>
          <span className="stat-chip">
            <strong>{narrative.secondarySkill.chinese}</strong>
            <span>第二声部</span>
          </span>
          <span className="stat-chip">
            <strong>{narrative.tertiarySkill.chinese}</strong>
            <span>第三声部</span>
          </span>
        </div>
      </div>

      <div className="result-grid">
        <section className="panel">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Top 3 Voices</p>
            <h2>最响的三种声音</h2>
          </div>

          <div className="voice-list">
            {result.top3Skills.map((skill, index) => {
              const flavor = skillFlavorNotes[skill.english]
              const width = `${(skill.score / maxSkillScore) * 100}%`

              return (
                <article className="voice-card" key={skill.english}>
                  <div className="voice-card__head">
                    <p>#{index + 1}</p>
                    <div>
                      <h3>{skill.chinese}</h3>
                      <span>{skill.english}</span>
                    </div>
                    <strong>{skill.score}</strong>
                  </div>
                  <div aria-hidden="true" className="meter-track">
                    <div className="meter-fill" style={{ width }} />
                  </div>
                  <p>{flavor.punchline}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Attribute Profile</p>
            <h2>四大属性</h2>
          </div>

          <div className="attribute-layout">
            <AttributeDiamond
              attributes={reference.attributes}
              scores={result.attributeScores}
            />
            <div className="attribute-bars">
              {reference.attributes.map((attribute) => (
                <div className="attribute-row" key={attribute.english}>
                  <div>
                    <strong>{attribute.chinese}</strong>
                    <span>{attribute.english}</span>
                  </div>
                  <div aria-hidden="true" className="meter-track">
                    <div
                      className="meter-fill"
                      style={{
                        width: `${result.attributeScores[attribute.english]}%`,
                      }}
                    />
                  </div>
                  <strong>{result.attributeScores[attribute.english]}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="panel thought-card">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Thought Cabinet Tendency</p>
          <h2>{narrative.thoughtTitle}</h2>
        </div>
        <p>{narrative.thoughtBody}</p>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="section-heading__eyebrow">All 24 Skills</p>
          <h2>按属性归档的全部技能</h2>
        </div>

        <div className="grouped-skills">
          {result.groupedSkills.map((group) => (
            <article className="skill-group" key={group.attribute.english}>
              <div className="skill-group__header">
                <div>
                  <h3>{group.attribute.chinese}</h3>
                  <span>{group.attribute.english}</span>
                </div>
                <p>{group.attribute.short}</p>
              </div>

              <div className="skill-group__rows">
                {group.skills.map((skill) => (
                  <div className="skill-row" key={skill.english}>
                    <div className="skill-row__copy">
                      <strong>{skill.chinese}</strong>
                      <span>{skill.english}</span>
                    </div>
                    <div aria-hidden="true" className="meter-track">
                      <div
                        className="meter-fill"
                        style={{
                          width: `${(skill.score / maxSkillScore) * 100}%`,
                        }}
                      />
                    </div>
                    <strong>{skill.score}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
